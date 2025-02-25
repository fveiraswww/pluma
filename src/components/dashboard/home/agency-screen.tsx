import ExplorePage from "./explore/explore";

import {StreamerProfile, UserDetails} from "@/db/types";
import {supabaseServer} from "@/lib/supabase/server";

export interface StreamersData extends StreamerProfile {
  user_details: UserDetails;
}

export const revalidate = 60;

export async function AgencyScreen() {
  const supabase = await supabaseServer();
  const {
    data: {session},
  } = await supabase.auth.getSession();

  const data = await fetch(`${process.env.URL}/api/profile/streamer/all`, {
    headers: {
      Authorization: session?.access_token ?? "",
    },
  });

  const streamers: StreamersData[] | [] = await data.json();

  return (
    <>
      {" "}
      <div className="flex flex-[1] flex-col gap-8">
        <h1 className="text-3xl">Explore</h1>
        {streamers && streamers.length ? <ExplorePage streamers={streamers} /> : null}
      </div>
    </>
  );
}
