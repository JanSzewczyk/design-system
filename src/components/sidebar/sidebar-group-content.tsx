import * as React from "react";

import { cn } from "~/utils";

export type SidebarGroupContentProps = React.ComponentProps<"div">;

export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return (
    <div
      className={cn("w-full text-sm", className)}
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      {...props}
    />
  );
}
