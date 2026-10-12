import * as React from "react";

import { type ToggleSize, type ToggleVariant } from "~/components/toggle/toggle.types";

import { type ToggleGroupOrientationType } from "./toggle-group.types";

export type ToggleGroupContextValue = {
  variant: ToggleVariant;
  size: ToggleSize;
  spacing: number;
  orientation: ToggleGroupOrientationType;
};

export const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  orientation: "horizontal",
  size: "default",
  spacing: 0,
  variant: "default"
});
