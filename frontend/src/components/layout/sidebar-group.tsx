import { SidebarGroup as SidebarGroupType } from "@/config/sidebar";
import NavItem from "./nav-item";

interface SidebarGroupProps {
  group: SidebarGroupType;
}

export default function SidebarGroup({
  group,
}: SidebarGroupProps) {
  return (
    <div className="space-y-2">
      <p className="px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
        {group.group}
      </p>

      <div className="space-y-1">
        {group.items.map((item) => {
          const Icon = item.icon;

          return (
            <NavItem
              key={item.href}
              href={item.href}
              title={item.title}
              icon={<Icon className="h-5 w-5" />}
            />
          );
        })}
      </div>
    </div>
  );
}