"use client";

import {motion, AnimatePresence} from "framer-motion";
import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

import {Button} from "@/components/ui/button";

interface Streamer {
  username: string;
  imageUrl: string;
}

const streamers: Streamer[] = [
  {username: "@lopezzjoacoo", imageUrl: "/influencers/joaco.webp"},
  {username: "@eldengueee", imageUrl: "/influencers/dengue.webp"},
  {username: "@facuasmus", imageUrl: "/influencers/facu.webp"},
  {username: "@octavioappogh", imageUrl: "/influencers/oky.webp"},
];

const duplicatedStreamers = [...streamers, ...streamers];

export default function StreamerCarousel() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16">
      <h2 className="font-display text-neutral-90 mb-14 text-balance text-center text-3xl font-medium">
        Giving streaming superpowers
        <br />
        to world-class creators
      </h2>
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          className="flex items-center gap-16 md:gap-24"
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {duplicatedStreamers.map((streamer, index) => (
            <motion.div
              key={`${streamer.username}-${index}`}
              className="flex flex-shrink-0 items-center gap-3"
              transition={{duration: 0.2}}
              whileHover={{scale: 1.05}}
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-gray-100">
                <Image
                  fill
                  alt={`${streamer.username}'s profile`}
                  className="object-cover"
                  src={streamer.imageUrl || "/placeholder.svg"}
                />
              </div>
              <span className="whitespace-nowrap text-lg font-medium text-gray-600">
                {streamer.username}
              </span>
            </motion.div>
          ))}
        </motion.div>
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent" />

        {/* Hover overlay with blur and button */}
        <AnimatePresence>
          {isHovered ? (
            <motion.div
              animate={{opacity: 1, backdropFilter: "blur(4px)"}}
              className="absolute inset-0 flex items-center justify-center"
              exit={{opacity: 0, backdropFilter: "blur(0px)"}}
              initial={{opacity: 0, backdropFilter: "blur(0px)"}}
              style={{
                background: "rgba(255, 255, 255, 0.7)",
              }}
              transition={{duration: 0.3, ease: "easeInOut"}}
            >
              <motion.div
                animate={{y: 0, opacity: 1}}
                exit={{y: 20, opacity: 0}}
                initial={{y: 20, opacity: 0}}
                transition={{delay: 0.1, duration: 0.3, ease: "easeOut"}}
              >
                <Link href="/streamers">
                  <Button className="text-lg font-medium" size="lg" variant="outline">
                    See full list of streamers
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
