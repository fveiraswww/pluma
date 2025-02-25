import ExplorePage from "@/components/dashboard/home/explore/explore";
import {supabaseServer} from "@/lib/supabase/server";

export default async function HomePage(props: {searchParams: Promise<{error: string}>}) {
  const supabase = await supabaseServer(true);
  const {data: streamers} = await supabase.from("streamer_profile").select(
    `*,
           user_details(*) 
            `,
  );

  return (
    <div className="xl:px-0l relative mx-auto mt-4 flex w-full max-w-screen-lg flex-col px-3 py-2 lg:px-4">
      <div className="flex flex-[1] flex-col gap-8">
        <h1 className="text-3xl">Explore</h1>
        {streamers && streamers.length ? <ExplorePage isPublic streamers={streamers} /> : null}
      </div>
    </div>
  );
}
