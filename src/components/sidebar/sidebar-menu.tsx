import * as React from "react";

import { cn } from "~/utils";

export type SidebarMenuProps = React.ComponentProps<"ul">;

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      data-sidebar="menu"
      data-slot="sidebar-menu"
      {...props}
    />
  );
}
