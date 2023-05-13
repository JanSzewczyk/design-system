import * as React from "react";

import * as ReactTooltip from "@radix-ui/react-tooltip";

export type TooltipProviderProps = {
  children: React.ReactNode;
};

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <ReactTooltip.Provider skipDelayDuration={500}>{children}</ReactTooltip.Provider>;
}
