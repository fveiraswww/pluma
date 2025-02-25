"use client";

import {useState, useRef, useEffect} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {Airplay, ArrowRight, Calendar, Clock} from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import Image from "next/image";

import {useUser} from "../../provider";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Request} from "@/db/types";
import {Markdown} from "@/components/ui/markdown";

export default function RequestsPreview({requests}: {requests: Request[]}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {user_details} = useUser();

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const isOverflowing =
          scrollContainerRef.current.scrollHeight > scrollContainerRef.current.clientHeight;

        setShowGradient(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [requests]);

  return (
    <Link
      className="block w-full no-underline"
      href={`/dashboard/${user_details?.username}/stream-control`}
    >
      <div
        className="relative cursor-pointer rounded-lg border border-border bg-background p-6 shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-4 flex flex-row items-center gap-2">
          <h2 className="text-xl text-foreground">Stream control</h2>
          <Airplay />
        </div>
        <div ref={scrollContainerRef} className="relative max-h-[50vh] space-y-4 overflow-hidden">
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <motion.div
                key={index}
                animate={{opacity: 1, y: 0}}
                initial={{opacity: 0, y: 20}}
                transition={{delay: index * 0.1}}
              >
                <Card className="relative overflow-hidden !p-2">
                  <CardHeader className="!p-2">
                    <CardTitle className="text-lg">{request.title || "Untitled Request"}</CardTitle>
                  </CardHeader>
                  <CardContent className="!p-2">
                    <p className="mb-2 text-sm text-muted-foreground">
                      <Markdown content={request?.description || "No description provided"} />
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(request.duration)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDistanceToNow(request.created_at, {addSuffix: true})}</span>
                      </div>
                    </div>
                  </CardContent>
                  {request.image_url ? (
                    <div className="absolute bottom-0 right-0 top-0 w-1/3 overflow-hidden">
                      <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent to-background" />
                      <Image
                        alt={request.title || "Request image"}
                        className="opacity-50"
                        layout="fill"
                        objectFit="cover"
                        src={request.image_url || "/placeholder.svg"}
                      />
                    </div>
                  ) : null}
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div animate={{opacity: 1}} initial={{opacity: 0}} transition={{delay: 0.2}}>
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No requests available</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {showGradient ? (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
          ) : null}
        </div>
        <motion.div
          animate={{x: isHovered ? 10 : 0}}
          className="absolute bottom-4 right-4 z-20 flex items-center text-primary"
        >
          <span className="mr-2">View all requests</span>
          <ArrowRight size={20} />
        </motion.div>
      </div>
    </Link>
  );
}

function getStatusColor(status: "approved" | "pending" | "rejected") {
  switch (status) {
    case "approved":
      return "text-green-600 dark:text-green-400";
    case "rejected":
      return "text-red-600 dark:text-red-400";
    case "pending":
      return "text-yellow-600 dark:text-yellow-400";
  }
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}
