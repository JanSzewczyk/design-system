import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";

export type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;

export function DialogClose(props: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
