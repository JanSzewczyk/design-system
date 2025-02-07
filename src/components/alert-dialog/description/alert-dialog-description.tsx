import * as React from "react";
import { twMerge } from "tailwind-merge";
import * as ReactAlertDialog from "@radix-ui/react-alert-dialog";

export type AlertDialogDescriptionProps = React.ComponentProps<typeof ReactAlertDialog.Description>;

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <ReactAlertDialog.Description className={twMerge("text-body-2 text-gray-200", className)} {...props} />;
}
