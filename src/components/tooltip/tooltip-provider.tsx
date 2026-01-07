import * as React from "react";

import { Tooltip as TooltipPrimitive } from "radix-ui";

export type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>;

export function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}
