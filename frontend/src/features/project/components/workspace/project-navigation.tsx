"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const menus = [
    {
        label: "Overview",
        href: "/overview",
    },
    {
        label: "Board",
        href: "/board",
    },
    {
        label: "List",
        href: "/list",
    },
];

interface Props {
    projectUuid: string;
}

export function ProjectNavigation({
    projectUuid,
}: Props) {
    const pathname = usePathname();

    return (
        <nav className="border-b">
            <div className="flex gap-8">
                {menus.map((menu) => {
                    const href = `/projects/${projectUuid}${menu.href}`;

                    return (
                        <Link
                            key={menu.label}
                            href={href}
                            className={cn(
                                "border-b-2 border-transparent py-4 text-sm font-medium transition-colors hover:text-primary",
                                pathname === href &&
                                    "border-primary text-primary"
                            )}
                        >
                            {menu.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}