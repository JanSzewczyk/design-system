import * as React from "react";

import { Dialog as SheetPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground text-base font-medium", className)}
      {...props}
    />
  );
}
