import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>;

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      className={cn("px-2 py-1.5 text-muted-foreground text-xs", className)}
      data-slot="select-label"
      {...props}
    />
  );
}
