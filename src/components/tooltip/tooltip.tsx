import * as React from "react";

import { Tooltip as TooltipPrimitive } from "radix-ui";

import { TooltipProvider } from "./tooltip-provider";

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

/**
 * Renders a Radix Tooltip.Root wrapped with the local TooltipProvider.
 *
 * @param props - Props passed through to the underlying Radix `Tooltip.Root`.
 * @returns The rendered tooltip element wrapped by `TooltipProvider`.
 */
export function Tooltip(props: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}