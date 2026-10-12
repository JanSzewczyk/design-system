import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

export function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
