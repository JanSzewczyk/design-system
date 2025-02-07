import * as React from "react";
import { twMerge } from "tailwind-merge";
import * as ReactAlertDialog from "@radix-ui/react-alert-dialog";

export type AlertDialogTitleProps = React.ComponentProps<typeof ReactAlertDialog.Title>;

export function AlertDialogTitle({ className, ref, ...props }: AlertDialogTitleProps) {
  return <ReactAlertDialog.Title ref={ref} className={twMerge("text-heading-6", className)} {...props} />;
}
