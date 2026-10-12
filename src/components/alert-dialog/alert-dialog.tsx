import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import * as React from "react";

export type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>;

export function AlertDialog(props: AlertDialogProps) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}
