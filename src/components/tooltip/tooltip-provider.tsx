import * as React from "react";

import { Tooltip as ReactTooltip } from "radix-ui";

export type TooltipProviderProps = React.ComponentProps<typeof ReactTooltip.Provider>;

export function TooltipProvider({ children, skipDelayDuration = 500, ...props }: TooltipProviderProps) {
  return (
    <ReactTooltip.Provider skipDelayDuration={skipDelayDuration} {...props}>
      {children}
    </ReactTooltip.Provider>
  );
}
