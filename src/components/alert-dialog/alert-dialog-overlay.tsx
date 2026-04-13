import * as React from "react";

import { AlertDialog as ReactAlertDialog } from "radix-ui";

import { cn } from "~/utils";

export type AlertDialogOverlayProps = React.ComponentProps<typeof ReactAlertDialog.Overlay>;

export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <ReactAlertDialog.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 bg-app-background/80 fixed inset-0 z-50 duration-100 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
}
