import * as React from "react";

import { Dialog as ReactDialog } from "radix-ui";

export type DialogOverlayProps = React.ComponentProps<typeof ReactDialog.Overlay>;

export function DialogOverlay(props: DialogOverlayProps) {
  return (
    <ReactDialog.Overlay
      className="bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-xs"
      {...props}
    />
  );
}
