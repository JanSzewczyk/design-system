import * as React from "react";

import { cn } from "~/utils";

export type SidebarMenuItemProps = React.ComponentProps<"li">;

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}
