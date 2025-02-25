import {UserDetails} from "@/db/types";
import {supabaseServer} from "@/lib/supabase/server";

export const revalidate = 3600;

export default async function Dashboard() {
  const supabase = await supabaseServer();

  const {
    data: {user},
  } = await supabase.auth.getUser();
  const {data: userDetails} = (await supabase
    .from("user_details")
    .select()
    .eq("user_id", user?.id)
    .single()) as unknown as {data: UserDetails};

  return (
    <div className="flex h-screen w-full flex-col justify-between gap-8 overflow-y-scroll p-8 md:flex-row">
      <h1>hola</h1>
    </div>
  );
}
