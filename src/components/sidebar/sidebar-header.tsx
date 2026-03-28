import * as React from "react";

import { cn } from "~/utils";

export type SidebarHeaderProps = React.ComponentProps<"div">;

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}
