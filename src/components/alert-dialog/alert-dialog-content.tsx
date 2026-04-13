import * as React from "react";

import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { cn } from "~/utils";

import { alertDialogContentVariants } from "./alert-dialog-content.styles";
import { type AlertDialogContentSize } from "./alert-dialog-content.types";
import { AlertDialogOverlay } from "./alert-dialog-overlay";
import { AlertDialogPortal } from "./alert-dialog-portal";

export type AlertDialogContentProps = React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: AlertDialogContentSize;
};

export function AlertDialogContent({ className, size = "default", ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(alertDialogContentVariants({ size }), className)}
        {...props}
      />
    </AlertDialogPortal>
  );
}
