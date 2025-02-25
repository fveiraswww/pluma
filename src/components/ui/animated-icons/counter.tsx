"use client";

import type {Variants} from "framer-motion";

import {motion, useAnimation} from "framer-motion";

const handVariants: Variants = {
  normal: {
    rotate: 0,
    originX: "12px",
    originY: "14px",
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  animate: {
    rotate: 300,
    transition: {
      delay: 0.1,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const buttonVariants: Variants = {
  normal: {
    scale: 1,
    y: 0,
  },
  animate: {
    scale: [0.9, 1],
    y: [0, 1, 0],
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

function TimerIcon() {
  const controls = useAnimation();

  return (
    <div
      className="flex cursor-pointer select-none items-center justify-center rounded-md transition-colors duration-200"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        fill="none"
        height="28"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line animate={controls} variants={buttonVariants} x1="10" x2="14" y1="2" y2="2" />
        <motion.line
          animate={controls}
          initial="normal"
          variants={handVariants}
          x1="12"
          x2="15"
          y1="14"
          y2="11"
        />
        <circle cx="12" cy="14" r="8" />
      </svg>
    </div>
  );
}

export {TimerIcon};
