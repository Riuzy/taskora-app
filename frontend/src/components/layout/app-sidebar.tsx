"use client";

import AppLogo from "./app-logo";
import SidebarGroup from "./sidebar-group";

import {
  managerSidebar,
  staffSidebar,
} from "@/config/sidebar";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function AppSidebar() {
  const user = useAuthStore((state) => state.user);

  const groups =
    user?.role === "manager"
      ? managerSidebar
      : staffSidebar;

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r bg-white">

      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <AppLogo />
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto px-4 py-6">

        {groups.map((group) => (
          <SidebarGroup
            key={group.group}
            group={group}
          />
        ))}

      </div>

    </aside>
  );
}