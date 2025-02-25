"use client";

import * as React from "react";
import {motion} from "framer-motion";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

import {useUser} from "../provider";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import useSession from "@/lib/hooks/use-session";

export function PriceSlider() {
  const [amount, setAmount] = React.useState(0);
  const {session} = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function buyCredits() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/buy-credits", {
        method: "POST",
        body: JSON.stringify({amount}),
        headers: {
          Authorization: session?.access_token ?? "",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();

        toast.error(errorData);

        return;
      }

      const {url} = await response.json();

      router.push(url);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Charge credits (usd)</CardTitle>
        <CardDescription>Select your budget</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Slider
            className="w-full"
            max={2000}
            min={5}
            step={1}
            value={[amount]}
            onValueChange={(value) => setAmount(value[0])}
          />
          <motion.div
            key={amount}
            animate={{scale: 1, opacity: 1}}
            className="text-center text-4xl font-bold"
            initial={{scale: 0.8, opacity: 0}}
            transition={{type: "spring", stiffness: 300, damping: 20}}
          >
            ${amount}
          </motion.div>
        </div>
        {session?.access_token ? (
          <Button className="w-full" disabled={isLoading} onClick={() => buyCredits()}>
            Buy
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
