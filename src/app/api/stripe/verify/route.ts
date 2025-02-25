import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";

import {plumaError} from "@/app/lib/api/errors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const accountId = searchParams.get("accountId");

  if (!accountId) {
    return NextResponse.json({error: "Account ID is required"}, {status: 400});
  }

  try {
    const account = await stripe.accounts.retrieve(accountId);

    return NextResponse.json(account, {status: 200});
  } catch (error) {
    return plumaError("internal_server_error", JSON.stringify(error));
  }
}
