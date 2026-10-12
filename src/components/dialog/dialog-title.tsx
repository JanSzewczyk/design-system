import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn("font-semibold text-lg leading-none", className)}
      data-slot="dialog-title"
      {...props}
    />
  );
}
