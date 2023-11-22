import * as ReactAlertDialog from "@radix-ui/react-alert-dialog";
import { twMerge } from "tailwind-merge";
import * as React from "react";

export type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<typeof ReactAlertDialog.Overlay>;
export const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof ReactAlertDialog.Overlay>,
  AlertDialogOverlayProps
>(function ({ className, ...props }, ref) {
  return (
    <ReactAlertDialog.Overlay
      className={twMerge(
        "fixed inset-0 z-60 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
      ref={ref}
    />
  );
});
