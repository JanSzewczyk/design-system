import * as React from "react";

import * as ReactSheet from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

import { SheetOverlay } from "./overlay";
import { SheetPortal } from "./portal";
import { sheetContentStyles } from "./sheet-content.styles";
import { SheetContentSide } from "./sheet-content.types";

import { Cross1Icon } from "../../../icons";

export type SheetContentProps = React.ComponentPropsWithoutRef<typeof ReactSheet.Content> & {
  side?: SheetContentSide;
};

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof ReactSheet.Content>,
  SheetContentProps
>(function ({ side = "right", className, children, ...props }, ref) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <ReactSheet.Content
        ref={ref}
        className={twMerge(sheetContentStyles({ side }), className)}
        {...props}
      >
        {children}
        <ReactSheet.Close className="focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 ring-primary-500 ring-offset-app-primary transition-opacity data-[state=open]:bg-app-primary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
          <Cross1Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </ReactSheet.Close>
      </ReactSheet.Content>
    </SheetPortal>
  );
});
