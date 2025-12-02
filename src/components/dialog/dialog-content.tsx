import * as React from "react";

import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { twMerge } from "tailwind-merge";

import { type DialogContentWidth } from "~/components";

import { dialogContentVariants } from "./dialog-content.styles";

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
        data-slot="dialog-overlay"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-background/80 fixed inset-0 z-50 backdrop-blur-xs"
      />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={twMerge(dialogContentVariants({ width }), className)}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
