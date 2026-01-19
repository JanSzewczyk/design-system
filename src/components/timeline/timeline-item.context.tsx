import * as React from "react";

import { type TimelineStatus } from "~/components";

import { TIMELINE_ITEM_NAME } from "./timeline.constants";

export type TimelineItemContextValue = {
  id: string;
  status: TimelineStatus;
  isAlternateRight: boolean;
};

export const TimelineItemContext = React.createContext<TimelineItemContextValue | null>(null);

export function useTimelineItemContext(consumerName: string) {
  const context = React.useContext(TimelineItemContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${TIMELINE_ITEM_NAME}\``);
  }
  return context;
}
