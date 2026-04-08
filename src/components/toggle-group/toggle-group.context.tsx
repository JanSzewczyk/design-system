import * as React from "react";

import { type ToggleSize, type ToggleVariant } from "~/components";

import { type ToggleGroupOrientationType } from "./toggle-group.types";

export type ToggleGroupContextValue = {
  variant: ToggleVariant;
  size: ToggleSize;
  spacing: number;
  orientation: ToggleGroupOrientationType;
};

export const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
