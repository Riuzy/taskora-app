import { Bell, Search } from "lucide-react";

import UserNav from "./user-nav";

import { Input } from "@/components/ui/input";

export default function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">

      <div className="relative hidden w-96 md:block">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <Input
          placeholder="Search..."
          className="pl-10"
        />

      </div>

      <div className="ml-auto flex items-center gap-4">

        <button className="rounded-xl p-2 transition hover:bg-slate-100">

          <Bell size={20} />

        </button>

        <UserNav />

      </div>

    </header>
  );
}