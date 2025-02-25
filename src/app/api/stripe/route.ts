import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {redirect} from "next/navigation";

import {plumaError} from "@/app/lib/api/errors";
import {supabaseServer} from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization");
    const supabase = await supabaseServer();

    if (!token) return plumaError("unauthorized");

    const {
      data: {user},
    } = await supabase.auth.getUser(token);

    if (!user) return plumaError("unauthorized");

    const account = await stripe.accounts.create({
      type: "standard",
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.URL}/dashboard/${user.id}`,
      return_url: `${process.env.URL}/dashboard/${user.id}`,
      type: "account_onboarding",
    });

    const {error} = await supabase
      .from("user_details")
      .update({
        stripe_user_id: account?.id,
      })
      .eq("user_id", user?.id);

    if (error) return plumaError("internal_server_error", JSON.stringify(error));

    // Save the `account.id` to your database for the user
    // await saveStripeAccountIdToUser(userId, account.id);
    console.log("llega", accountLink);

    return NextResponse.json({url: accountLink.url}, {status: 200});
  } catch (error) {
    console.error(error);

    return plumaError("internal_server_error", "Unable to create account link");
  }
}
