import { revalidatePath } from "next/cache";

import { prisma } from "../prisma";

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/9.x/shapes/png?seed=${encodeURIComponent(seed)}&size=256`;

type SeatInput = {
  paymentId: string;
  email?: string | null;
  metadata?: Record<string, string | undefined> | null;
};

// Idempotent: webhooks retry, so the same paymentId never creates two seats.
export async function createSeatFromPayment({
  paymentId,
  email,
  metadata,
}: SeatInput) {
  const name = metadata?.sponsor_name?.trim() || "";
  const link = metadata?.sponsor_link?.trim() || "";
  const image = metadata?.sponsor_image_url?.trim() || "";
  const hasDetails = Boolean(name || link || image);

  const seat = await prisma.sponsor.upsert({
    where: { paymentId },
    update: {},
    create: {
      paymentId,
      email: email?.trim().toLowerCase() || null,
      name: name || "Supporter",
      link: link || null,
      imageUrl: image || avatarFor(paymentId),
      status: "ACTIVE",
      claimedAt: hasDetails ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/sponsor");

  return seat;
}
