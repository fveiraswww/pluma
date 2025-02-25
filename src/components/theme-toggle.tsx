"use client";

import * as React from "react";
import {Monitor, Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

export default function ThemeToggle() {
  const {theme, setTheme} = useTheme();

  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-1">
      <span className="text-sm font-normal">Theme</span>
      <div className="flex items-center rounded-full border px-1">
        <button
          aria-label="System theme"
          className={`rounded-full p-1.5 ${theme === "system" ? "text-white" : "text-neutral-600"}`}
          type="button"
          onClick={() => setTheme("system")}
        >
          <Monitor className="h-[18px] w-[18px]" />
        </button>
        <button
          aria-label="Light theme"
          className={`rounded-full p-1.5 ${theme === "light" ? "text-black" : "text-neutral-600"}`}
          type="button"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-[18px] w-[18px]" />
        </button>
        <button
          aria-label="Dark theme"
          className={`rounded-full p-1.5 ${theme === "dark" ? "text-white" : "text-neutral-600"}`}
          type="button"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
