import * as React from "react";

import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>;

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}
