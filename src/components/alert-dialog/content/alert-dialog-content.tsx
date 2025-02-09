import * as React from "react";

import { AlertDialog as ReactAlertDialog } from "radix-ui";

import { cn } from "~/utils";

import { AlertDialogOverlay } from "./overlay";

export type AlertDialogContentProps = React.ComponentProps<typeof ReactAlertDialog.Content>;

export function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  return (
    <ReactAlertDialog.Portal>
      <AlertDialogOverlay />
      <ReactAlertDialog.Content
        className={cn(
          "bg-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-1/2 left-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col rounded border border-gray-400 p-4 shadow-lg duration-200",
          className
        )}
        {...props}
      />
    </ReactAlertDialog.Portal>
  );
}
