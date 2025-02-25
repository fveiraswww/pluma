/* eslint-disable jsx-a11y/iframe-has-title */
"use client";

import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Play, XIcon} from "lucide-react";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
}

const animationVariants = {
  "from-bottom": {
    initial: {y: "100%", opacity: 0},
    animate: {y: 0, opacity: 1},
    exit: {y: "100%", opacity: 0},
  },
  "from-center": {
    initial: {scale: 0.5, opacity: 0},
    animate: {scale: 1, opacity: 1},
    exit: {scale: 0.5, opacity: 0},
  },
  "from-top": {
    initial: {y: "-100%", opacity: 0},
    animate: {y: 0, opacity: 1},
    exit: {y: "-100%", opacity: 0},
  },
  "from-left": {
    initial: {x: "-100%", opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: "-100%", opacity: 0},
  },
  "from-right": {
    initial: {x: "100%", opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: "100%", opacity: 0},
  },
  fade: {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
  },
  "top-in-bottom-out": {
    initial: {y: "-100%", opacity: 0},
    animate: {y: 0, opacity: 1},
    exit: {y: "100%", opacity: 0},
  },
  "left-in-right-out": {
    initial: {x: "-100%", opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: "100%", opacity: 0},
  },
};

export default function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isPlayHovered, setIsPlayHovered] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={openVideo}>
        <img
          alt={thumbnailAlt}
          className="w-full rounded-2xl"
          height={1080}
          src={thumbnailSrc}
          width={1920}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex size-24 items-center justify-center rounded-full border border-neutral-800 backdrop-blur-md transition-transform duration-300 ease-out"
            onMouseEnter={() => setIsPlayHovered(true)}
            onMouseLeave={() => setIsPlayHovered(false)}
          >
            <div
              className={`relative flex size-20 items-center justify-center rounded-full border border-neutral-800 backdrop-blur-2xl transition-all duration-300 ease-out ${
                isPlayHovered ? "scale-105" : "scale-100"
              }`}
            >
              <Play
                className="size-8 text-white"
                style={{
                  transform: isPlayHovered ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen ? (
          <motion.div
            animate={{opacity: 1}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            exit={{opacity: 0}}
            initial={{opacity: 0}}
          >
            <motion.div
              {...selectedAnimation}
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
              transition={{type: "spring", damping: 30, stiffness: 300}}
            >
              <motion.button
                className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                onClick={closeVideo}
                onHoverEnd={() => setIsCloseHovered(false)}
                onHoverStart={() => setIsCloseHovered(true)}
              >
                <XIcon className="size-5" />
              </motion.button>
              <motion.div
                animate={{scale: isCloseHovered ? 0.98 : 1}}
                className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white"
                transition={{duration: 0.2}}
              >
                <iframe
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="size-full rounded-2xl"
                  src={videoSrc}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
