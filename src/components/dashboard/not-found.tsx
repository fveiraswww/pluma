import {ExternalLink, Info} from "lucide-react";
import Link from "next/link";
import React from "react";

import {Separator} from "../ui/separator";

export function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <h1 className="font-bol text-2xl font-bold">Form not found</h1>
      <div className="flex h-4 flex-row justify-center gap-2">
        <Link
          className="flex flex-row items-center justify-center gap-2 transition-all hover:text-black/50"
          href="/"
          target="_blank"
        >
          <p className="font-medium">Create form</p>
          <ExternalLink height={18} width={18} />
        </Link>
        <Separator orientation="vertical" />
        <Link
          className="flex flex-row items-center justify-center gap-2 transition-all hover:text-black/50"
          href="mailto:hello@skalebox.com"
        >
          <p className="font-medium">Need help?</p>
          <Info height={18} width={18} />
        </Link>
      </div>
    </div>
  );
}
