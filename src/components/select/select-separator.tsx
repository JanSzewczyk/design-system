import { Select as SelectPrimitive } from "radix-ui";
import React from "react";

import { cn } from "~/utils";

export type SelectSeparatorProps = React.ComponentProps<typeof SelectPrimitive.Separator>;

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}
