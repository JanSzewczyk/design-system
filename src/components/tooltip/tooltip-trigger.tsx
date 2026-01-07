import * as React from "react";

import { Tooltip as TooltipPrimitive } from "radix-ui";

export type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>;

/**
 * Renders a TooltipPrimitive.Trigger element configured for the tooltip system.
 *
 * @param props - Props to pass through to the underlying Trigger element; all props are forwarded.
 * @returns A `TooltipPrimitive.Trigger` React element with `data-slot="tooltip-trigger"` and the provided props applied.
 */
export function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}