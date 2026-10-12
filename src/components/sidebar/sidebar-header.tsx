import * as React from "react";

import { cn } from "~/utils";

export type SidebarHeaderProps = React.ComponentProps<"div">;

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-2", className)}
      data-sidebar="header"
      data-slot="sidebar-header"
      {...props}
    />
  );
}
