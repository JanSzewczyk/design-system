import * as ReactAlertDialog from "@radix-ui/react-alert-dialog";
import * as React from "react";
import { AlertDialogOverlay } from "./overlay";
import { twMerge } from "tailwind-merge";

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<typeof ReactAlertDialog.Content>;
export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof ReactAlertDialog.Content>,
  AlertDialogContentProps
>(function ({ className, ...props }, ref) {
  return (
    <ReactAlertDialog.Portal>
      <AlertDialogOverlay />
      <ReactAlertDialog.Content
        ref={ref}
        className={twMerge(
          "fixed left-1/2 top-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col rounded border border-gray-400 bg-foreground p-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          className
        )}
        {...props}
      />
    </ReactAlertDialog.Portal>
  );
});
