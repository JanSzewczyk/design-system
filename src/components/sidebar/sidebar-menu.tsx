import * as React from "react";

import { cn } from "~/utils";

export type SidebarMenuProps = React.ComponentProps<"ul">;

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      {...props}
    />
  );
}
