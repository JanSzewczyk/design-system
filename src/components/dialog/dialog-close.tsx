import * as React from "react";

import { Dialog as DialogPrimitive } from "radix-ui";

export type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;

export function DialogClose(props: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
