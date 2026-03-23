import * as React from "react";

import { type DraggableSyntheticListeners, type Modifiers, type UniqueIdentifier } from "@dnd-kit/core";

import { SORTABLE_ITEM_NAME, SORTABLE_ROOT_NAME } from "./sortable.constants";

export interface SortableItemContextValue {
  listeners: DraggableSyntheticListeners | undefined;
  isDragging?: boolean;
  disabled?: boolean;
}

export const SortableItemContext = React.createContext<SortableItemContextValue | null>(null);

export function useSortableItemContext(consumerName: string) {
  const context = React.useContext(SortableItemContext);

  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${SORTABLE_ITEM_NAME}\``);
  }

  return context;
}

export const IsOverlayContext = React.createContext(false);

export interface SortableInternalContextValue {
  activeId: UniqueIdentifier | null;
  modifiers?: Modifiers;
}

export const SortableInternalContext = React.createContext<SortableInternalContextValue | null>(null);

export function useSortableInternalContext(consumerName: string) {
  const context = React.useContext(SortableInternalContext);

  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${SORTABLE_ROOT_NAME}\``);
  }

  return context;
}
