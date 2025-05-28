import * as React from "react";

import { AlertDialog as ReactAlertDialog } from "radix-ui";

import { cn } from "~/utils";

export type AlertDialogTitleProps = React.ComponentProps<typeof ReactAlertDialog.Title>;

export function AlertDialogTitle({ className, ref, ...props }: AlertDialogTitleProps) {
  return <ReactAlertDialog.Title ref={ref} className={cn("text-heading-6", className)} {...props} />;
}
