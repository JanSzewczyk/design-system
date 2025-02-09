import * as React from "react";

import { Dialog as ReactSheet } from "radix-ui";
import { twMerge } from "tailwind-merge";

import { type SheetContentSide } from "~/components";
import { Cross1Icon } from "~/icons";

import { sheetContentStyles } from "./sheet-content.styles";

export type SheetContentProps = React.ComponentProps<typeof ReactSheet.Content> & {
  side?: SheetContentSide;
};

export function SheetContent({ side = "right", className, children, ...props }: SheetContentProps) {
  return (
    <ReactSheet.Portal>
      <ReactSheet.Overlay
        className="bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm"
        {...props}
      />
      <ReactSheet.Content className={twMerge(sheetContentStyles({ side }), className)} {...props}>
        {children}
        <ReactSheet.Close className="focus:ring-ring ring-primary-500 ring-offset-foreground data-[state=open]:bg-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <Cross1Icon className="size-4" />
          <span className="sr-only">Close</span>
        </ReactSheet.Close>
      </ReactSheet.Content>
    </ReactSheet.Portal>
  );
}
