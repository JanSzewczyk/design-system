import * as React from "react";

import { AlertDialog as ReactAlertDialog } from "radix-ui";

import { cn } from "~/utils";

export type AlertDialogDescriptionProps = React.ComponentProps<typeof ReactAlertDialog.Description>;

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <ReactAlertDialog.Description className={cn("text-body-2 text-gray-200", className)} {...props} />;
}
