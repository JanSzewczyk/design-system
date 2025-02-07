import * as React from "react";

import * as ReactSheet from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

import { SheetOverlay } from "./overlay";
import { SheetPortal } from "./portal";
import { sheetContentStyles } from "./sheet-content.styles";
import { SheetContentSide } from "~/components";

import { Cross1Icon } from "../../../icons";

export type SheetContentProps = React.ComponentProps<typeof ReactSheet.Content> & {
  side?: SheetContentSide;
};

export function SheetContent({ side = "right", className, children, ...props }: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <ReactSheet.Content className={twMerge(sheetContentStyles({ side }), className)} {...props}>
        {children}
        <ReactSheet.Close className="focus:ring-ring ring-primary-500 ring-offset-foreground data-[state=open]:bg-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <Cross1Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </ReactSheet.Close>
      </ReactSheet.Content>
    </SheetPortal>
  );
}
