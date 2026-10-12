import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";

export type PopoverTriggerProps = React.ComponentProps<typeof PopoverPrimitive.Trigger>;

export function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}
