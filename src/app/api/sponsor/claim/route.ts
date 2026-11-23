import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { del, put } from "@vercel/blob";

import { sponsorConfig } from "@/config/sponsor";
import { prisma } from "@/lib/prisma";
import { EXTENSIONS, parseLink } from "@/lib/sponsors/validate";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fail = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  const form = await request.formData();

  const email = String(form.get("email") ?? "")
    .trim()
    .toLowerCase();
  const paymentId = String(form.get("paymentId") ?? "").trim();
  const name = String(form.get("name") ?? "").trim();
  const link = parseLink(String(form.get("link") ?? ""));
  const logoField = form.get("logo");
  const logo =
    logoField instanceof File && logoField.size > 0 ? logoField : null;

  if (!paymentId && !EMAIL_RE.test(email)) {
    return fail("Enter your checkout email or your payment ID", 400);
  }
  if (paymentId.length > 100) return fail("That payment ID looks wrong", 400);
  if (name && (name.length < 2 || name.length > 40)) {
    return fail("Name must be 2 to 40 characters", 400);
  }
  if (!link.ok) return fail("That link doesn't look right", 400);
  if (logo) {
    if (!EXTENSIONS[logo.type])
      return fail("Use a PNG, JPEG or WebP image", 400);
    if (logo.size > sponsorConfig.maxLogoBytes) {
      return fail("Logo must be under 512 KB", 400);
    }
  }

  // Find the seat. By email we prefer the oldest unclaimed one.
  const seat = paymentId
    ? await prisma.sponsor.findUnique({ where: { paymentId } })
    : ((await prisma.sponsor.findFirst({
        where: { email, claimedAt: null },
        orderBy: { createdAt: "asc" },
      })) ?? (await prisma.sponsor.findFirst({ where: { email } })));

  if (!seat || seat.status === "INACTIVE") {
    return fail(
      "We couldn't find that payment yet. It can take a minute or two to register.",
      404
    );
  }
  if (seat.claimedAt) {
    return fail(
      "This seat has already been claimed. DM me if that wasn't you.",
      409
    );
  }

  let logoUrl: string | null = null;
  if (logo) {
    try {
      const blob = await put(
        `sponsors/${seat.id}.${EXTENSIONS[logo.type]}`,
        logo,
        { access: "public", contentType: logo.type, addRandomSuffix: true }
      );
      logoUrl = blob.url;
    } catch (error) {
      console.error("Sponsor logo upload failed:", error);
      return fail("Couldn't upload the logo. Try again.", 502);
    }
  }

  const result = await prisma.sponsor.updateMany({
    where: { id: seat.id, claimedAt: null },
    data: {
      ...(name ? { name } : {}),
      ...(link.value ? { link: link.value } : {}),
      ...(logoUrl ? { imageUrl: logoUrl } : {}),
      claimedAt: new Date(),
    },
  });

  if (result.count === 0) {
    if (logoUrl) await del(logoUrl).catch(() => {});
    return fail("This seat has already been claimed.", 409);
  }

  revalidatePath("/");
  revalidatePath("/sponsor");

  return NextResponse.json({ ok: true });
}
