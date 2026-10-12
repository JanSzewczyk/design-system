import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import * as React from "react";

import { Button, type ButtonProps } from "~/components/button";
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
    <Button asChild size={size} variant={variant}>
      <AlertDialogPrimitive.Action className={cn(className)} data-slot="alert-dialog-action" {...props} />
    </Button>
  );
}
