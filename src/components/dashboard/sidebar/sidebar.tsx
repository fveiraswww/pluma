"use client";

import {Airplay, Coins, Home, Inbox, Settings, Workflow} from "lucide-react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useTheme} from "next-themes";

import {useUser} from "../provider";

import CollapsibleProfileMenu from "./collapsible-profile";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {cn} from "@/lib/utils";

export default function ResizableSidebar() {
  const {user_details} = useUser();
  const pathname = usePathname();

  const items = [
    {
      title: "Home",
      url: `/dashboard/${user_details?.username}`,
      icon: Home,
    },
    {
      title: "Conexiones",
      url: `/dashboard/${user_details?.username}/connections`,
      icon: Workflow,
    },
    {
      title: "Configuración",
      url: `/dashboard/${user_details?.username}/settings`,
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="!border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1 className="text-xl font-bold !text-primary">🪶 Pluma</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent className="my-8">
            <SidebarMenu>
              {items.map((item) => {
                if (user_details?.type === "agency" && item.title === "Stream control") return;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a className={cn({"bg-background": pathname === item.url})} href={item.url}>
                        <item.icon className="mr-2" />
                        <span className="text-md">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <CollapsibleProfileMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
