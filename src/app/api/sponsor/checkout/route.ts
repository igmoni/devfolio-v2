import { NextResponse } from "next/server";

import { put } from "@vercel/blob";

import { sponsorConfig } from "@/config/sponsor";
import { dodo } from "@/lib/sponsors/dodo";
import { EXTENSIONS, parseLink } from "@/lib/sponsors/validate";

const fail = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  const productId = process.env.DODO_PRODUCT_ID;
  const claimUrl = process.env.DODO_PAYMENTS_RETURN_URL; // .../sponsor/claim
  if (!productId || !claimUrl)
    return fail("Sponsorship is not configured", 500);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    form = new FormData();
  }

  const name = String(form.get("name") ?? "").trim();
  const link = parseLink(String(form.get("link") ?? ""));
  const logoField = form.get("logo");
  const logo =
    logoField instanceof File && logoField.size > 0 ? logoField : null;

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

  const hasDetails = Boolean(name || link.value || logo);

  try {
    // Only a file upload happens here. No database row until payment succeeds.
    let logoUrl = "";
    if (logo) {
      const blob = await put(
        `sponsors/pending/${crypto.randomUUID()}.${EXTENSIONS[logo.type]}`,
        logo,
        { access: "public", contentType: logo.type }
      );
      logoUrl = blob.url;
    }

    // Details given -> straight back to the sponsor page. Skipped -> claim page.
    const returnUrl = hasDetails
      ? new URL("/sponsor?thanks=1", claimUrl).toString()
      : claimUrl;

    const session = await dodo.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: returnUrl,
      ...(hasDetails
        ? {
            metadata: {
              sponsor_name: name,
              sponsor_link: link.value ?? "",
              sponsor_image_url: logoUrl,
            },
          }
        : {}),
    });

    if (!session.checkout_url) throw new Error("No checkout URL returned");

    return NextResponse.json({ url: session.checkout_url });
  } catch (error) {
    console.error("Sponsor checkout failed:", error);
    return fail("Unable to start checkout", 502);
  }
}
