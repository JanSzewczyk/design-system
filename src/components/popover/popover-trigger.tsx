import * as React from "react";

import { Popover as PopoverPrimitive } from "radix-ui";

export type PopoverTriggerProps = React.ComponentProps<typeof PopoverPrimitive.Trigger>;

export function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}
