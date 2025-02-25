import confetti from "canvas-confetti";
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import removeMd from "remove-markdown";
import {ReadonlyURLSearchParams} from "next/navigation";

import {MultiSelectProps} from "@/components/ui/multi-select";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseEnumToArray = <T extends object>(_enum: T) => {
  return Object.values(_enum) as string[];
};

export function removeMarkdown(text: string): string {
  const plainText = removeMd(text);

  return plainText;
}

export const getConfetti = () => {
  const end = Date.now() + 1 * 1000; // 3 seconds
  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: {x: 0, y: 0.5},
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: {x: 1, y: 0.5},
      colors: colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
};

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;

  return /Mobi|Android/i.test(window.navigator.userAgent) || window.innerWidth <= 768;
};

export const categories: MultiSelectProps["options"] = [
  {id: 6, label: "Slots"},
  {id: 2, label: "IRL"},
  {id: 5, label: "Just Chatting"},
  {id: 1, label: "Gaming"},
  {id: 3, label: "Music"},
  {id: 4, label: "Art"},
];
