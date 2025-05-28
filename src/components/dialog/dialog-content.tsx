import * as React from "react";

import { Dialog as ReactDialog } from "radix-ui";
import { twMerge } from "tailwind-merge";

import { Cross1Icon } from "@radix-ui/react-icons";
import { type DialogContentWidth } from "~/components";

import { dialogContentStyles } from "./dialog-content.styles";

export type DialogContentProps = React.ComponentProps<typeof ReactDialog.Content> & {
  width?: DialogContentWidth;
};

export function DialogContent({ className, children, width = "md", ...props }: DialogContentProps) {
  return (
    <ReactDialog.Portal>
      <ReactDialog.Overlay
        className="bg-app-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-xs"
        {...props}
      />
      <ReactDialog.Content aria-modal="true" className={twMerge(dialogContentStyles({ width }), className)} {...props}>
        {children}
        <ReactDialog.Close className="focus:ring-ring ring-primary-500 ring-offset-app-foreground data-[state=open]:bg-app-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <Cross1Icon className="size-4" />
          <span className="sr-only">Close dialog</span>
        </ReactDialog.Close>
      </ReactDialog.Content>
    </ReactDialog.Portal>
  );
}
