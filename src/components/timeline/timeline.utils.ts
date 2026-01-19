import type * as React from "react";

import { type TimelineItemElement, type TimelineStatus } from "~/components";

export function getItemStatus(itemIndex: number, activeIndex?: number): TimelineStatus {
  if (activeIndex === undefined) return "pending";
  if (itemIndex < activeIndex) return "completed";
  if (itemIndex === activeIndex) return "active";
  return "pending";
}

export function getSortedEntries(entries: [string, React.RefObject<TimelineItemElement | null>][]) {
  return entries.sort((a, b) => {
    const elementA = a[1].current;
    const elementB = b[1].current;
    if (!elementA || !elementB) return 0;
    const position = elementA.compareDocumentPosition(elementB);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });
}
