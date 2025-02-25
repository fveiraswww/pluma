"use client";
import React from "react";
import {TriangleAlert} from "lucide-react";
import Link from "next/link";

import {useUser} from "../../provider";

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";

export function CompleteProfile() {
  const {user_details} = useUser();

  return (
    <>
      {user_details?.type === "streamer" && !user_details?.streamer_profile && (
        <Alert className="flex flex-row items-center justify-between border-yellow-500 bg-yellow-500/10">
          <div>
            <AlertTitle>
              <TriangleAlert className="mr-2 inline-block h-4 w-4" />
              Complete Streamer Profile
            </AlertTitle>
            <AlertDescription>
              To start receiving applications, it is necessary to complete the streamer profile, the
              information will be evaluated by the brands
            </AlertDescription>
          </div>
          <Link href={`${user_details?.username}/settings`}>
            <Button className="!h-7 rounded-full">Complete profile</Button>
          </Link>
        </Alert>
      )}
    </>
  );
}
