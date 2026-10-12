import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>;

export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}
