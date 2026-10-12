import { Tooltip as TooltipPrimitive } from "radix-ui";
import * as React from "react";

import { TooltipProvider } from "./tooltip-provider";

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

export function Tooltip(props: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}
