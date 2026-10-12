import * as React from "react";

import { cn } from "~/utils";

export type SidebarMenuSubItemProps = React.ComponentProps<"li">;

export function SidebarMenuSubItem({ className, ...props }: SidebarMenuSubItemProps) {
  return (
    <li
      className={cn("group/menu-sub-item relative", className)}
      data-sidebar="menu-sub-item"
      data-slot="sidebar-menu-sub-item"
      {...props}
    />
  );
}
