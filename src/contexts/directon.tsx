import * as React from "react";

export const Direction = {
  LTR: "ltr",
  RTL: "rtl"
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

export const DirectionContext = React.createContext<Direction | undefined>(undefined);

export function useDirection(dirProp?: Direction): Direction {
  const contextDir = React.useContext(DirectionContext);

  return dirProp ?? contextDir ?? Direction.LTR;
}
