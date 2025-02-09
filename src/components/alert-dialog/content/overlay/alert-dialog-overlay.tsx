import * as React from "react";

import { AlertDialog as ReactAlertDialog } from "radix-ui";

import { cn } from "~/utils";

export type AlertDialogOverlayProps = React.ComponentProps<typeof ReactAlertDialog.Overlay>;

export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <ReactAlertDialog.Overlay
      className={cn(
        "bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
}
