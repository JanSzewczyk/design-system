import * as React from "react";

import { createPortal } from "react-dom";

import { DragOverlay, type UniqueIdentifier } from "@dnd-kit/core";
import { cn } from "~/utils";

import { dropAnimationConfig, SORTABLE_OVERLAY_NAME } from "./sortable.constants";
import { IsOverlayContext, useSortableInternalContext } from "./sortable.context";

export type SortableOverlayProps = Omit<React.ComponentProps<typeof DragOverlay>, "children"> & {
  children?: React.ReactNode | ((params: { value: UniqueIdentifier }) => React.ReactNode);
};

export function SortableOverlay({ children, className, ...props }: SortableOverlayProps) {
  const { activeId, modifiers } = useSortableInternalContext(SORTABLE_OVERLAY_NAME);
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => setMounted(true), []);

  const content =
    activeId && children ? (typeof children === "function" ? children({ value: activeId }) : children) : null;

  if (!mounted) return null;

  return createPortal(
    <DragOverlay
      dropAnimation={dropAnimationConfig}
      modifiers={modifiers}
      className={cn("z-50", activeId && "cursor-grabbing", className)}
      {...props}
    >
      <IsOverlayContext.Provider value={true}>{content}</IsOverlayContext.Provider>
    </DragOverlay>,
    document.body
  );
}
