import React from "react";
import {Coins} from "lucide-react";
import {useSearchParams} from "next/navigation";

import {PriceSlider} from "../price-slider";
import {useUser} from "../../provider";

import {PaymentStatus} from "./payment-status";

import {Card} from "@/components/ui/card";
import {StripePaymentStatus} from "@/db/types";

export function AgencyScreen() {
  const {user_details} = useUser();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status");

  return (
    <div className="flex w-full flex-col gap-4">
      {paymentStatus && ["success", "pending", "error"].includes(paymentStatus) ? (
        <PaymentStatus payment_state={paymentStatus as StripePaymentStatus} />
      ) : null}
      <div className="flex w-full flex-row gap-6">
        <Card className="h-fit w-full">
          <div className="flex flex-row justify-between p-4">
            <h1 className="text-2xl">Credits</h1>
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-2xl">{user_details?.credits}</h1>
              <Coins />
            </div>
          </div>
        </Card>
        <PriceSlider />
      </div>
    </div>
  );
}
