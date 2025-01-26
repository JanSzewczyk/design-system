import * as React from "react";

import * as ReactDialog from "@radix-ui/react-dialog";

export type DialogOverlayProps = React.ComponentProps<typeof ReactDialog.Overlay>;

export function DialogOverlay(props: DialogOverlayProps) {
  return (
    <ReactDialog.Overlay
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      {...props}
    />
  );
}
