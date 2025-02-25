import type {Metadata} from "next";

import "../globals.css";

import {Inter} from "next/font/google";
import {Toaster} from "sonner";

import {Navbar} from "@/components/landing/navbar";
import {supabaseServer} from "@/lib/supabase/server";
import {Footer} from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "SkaleBox",
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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const supabase = await supabaseServer();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  const {data: userDetails} = await supabase
    .from("user_details")
    .select()
    .eq("user_id", user?.id)
    .single();

  return (
    <html className={inter.className} lang="en">
      <head>
        <link href="/logo.svg" rel="icon" sizes="any" />
      </head>
      <body className="relative flex flex-col overflow-x-hidden bg-background">
        <div className="w-full flex-1 overflow-hidden">
          <Navbar user={userDetails} />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
