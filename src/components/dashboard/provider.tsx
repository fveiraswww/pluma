"use client";

import {User} from "@supabase/supabase-js";
import {ThemeProvider} from "next-themes";
import React, {type ReactNode, createContext, useContext, useMemo, useState} from "react";

import {UserData} from "@/app/(dashboard)/layout";

interface UserDataContextType {
  user: User | null;
  user_details: UserData | null;
  live: boolean | null;
  updateLiveStatus: (status: boolean) => void;
}

export const UserDataContext = createContext<UserDataContextType>({
  user: null,
  user_details: null,
  live: null,
  updateLiveStatus: () => {},
});

function Provider({
  children,
  user,
  user_details,
}: {
  children: ReactNode;
  user: User | null;
  user_details: UserData | null;
}) {
  const [live, setLive] = useState<boolean | null>(null);

  const updateLiveStatus = (status: boolean) => {
    setLive(status);
  };

  const value = useMemo(
    () => ({
      user,
      user_details,
      live,
      updateLiveStatus,
    }),
    [user_details, user, live],
  );

  return (
    <UserDataContext.Provider value={value}>
      <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
        {children}
      </ThemeProvider>
    </UserDataContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("useUser must be used within a BusinessProvider");
  }

  return context;
};

export default Provider;
