import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import { dialogContentVariants } from "./dialog-content.styles";
import { type DialogContentWidth } from "./dialog-content.types";

export type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  width?: DialogContentWidth;
  showCloseButton?: boolean;
};

export function DialogContent({
  className,
  children,
  width = "md",
  showCloseButton = false,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal data-slot="dialog-portal">
      <DialogPrimitive.Overlay
        className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/80 backdrop-blur-xs data-[state=closed]:animate-out data-[state=open]:animate-in"
        data-slot="dialog-overlay"
      />
      <DialogPrimitive.Content
        className={twMerge(dialogContentVariants({ width }), className)}
        data-slot="dialog-content"
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
            data-slot="dialog-close"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
