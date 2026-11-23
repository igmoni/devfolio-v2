import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

import { Webhooks } from "@dodopayments/nextjs";

import { prisma } from "@/lib/prisma";
import { createSeatFromPayment } from "@/lib/sponsors/seats";

type PaymentData = {
  payment_id?: string;
  subscription_id?: string | null;
  customer?: { email?: string | null } | null;
  metadata?: Record<string, string> | null;
};

type SubscriptionData = {
  subscription_id?: string;
};

// One-time seat purchase -> create the seat (idempotent on payment_id).
async function onPaid(payload: { data: unknown }) {
  try {
    const data = payload.data as PaymentData;

    // Renewal payments of old subscriptions are handled by the legacy block below.
    if (data.subscription_id) return;

    if (!data.payment_id) throw new Error("Missing payment ID");

    await createSeatFromPayment({
      paymentId: data.payment_id,
      email: data.customer?.email,
      metadata: data.metadata,
    });
  } catch (error) {
    console.error("[dodo] payment handling failed:", error);
    throw error; // 500 -> Dodo retries
  }
}

// Refund -> take the seat off the wall.
async function onRefunded(payload: { data: unknown }) {
  try {
    const data = payload.data as PaymentData;
    if (!data.payment_id) throw new Error("Missing payment ID");

    await prisma.sponsor.updateMany({
      where: { paymentId: data.payment_id },
      data: { status: "INACTIVE" },
    });

    revalidatePath("/");
    revalidatePath("/sponsor");
  } catch (error) {
    console.error("[dodo] refund handling failed:", error);
    throw error;
  }
}

// ---- Legacy subscription sponsors (delete when none remain) ----
async function legacyRenewed(payload: { data: unknown }) {
  const { subscription_id } = payload.data as SubscriptionData;
  if (!subscription_id) return;

  await prisma.sponsor.updateMany({
    where: { subscriptionId: subscription_id },
    data: { status: "ACTIVE" },
  });
  revalidatePath("/");
}

async function legacyEnded(payload: { data: unknown }) {
  const { subscription_id } = payload.data as SubscriptionData;
  if (!subscription_id) return;

  await prisma.sponsor.updateMany({
    where: { subscriptionId: subscription_id },
    data: { status: "INACTIVE" },
  });
  revalidatePath("/");
}

const handler = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,

  onPaymentSucceeded: onPaid,
  onRefundSucceeded: onRefunded,

  onSubscriptionRenewed: legacyRenewed,
  onSubscriptionCancelled: legacyEnded,
  onSubscriptionExpired: legacyEnded,
  onSubscriptionFailed: legacyEnded,
  onSubscriptionOnHold: legacyEnded,
});

export async function POST(req: NextRequest) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("[dodo] webhook handler failed:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
}
