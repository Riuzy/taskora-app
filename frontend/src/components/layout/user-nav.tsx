"use client";

import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function UserNav() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    try {
      await authApi.logout();
    } catch (error) {
      // ignore
    }

    logout();

    router.replace("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>

        <button className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-100">

          <Avatar className="h-10 w-10">

            <AvatarImage src={user?.avatar ?? ""} />

            <AvatarFallback>
              {user?.name?.charAt(0)}
            </AvatarFallback>

          </Avatar>

          <div className="hidden text-left md:block">

            <p className="text-sm font-semibold">
              {user?.name}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {user?.role}
            </p>

          </div>

        </button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl"
      >
        <DropdownMenuLabel>

          <p>{user?.name}</p>

          <p className="text-xs font-normal text-slate-500">
            {user?.email}
          </p>

        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>

          <User className="mr-2 h-4 w-4" />

          Profile

        </DropdownMenuItem>

        <DropdownMenuItem>

          <Settings className="mr-2 h-4 w-4" />

          Settings

        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />

          Logout

        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}