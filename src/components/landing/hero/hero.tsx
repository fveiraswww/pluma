import Spline from "@splinetool/react-spline";
import "./gradient.css";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {headers} from "next/headers";
import {userAgentFromString} from "next/server";

import {Button} from "@/components/ui/button";

/**
 * @description next.js mobile detection
 */
export async function isServerMobile() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");
  const {device} = userAgentFromString(userAgent || undefined);

  return device.type === "mobile";
}

export async function Hero() {
  return (
    <div className="relative mb-20">
      <div className="xl:px-0l relative mx-auto my-4 w-full max-w-screen-lg overflow-hidden rounded-3xl px-3 py-10 md:py-6 lg:px-4">
        <div className="bg-gradient gradient absolute inset-0 -top-40 max-h-[800px] w-full overflow-hidden lg:-top-20">
          <div className="relative h-full">
            <canvas className="Gradient__canvas isLoaded relative h-full w-full" />
            <Spline
              className="canvas"
              scene="https://prod.spline.design/y9rcW5VFyz0Gvlwl/scene.splinecode"
            />
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-md flex-col items-center justify-center">
          <Link
            className="animate-slide-up-fade motion-reduce:animate-fade-in group flex divide-neutral-300 rounded-full border border-neutral-300 bg-white text-xs font-medium drop-shadow-sm transition-colors duration-75 [--offset:10px] [animation-delay:0ms] [animation-duration:1s] [animation-fill-mode:both] hover:bg-neutral-50 sm:divide-x"
            href="https://cal.com/fveiras"
          >
            <span className="py-1.5 pl-4 text-neutral-800 sm:pr-2.5">Beneficios para empezar</span>
            <span className="flex items-center gap-1.5 p-1.5 pl-2.5 text-neutral-500">
              <span className="sm:block">Para influencers</span>
              <div className="rounded-full bg-neutral-100">
                <ArrowUpRight
                  className="lucide lucide-arrow-up-right size-2.5 transition-transform duration-100 group-hover:-translate-y-px group-hover:translate-x-px"
                  height={14}
                  width={14}
                />
              </div>
            </span>
          </Link>

          {/* hero text */}
          <h1 className="font-display animate-slide-up-fade motion-reduce:animate-fade-in mt-5 text-center text-4xl font-medium text-neutral-900 [--offset:20px] [animation-delay:100ms] [animation-duration:1s] [animation-fill-mode:both] sm:text-5xl sm:leading-[1.15]">
            Aumentá tus ganancias!
          </h1>
          <p className="animate-slide-up-fade motion-reduce:animate-fade-in mt-5 text-center text-base text-grey-border [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both]">
            Creá suscripciones para tu comunidad, y administrala con Pluma. Automatizá el acceso de
            miembros y beneficios.
          </p>
        </div>
        <div className="animate-slide-up-fade motion-reduce:animate-fade-in relative mx-auto mb-10 mt-10 flex max-w-fit space-x-4 [--offset:5px] [animation-delay:300ms] [animation-duration:1s] [animation-fill-mode:both]">
          <Link href="https://cal.com/fveiras" target="_blank">
            <Button className="mx-auto !h-7 max-w-fit rounded-lg border border-black bg-black px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-800 hover:ring-4 hover:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:hover:ring-0">
              Book a call
            </Button>
          </Link>
          <Link href="/signUp">
            <Button
              className="mx-auto !h-7 max-w-fit rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-500 shadow-sm transition-all hover:border-gray-400 hover:text-gray-800 hover:ring-4 hover:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:hover:ring-0"
              variant="secondary"
            >
              Start for free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
