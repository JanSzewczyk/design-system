import { Tooltip as TooltipPrimitive } from "radix-ui";
import * as React from "react";

export type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>;

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}
