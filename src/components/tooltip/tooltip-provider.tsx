import * as React from "react";

import { Tooltip as TooltipPrimitive } from "radix-ui";

export type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>;

/**
 * Renders a configured TooltipPrimitive.Provider for the application.
 *
 * @param delayDuration - Time in milliseconds to delay tooltip display; defaults to 0
 * @param props - Any additional props accepted by TooltipPrimitive.Provider (including children)
 * @returns A React element that provides tooltip context configured with the given props
 */
export function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}