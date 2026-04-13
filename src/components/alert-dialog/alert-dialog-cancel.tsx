import * as React from "react";

import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { Button, type ButtonProps } from "~/components";
import { cn } from "~/utils";

export type AlertDialogCancelProps = React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<ButtonProps, "variant" | "size">;

export function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialogCancelProps) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" className={cn(className)} {...props} />
    </Button>
  );
}
