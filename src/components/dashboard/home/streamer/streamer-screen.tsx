import Stepper from "../../stepper";

import {CompleteProfile} from "./complete-profile";
import RequestsPreview from "./requests-preview";

import {supabaseServer} from "@/lib/supabase/server";
import {UserDetails} from "@/db/types";

export const revalidate = 60;

export async function StreamerScreen({userDetails}: {userDetails: UserDetails}) {
  const supabase = await supabaseServer();

  const {data: initialApprovedRequests} = await supabase
    .from("request")
    .select()
    .eq("user_id", userDetails.user_id ?? "")
    .eq("status", "approved")
    .is("initialized", null)
    .order("created_at", {ascending: false})
    .limit(10);

  return (
    <>
      {" "}
      <div className="flex flex-[1] flex-col gap-8">
        <h1 className="text-3xl">Ads to show</h1>
        <CompleteProfile />
        {initialApprovedRequests ? <RequestsPreview requests={initialApprovedRequests} /> : null}
      </div>
      <Stepper url={process.env.NEXT_PUBLIC_URL! ?? ""} />
    </>
  );
}
