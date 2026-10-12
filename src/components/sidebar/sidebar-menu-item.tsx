import * as React from "react";

import { cn } from "~/utils";

export type SidebarMenuItemProps = React.ComponentProps<"li">;

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      className={cn("group/menu-item relative", className)}
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}
