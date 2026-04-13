import * as React from "react";

import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

export type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>;

export function AlertDialog(props: AlertDialogProps) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}
