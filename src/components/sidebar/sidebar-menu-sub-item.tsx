import * as React from "react";

import { cn } from "~/utils";

export type SidebarMenuSubItemProps = React.ComponentProps<"li">;

export function SidebarMenuSubItem({ className, ...props }: SidebarMenuSubItemProps) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}
