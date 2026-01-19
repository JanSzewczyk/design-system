import * as React from "react";

import { type TimelineDirection, type TimelineOrientation, type TimelineVariant } from "~/components";

import { TIMELINE_ROOT_NAME } from "./timeline.constants";

export type TimelineContextValue = {
  dir: TimelineDirection;
  orientation: TimelineOrientation;
  variant: TimelineVariant;
  activeIndex?: number;
};

export const TimelineContext = React.createContext<TimelineContextValue | null>(null);

export function useTimelineContext(consumerName: string) {
  const context = React.useContext(TimelineContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${TIMELINE_ROOT_NAME}\``);
  }
  return context;
}
