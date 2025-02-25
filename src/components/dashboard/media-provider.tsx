/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {type ReactNode, createContext, useContext, useRef, useState} from "react";

interface MediaContextType {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  playerRef: React.RefObject<any>;
}

export const MediaContext = createContext<MediaContextType>({
  currentTime: 0,
  currentPage: 0,
  setCurrentTime: () => {},
  setCurrentPage: () => {},
  playerRef: {current: null},
});

export function MediaProvider({
  children,
  defaultPage,
}: {
  children: ReactNode;
  defaultPage?: number;
}) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(defaultPage ?? 1);
  const playerRef = useRef<any>(null);

  return (
    <MediaContext.Provider
      value={{currentTime, currentPage, setCurrentPage, setCurrentTime, playerRef}}
    >
      {children}
    </MediaContext.Provider>
  );
}

export const useMedia = () => {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }

  return context;
};
