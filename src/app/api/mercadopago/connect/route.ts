import {NextRequest, NextResponse} from "next/server";
import {MercadoPagoConfig, OAuth} from "mercadopago";

import {supabaseServer} from "@/lib/supabase/server";

const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  const code = request.nextUrl.searchParams.get("code") ?? "";

  const credentials = await new OAuth(mercadopago).create({
    body: {
      client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID,
      client_secret: process.env.MP_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.APP_URL}/api/mercadopago/connect`,
    },
  });

  console.log(user);
  const {error} = await supabase
    .from("user_details")
    .update({mp_access_token: credentials?.access_token})
    .eq("user_id", user?.id);

  if (error) {
    console.log(error);

    return NextResponse.redirect(`${process.env.APP_URL!}?status=error_connecting`);
  }

  return NextResponse.redirect(`${process.env.APP_URL!}`);
}
