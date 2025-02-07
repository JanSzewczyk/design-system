import * as React from "react";

import * as ReactDialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

import { dialogContentStyles } from "./dialog-content.styles";
import { DialogContentWidth } from "~/components";
import { DialogOverlay } from "./overlay";

import { Cross1Icon } from "../../../icons";

export type DialogContentProps = React.ComponentProps<typeof ReactDialog.Content> & {
  width?: DialogContentWidth;
};

export function DialogContent({ className, children, width = "md", ...props }: DialogContentProps) {
  return (
    <ReactDialog.Portal>
      <DialogOverlay />
      <ReactDialog.Content className={twMerge(dialogContentStyles({ width }), className)} {...props}>
        {children}
        <ReactDialog.Close className="focus:ring-ring ring-primary-500 ring-offset-foreground data-[state=open]:bg-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <Cross1Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </ReactDialog.Close>
      </ReactDialog.Content>
    </ReactDialog.Portal>
  );
}
