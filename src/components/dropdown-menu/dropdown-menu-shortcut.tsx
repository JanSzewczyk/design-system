import * as React from "react";

import { cn } from "~/utils";

export type DropdownMenuShortcutProps = React.ComponentProps<"span">;

export function DropdownMenuShortcut({ className, ...props }: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}
