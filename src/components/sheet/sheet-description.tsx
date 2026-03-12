import * as React from "react";

import { Dialog as SheetPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>;

export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
