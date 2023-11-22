import * as React from "react";
import { twMerge } from "tailwind-merge";
import * as ReactAlertDialog from "@radix-ui/react-alert-dialog";

export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof ReactAlertDialog.Title>;

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof ReactAlertDialog.Title>,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => (
  <ReactAlertDialog.Title ref={ref} className={twMerge("typography-heading-6", className)} {...props} />
));
