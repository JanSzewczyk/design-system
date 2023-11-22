import * as React from "react";
import { twMerge } from "tailwind-merge";
import * as ReactAlertDialog from "@radix-ui/react-alert-dialog";

export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<typeof ReactAlertDialog.Description>;

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof ReactAlertDialog.Description>,
  AlertDialogDescriptionProps
>(function ({ className, ...props }, ref) {
  return (
    <ReactAlertDialog.Description
      ref={ref}
      className={twMerge("text-gray-200 typography-body-2", className)}
      {...props}
    />
  );
});
