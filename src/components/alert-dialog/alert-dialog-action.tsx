import * as React from "react";

import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { Button, type ButtonProps } from "~/components";
import { cn } from "~/utils";

export type AlertDialogActionProps = React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<ButtonProps, "variant" | "size">;

export function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: AlertDialogActionProps) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action data-slot="alert-dialog-action" className={cn(className)} {...props} />
    </Button>
  );
}
