import { AlertDialog as ReactAlertDialog } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type AlertDialogOverlayProps = React.ComponentProps<typeof ReactAlertDialog.Overlay>;

export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <ReactAlertDialog.Overlay
      className={cn(
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-50 bg-app-background/80 duration-100 data-[state=closed]:animate-out data-[state=open]:animate-in supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      data-slot="alert-dialog-overlay"
      {...props}
    />
  );
}
