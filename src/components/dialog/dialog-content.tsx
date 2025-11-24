import * as React from "react";

import { clsx } from "clsx";
import { X } from "lucide-react";
import { Dialog as ReactDialog } from "radix-ui";
import { twMerge } from "tailwind-merge";

import { type DialogContentWidth } from "~/components";

import { dialogContentStyles } from "./dialog-content.styles";

export type DialogContentProps = React.ComponentProps<typeof ReactDialog.Content> & {
  width?: DialogContentWidth;
};

export function DialogContent({ className, children, width = "md", ...props }: DialogContentProps) {
  return (
    <ReactDialog.Portal>
      <ReactDialog.Overlay
        className="bg-app-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-xs fixed inset-0 z-50"
        {...props}
      />
      <ReactDialog.Content aria-modal="true" className={twMerge(dialogContentStyles({ width }), className)} {...props}>
        {children}
        <ReactDialog.Close
          className={clsx([
            "data-[state=open]:bg-app-foreground absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none",
            "focus-visible:ring-primary-500/40 ring-offset-app-foreground focus-visible:ring-2 focus-visible:ring-offset-2"
          ])}
        >
          <X className="size-4" />
          <span className="sr-only">Close dialog</span>
        </ReactDialog.Close>
      </ReactDialog.Content>
    </ReactDialog.Portal>
  );
}
