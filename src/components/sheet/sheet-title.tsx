import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <SheetPrimitive.Title
      className={cn("font-medium text-base text-foreground", className)}
      data-slot="sheet-title"
      {...props}
    />
  );
}
