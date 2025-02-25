"use client";
import {Check, ClipboardCheck, Copy, Earth} from "lucide-react";
import {toast} from "sonner";
import {useState} from "react";
import {useRouter} from "next/navigation";

import {useUser} from "./provider";

import {Button} from "@/components/ui/button";

export default function Stepper({url}: {url: string}) {
  const [isCopied, setIsCopied] = useState(false);
  const {user_details} = useUser();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${url}/overlay/${user_details?.user_id}`);
    setIsCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="font-display text-3xl tracking-tight">Connect to Your App</h1>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-4 h-[calc(100%-32px)] w-[2px] bg-border" />

        {/* Step 2 */}
        <div className="relative">
          <div className="flex gap-4">
            <div className="h-6 w-6 rounded-full border-2 border-border bg-background" />
            <div className="space-y-2 pb-8">
              <h2 className="text-lg font-semibold">Add new source in OBS</h2>
              <p className="text-muted-foreground">
                Select add browser source - Create new
                <Earth className="ml-2 inline-block" height={18} width={18} />
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {/* Step 1 */}
          <div className="relative">
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full border-2 border-border bg-background" />
              <div className="space-y-2 pb-8">
                <h2 className="text-lg font-semibold">Copy your overlay link</h2>
                <p className="text-muted-foreground">paste the link in URL field</p>
                <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-2 py-1">
                  <code className="text-sm">
                    https://skalebox.com/overlay/
                    {user_details?.user_id?.slice(0, 10) ?? "" + "..."}
                  </code>
                  <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                    {isCopied ? (
                      <ClipboardCheck className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full border-2 border-border bg-background" />
              <div className="space-y-2 pb-8">
                <h2 className="text-lg font-semibold">Configure width and height</h2>
                <p className="text-muted-foreground">recommended: width 800 & height 200</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full border-2 border-border bg-background" />
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Complete setup</h2>
                <p className="text-muted-foreground">
                  resize the notification size as you like and that&apos;s it!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
