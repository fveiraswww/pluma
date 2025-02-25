import Stripe from "stripe";
import {NextRequest, NextResponse} from "next/server";

import {supabaseServer} from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;

  try {
    const payload = await req.text();
    const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    const supabase = await supabaseServer(true);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session?.amount_total) {
          console.error("No amount found in session");
          break;
        }

        const userId = session.metadata?.user;

        if (!userId) {
          console.error("No user_id found in metadata");
          break;
        }

        const {error} = await supabase.rpc("increment_credits", {
          function_user_id: userId,
          amount: session.amount_total / 100,
        });

        if (error) {
          console.error(`Failed to increment_credits ${userId}:`, error);
        }

        const {error: transaction_error} = await supabase.from("transactions").insert({
          currency: "usd",
          amount: session.amount_total / 100,
          user_id: userId,
        });

        if (transaction_error) {
          console.error(
            `Failed to insert transaction ${userId}:`,
            JSON.stringify(transaction_error),
          );
        }

        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const userId = paymentIntent.metadata?.user;

        if (!userId) {
          console.error("No request_id found in metadata");
          break;
        }

        // Actualizar el estado del pago a `failed`
        // const {error} = await supabase
        //   .from("request")
        //   .update({payment_status: "failed"})
        //   .eq("id", requestId);

        // if (error) {
        //   console.error(`Failed to update payment status for request ${requestId}:`, error);
        // }

        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;

        if (!charge?.payment_intent) {
          console.error("No charge found");
          break;
        }

        // TO DO: Automatize payments
        // const paymentIntentId =
        //   typeof charge.payment_intent === "string"
        //     ? charge.payment_intent
        //     : charge.payment_intent.id;

        // if (!userId) {
        //   console.error("No user id found in metadata");
        //   break;
        // }

        // const {error} = await supabase.rpc("decrement_credits", {
        //   function_user_id: userId,
        //   amount: charge.amount_refunded / 100,
        // });

        // if (error) {
        //   console.error(`Failed to decrement_credits ${userId}:`, error);
        // }

        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({received: true});
  } catch (err) {
    console.error(`Webhook error: ${(err as Error).message}`);

    return NextResponse.json({error: "Webhook Error"}, {status: 400});
  }
}
