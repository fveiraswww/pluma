import {DiscIcon as DiscordIcon, GithubIcon, TwitterIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {Button} from "@/components/ui/button";

export function Footer() {
  return (
    <div className="xl:px-0l relative mx-auto my-10 w-full max-w-screen-lg px-3 py-2 lg:px-4">
      <div className="mb-24 flex items-center justify-between">
        <div>
          <h2 className="font-display text-balance text-2xl font-medium text-neutral-900">
            Try SkaleBox Today
          </h2>
          <p className="mt-3 text-pretty text-lg text-neutral-300">
            Start for free, then grow with your team.
          </p>
        </div>
        <Button
          className="!h-7 max-w-fit rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-500 shadow-sm transition-all hover:border-gray-400 hover:text-gray-800 hover:ring-4 hover:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:hover:ring-0"
          variant="secondary"
        >
          Get Started
        </Button>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <Image
            alt="logo skalebox"
            className="mb-2"
            height={100}
            src="/complete-logo.svg"
            width={100}
          />
          <p className="text-sm text-gray-500">© 2025 SkaleBox – Stream ads with superpowers.</p>
        </div>

        <div className="flex flex-col items-end gap-6">
          {/* Navigation */}
          <nav className="flex gap-8">
            <Link className="text-gray-600 hover:text-purple-600" href="/">
              Home
            </Link>
            <Link className="text-gray-600 hover:text-purple-600" href="/docs">
              Docs
            </Link>
            <Link className="text-gray-600 hover:text-purple-600" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-gray-600 hover:text-purple-600" href="/privacy">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
