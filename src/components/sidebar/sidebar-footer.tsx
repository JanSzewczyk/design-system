import * as React from "react";

import { cn } from "~/utils";

export type SidebarFooterProps = React.ComponentProps<"div">;

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-2", className)}
      data-sidebar="footer"
      data-slot="sidebar-footer"
      {...props}
    />
  );
}
