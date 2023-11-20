import * as React from "react";

import * as ReactDialog from "@radix-ui/react-dialog";

export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof ReactDialog.Overlay>;

export const DialogOverlay = React.forwardRef<React.ElementRef<typeof ReactDialog.Overlay>, DialogOverlayProps>(
  function (props, ref) {
    return (
      <ReactDialog.Overlay
        {...props}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        ref={ref}
      />
    );
  }
);
