import * as React from "react";

import { Dialog as DialogPrimitive } from "radix-ui";

export type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>;

export function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
