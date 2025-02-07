import * as ReactAlertDialog from "@radix-ui/react-alert-dialog";
import { twMerge } from "tailwind-merge";
import * as React from "react";

export type AlertDialogOverlayProps = React.ComponentProps<typeof ReactAlertDialog.Overlay>;

export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <ReactAlertDialog.Overlay
      className={twMerge(
        "bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
}
