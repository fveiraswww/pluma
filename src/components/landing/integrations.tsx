import Image from "next/image";
import React from "react";

export function Integrations() {
  return (
    <div className="mx-auto w-full max-w-screen-lg px-3 py-16 md:py-32 lg:px-10">
      <div className="mx-auto w-full max-w-xl px-4 text-center">
        <h2 className="font-display text-balance text-3xl font-medium text-neutral-900">
          Our integrations
        </h2>
        <p className="mt-3 text-pretty text-lg text-neutral-500">
          SkaleBox supports any streaming platform that works with OBS, offering quick and
          hassle-free connections.
        </p>
      </div>
      <div className="relative h-80 overflow-hidden md:h-64">
        <svg
          className="pointer-events-none absolute inset-[unset] left-1/2 top-0 w-[1200px] -translate-x-1/2 text-neutral-300 [mask-image:radial-gradient(closest-side,black,transparent)]"
          height="100%"
          width="100%"
        >
          <defs>
            <pattern
              height="80"
              id="grid-:r5:"
              patternUnits="userSpaceOnUse"
              width="80"
              x="-0.5"
              y="0"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect fill="url(#grid-:r5:)" height="100%" width="100%" />
        </svg>
        <div className="relative flex flex-col items-center justify-center gap-x-[82px] pt-[81px] md:flex-row">
          <div className="border-box group relative flex h-[79px] w-[238px] items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-10 rounded-full bg-[var(--accent-color-twitch)] opacity-15 blur-xl" />
            <div className="absolute inset-0 bg-white" />
            <Image
              alt=""
              className="relative h-12 w-auto"
              height={182}
              src="/brands/twitch.webp"
              width={520}
            />
          </div>
          <div className="border-box group relative flex h-[79px] w-[238px] items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-10 rounded-full bg-[var(--accent-color-kick)] opacity-15 blur-xl" />
            <div className="absolute inset-0 bg-white" />
            <Image
              alt=""
              className="relative h-12 w-auto"
              height={182}
              src="/brands/kick.webp"
              width={520}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
