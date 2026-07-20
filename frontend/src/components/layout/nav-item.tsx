"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
}

export default function NavItem({
  href,
  icon,
  title,
}: NavItemProps) {
  const pathname = usePathname();

  const active = pathname.startsWith(href);

  return (
   <Link
        href={href}
        className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
            active
            ? "bg-slate-900 text-white shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
        >
        {icon}
        <span>{title}</span>
    </Link>
  );
}