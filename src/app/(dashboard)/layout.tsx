import type {Metadata} from "next";

import "../globals.css";

import {Toaster} from "sonner";
import jwt from "jsonwebtoken";

import Sidebar from "@/components/dashboard/sidebar/sidebar";
import Provider from "@/components/dashboard/provider";
import {supabaseServer} from "@/lib/supabase/server";
import {SidebarProvider} from "@/components/ui/sidebar";
import {StreamerProfile, UserDetails} from "@/db/types";

export const metadata: Metadata = {
  title: "Pluma",
  description: "The ultimate ad manager",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "fveiras",
      url: "https://www.x.com/fveiras_",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    {rel: "apple-touch-icon", url: "/logo.svg"},
    {rel: "icon", url: "/logo.svg"},
  ],
};

export interface UserData extends UserDetails {
  streamer_profile: StreamerProfile;
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const supabase = await supabaseServer();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  const {data: userData} = (await supabase
    .from("user_details")
    .select()
    .eq("user_id", user?.id)
    .single()) as unknown as {data: UserData};

  if (userData?.streamer_profile?.obs_server_password) {
    try {
      const decodedPassword = jwt.verify(
        userData.streamer_profile.obs_server_password,
        process.env.JWT_PRIVATE_KEY!,
      ) as string;

      userData.streamer_profile.obs_server_password = decodedPassword;
    } catch (error) {
      console.error("Error to verify obs_server_password:", error);
      userData.streamer_profile.obs_server_password = "";
    }
  }

  return (
    <html lang="en">
      <Provider user={user} user_details={userData}>
        <body className="flex h-screen overflow-hidden">
          <SidebarProvider>
            <Sidebar />
            <div className="flex-1 px-4 pt-4">
              <main className="m-auto h-full w-full rounded-t-2xl bg-background shadow-xl">
                {children}
              </main>
              <Toaster />
            </div>
          </SidebarProvider>
        </body>
      </Provider>
    </html>
  );
}
