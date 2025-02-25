import React from "react";

import {cn} from "@/lib/utils";

export function StripeStatus({status}: {status: boolean | "loading"}) {
  return (
    <div
      className={cn(
        "mb-1 inline-flex w-fit cursor-pointer flex-row items-center gap-2 rounded-full border border-gray-300 px-2 dark:border-grey-border",
        {
          "!border-none bg-brand-secondary text-brand-text": status,
        },
      )}
    >
      <div
        className={cn("h-2 w-2 rounded-full bg-grey-lab", {
          "animate-pulse !bg-brand": status,
        })}
      />
      <p className="text-sm">
        {status === "loading"
          ? "Loading..."
          : status
            ? "Stripe Account Connected"
            : "Stripe Account Disconnected"}
      </p>
    </div>
  );
}
