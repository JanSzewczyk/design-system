import * as React from "react";

import * as ReactDialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

import { dialogContentStyles } from "./dialog-content.styles";
import { DialogContentWidth } from "./dialog-content.types";
import { DialogOverlay } from "./overlay";
import { DialogPortal } from "./portal";

import { Cross1Icon } from "../../../icons";

export type DialogContentProps = React.ComponentPropsWithoutRef<typeof ReactDialog.Content> & {
  width?: DialogContentWidth;
};

export const DialogContent = React.forwardRef<React.ElementRef<typeof ReactDialog.Content>, DialogContentProps>(
  function ({ className, children, width = "md", ...props }, ref) {
    return (
      <DialogPortal>
        <DialogOverlay />
        <ReactDialog.Content ref={ref} className={twMerge(dialogContentStyles({ width }), className)} {...props}>
          {children}
          <ReactDialog.Close className="focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 ring-primary-500 ring-offset-foreground transition-opacity data-[state=open]:bg-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <Cross1Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </ReactDialog.Close>
        </ReactDialog.Content>
      </DialogPortal>
    );
  }
);
