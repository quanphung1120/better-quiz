"use client";
import * as React from "react";

import {
  Bot,
  Frame,
  Library,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-admin";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Explore Cards",
      url: "#",
      icon: SquareTerminal,
      // isActive: true,
    },
    {
      title: "Your Cards",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  admin: [
    {
      name: "User Management",
      url: "dashboard/user-management",
      icon: Frame,
    },
    {
      name: "Analytics",
      url: "analytics",
      icon: PieChart,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null | undefined;
    role: string | null | undefined;
  };
}

export function AppSidebar({
  user: { id, email, name, image, role },
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Library className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Better Quiz</span>
                  <span className="truncate text-xs">Free Tier</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {role === "admin" && <NavProjects projects={data.admin} />}

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ id, email, name, image, role }} />
      </SidebarFooter>
    </Sidebar>
  );
}
