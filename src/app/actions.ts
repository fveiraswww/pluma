/* eslint-disable no-console */
"use server";

import {revalidatePath} from "next/cache";
import {MercadoPagoConfig, OAuth, PaymentRefund} from "mercadopago";

import {supabaseServer} from "@/lib/supabase/server";
import {Request} from "@/db/types";

export async function revalidateData(path: string, type: "layout" | "page") {
  revalidatePath(path, type);

  return;
}

export async function changeAdVisibility(active: boolean, id: number) {
  const supabase = await supabaseServer(true);

  const {error} = await supabase
    .from("request")
    .update({active, last_time_shown: new Date()})
    .eq("id", id);

  if (error) {
    console.error(error);

    return false;
  }

  return true;
}

export async function updateTimesToShow(times: number, id: number) {
  const supabase = await supabaseServer(true);

  const {error} = await supabase.from("request").update({times_to_show: times}).eq("id", id);

  if (error) {
    console.error(error);

    return false;
  }

  return true;
}

const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function connectMercadoPago() {
  const url = new OAuth(mercadopago).getAuthorizationURL({
    options: {
      client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID,
      redirect_uri: `${process.env.APP_URL}/api/mercadopago/connect`,
    },
  });

  return url;
}

export async function refreshData(route: string) {
  revalidatePath(route);
}

export async function updateAccountType(type: "streamer" | "agency", accessToken: string) {
  const supabase = await supabaseServer();

  const {
    data: {user},
  } = await supabase.auth.getUser(accessToken);

  if (!user) {
    return false;
  }

  const {error} = await supabase.from("user_details").update({type}).eq("user_id", user.id);

  if (error) {
    console.error(error);

    throw new Error(error.message);
  }

  return true;
}

export async function updateIntervalTime(interval: string, accessToken: string) {
  const supabase = await supabaseServer();

  const {
    data: {user},
  } = await supabase.auth.getUser(accessToken);

  if (!user) {
    return false;
  }

  const {error} = await supabase
    .from("streamer_profile")
    .update({interval_time: interval})
    .eq("user_id", user.id);

  if (error) {
    console.error(error);

    throw new Error(error.message);
  }

  return true;
}

export async function finishOnboarding(accessToken: string) {
  const supabase = await supabaseServer();

  const {
    data: {user},
  } = await supabase.auth.getUser(accessToken);

  if (!user) {
    return false;
  }

  const {error} = await supabase
    .from("user_details")
    .update({onboarding_completed: true})
    .eq("user_id", user.id);

  if (error) {
    console.error(error);

    throw new Error(error.message);
  }

  return true;
}
