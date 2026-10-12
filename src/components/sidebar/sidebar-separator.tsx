import * as React from "react";

import { Separator } from "~/components/separator";
import { cn } from "~/utils";

export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;

export function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
  return (
    <Separator
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      data-sidebar="separator"
      data-slot="sidebar-separator"
      {...props}
    />
  );
}
