"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Loan",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "User",
    url: "/dashboard/users",
    icon: Inbox,
  },

 
];

export function AppSidebar() {
  const handleLogout = () => {
 
    localStorage.clear();
  
    window.location.href = "/signin";
  };

  return (
    <Sidebar className="text-white ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <span
          className=" self-start ml-3 m-auto cursor-pointer border p-3 "
          onClick={handleLogout}
        >
          Logout
        </span>
      </SidebarContent>
    </Sidebar>
  );
}
