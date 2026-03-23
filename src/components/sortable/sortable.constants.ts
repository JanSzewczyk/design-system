import { defaultDropAnimationSideEffects, type DropAnimation } from "@dnd-kit/core";
import { defaultAnimateLayoutChanges, type AnimateLayoutChanges } from "@dnd-kit/sortable";

export const SORTABLE_ROOT_NAME = "Sortable";
export const SORTABLE_ITEM_NAME = "SortableItem";
export const SORTABLE_ITEM_HANDLE_NAME = "SortableItemHandle";
export const SORTABLE_OVERLAY_NAME = "SortableOverlay";

export const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};
