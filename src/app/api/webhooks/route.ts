"use server";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")!;
  const body = await request.text();

  if (!signature) {
    return new Response("Invalid signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Webhook error ${error.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata.orderId;

      if (orderId) {
        try {
          await db.order.update({
            where: {
              id: orderId,
            },
            data: {
              paymentStatus: "PAID",
            },
          });

          console.log(`Order ${orderId} marked as paid.`);
        } catch (error: any) {
          console.error(`Failed to update order ${orderId}: ${error.message}`);
        }
      } else {
        console.warn("Order ID not found in payment intent metadata.");
      }
      console.log(`Payment Intent ${paymentIntent.id} succeeded`);
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
      const failedOrderId = paymentIntentFailed.metadata.orderId;

      if (failedOrderId) {
        try {
          await db.order.update({
            where: {
              id: failedOrderId,
            },
            data: {
              paymentStatus: "FAILED",
            },
          });

          console.log(`Order ${failedOrderId} marked as failed.`);
        } catch (error: any) {
          console.error(
            `Failed to update order ${failedOrderId}: ${error.message}`
          );
        }
      } else {
        console.warn("Order ID not found in payment intent metadata.");
      }
      console.log(`PaymentIntent ${paymentIntentFailed.id} failed`);
      break;
    // Handle other event types here
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
