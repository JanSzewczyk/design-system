import { XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

import { sheetContentStyles } from "./sheet-content.styles";
import { type SheetContentSide } from "./sheet-content.types";

export type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: SheetContentSide;
  showCloseButton?: boolean;
};

export function SheetContent({
  side = "right",
  showCloseButton = true,
  className,
  children,
  ...props
}: SheetContentProps) {
  return (
    <SheetPrimitive.Portal data-slot="sheet-portal">
      <SheetPrimitive.Overlay
        className="[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/10 duration-100 data-[state=closed]:animate-out data-[state=open]:animate-in supports-backdrop-filter:backdrop-blur-xs"
        data-slot="sheet-overlay"
      />
      <SheetPrimitive.Content
        className={cn(sheetContentStyles({ side }), className)}
        data-side={side}
        data-slot="sheet-content"
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            className="absolute top-3 right-3 rounded opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none"
            data-slot="sheet-close"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}
