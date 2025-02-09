import * as React from "react";

import { Tooltip as ReactTooltip } from "radix-ui";

export type TooltipProviderProps = {
  children: React.ReactNode;
};

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <ReactTooltip.Provider skipDelayDuration={500}>{children}</ReactTooltip.Provider>;
}
