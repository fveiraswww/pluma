import type {Metadata} from "next";

import "../globals.css";
import "../../components/landing/hero/gradient.css";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pluma",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="light m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-white antialiased">
        <main>
          <Link className="absolute left-8 top-8 md:left-4 md:top-4" href="/">
            <h1 className="text-xl font-bold">🪶 Pluma</h1>
          </Link>
          <div className="flex h-screen w-full flex-row overflow-hidden">
            {children}
            <div className="bg-gradient gradient relative hidden h-full flex-[1] flex-col justify-center overflow-hidden border-l p-8 md:col-span-2 md:flex">
              <canvas className="Gradient__canvas isLoaded relative h-full w-full" />
              <Spline
                className="canvas"
                scene="https://prod.spline.design/y9rcW5VFyz0Gvlwl/scene.splinecode"
              />
              <div
                className="absolute left-0 top-0 h-full w-full shadow-lg"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(60, 1fr)`,
                  gridTemplateRows: `repeat(60, 1fr)`,
                }}
              >
                {[...Array(60 * 60)].map((_, index) => (
                  <div key={index} className="border-[0.5px] border-gray-100/20" />
                ))}
              </div>
              <div className="absolute left-8 top-1/2 flex h-1/2 w-full -translate-y-1/2 transform items-end overflow-hidden rounded-2xl bg-background p-4 shadow-2xl">
                <div className="absolute bottom-8 left-8 h-fit w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image alt="" height={800} src="/access-to-app.webp" width={800} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
