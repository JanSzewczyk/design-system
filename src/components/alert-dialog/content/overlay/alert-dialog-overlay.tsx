import * as ReactAlertDialog from "@radix-ui/react-alert-dialog";
import { twMerge } from "tailwind-merge";
import * as React from "react";

export type AlertDialogOverlayProps = React.ComponentProps<typeof ReactAlertDialog.Overlay>;

export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <ReactAlertDialog.Overlay
      className={twMerge(
        "z-60 fixed inset-0 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}
