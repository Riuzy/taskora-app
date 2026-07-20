import {
  CircleHelp,
  FolderKanban,
  LayoutDashboard,
  UserRound,
  UsersRound,
} from "lucide-react";


import { ElementType } from "react";

export interface SidebarItem {
  title: string;
  href: string;
  icon: ElementType;
  badge?: number | string;
  disabled?: boolean;
}

export interface SidebarGroup {
  group: string;
  items: SidebarItem[];
}

export interface SidebarGroup {
  group: string;
  items: SidebarItem[];
}

export const managerSidebar: SidebarGroup[] = [
  {
    group: "MAIN",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Teams",
        href: "/teams",
        icon: UsersRound,
      },
      {
        title: "Users",
        href: "/users",
        icon: UserRound,
      },
      {
        title: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
    ],
  },
  {
    group: "SUPPORT",
    items: [
      {
        title: "Help",
        href: "/help",
        icon: CircleHelp,
      },
    ],
  },
];

export const staffSidebar: SidebarGroup[] = [
  {
    group: "MAIN",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Team",
        href: "/my-team",
        icon: UsersRound,
      },
      {
        title: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
    ],
  },
  {
    group: "SUPPORT",
    items: [
      {
        title: "Help",
        href: "/help",
        icon: CircleHelp,
      },
    ],
  },
];