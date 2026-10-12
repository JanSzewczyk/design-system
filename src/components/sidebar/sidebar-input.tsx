import * as React from "react";

import { Input } from "~/components/input";
import { cn } from "~/utils";

export type SidebarInputProps = React.ComponentProps<typeof Input>;

export function SidebarInput({ className, ...props }: SidebarInputProps) {
  return (
    <Input
      className={cn("h-8 w-full bg-background shadow-none", className)}
      data-sidebar="input"
      data-slot="sidebar-input"
      {...props}
    />
  );
}
