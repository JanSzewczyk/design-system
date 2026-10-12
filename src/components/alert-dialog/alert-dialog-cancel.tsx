import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import * as React from "react";

import { Button, type ButtonProps } from "~/components/button";
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
    <Button asChild size={size} variant={variant}>
      <AlertDialogPrimitive.Cancel className={cn(className)} data-slot="alert-dialog-cancel" {...props} />
    </Button>
  );
}
