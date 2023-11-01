import React from "react";

import * as ReactSheet from "@radix-ui/react-dialog";

export type SheetOverlayProps = React.ComponentPropsWithoutRef<typeof ReactSheet.Overlay>;

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof ReactSheet.Overlay>,
  SheetOverlayProps
>(function (props, ref) {
  return (
    <ReactSheet.Overlay
      {...props}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      ref={ref}
    />
  );
});
