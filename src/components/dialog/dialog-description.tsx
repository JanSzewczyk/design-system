import * as React from "react";

import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>;

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
