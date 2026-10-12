import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "~/utils";

import { animateLayoutChanges } from "./sortable.constants";
import { IsOverlayContext, SortableItemContext } from "./sortable.context";

export type SortableItemProps = React.ComponentProps<"div"> & {
  value: string;
  disabled?: boolean;
  asChild?: boolean;
};

export function SortableItem({ value, className, asChild = false, disabled, children, ...props }: SortableItemProps) {
  const isOverlay = React.useContext(IsOverlayContext);

  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging
  } = useSortable({
    animateLayoutChanges,
    disabled: disabled || isOverlay,
    id: value
  });

  if (isOverlay) {
    const Comp = asChild ? Slot.Root : "div";

    return (
      <SortableItemContext.Provider value={{ disabled: false, isDragging: true, listeners: undefined }}>
        <Comp className={cn(className)} data-dragging={true} data-slot="sortable-item" data-value={value} {...props}>
          {children}
        </Comp>
      </SortableItemContext.Provider>
    );
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  } as React.CSSProperties;

  const Comp = asChild ? Slot.Root : "div";

  return (
    <SortableItemContext.Provider value={{ disabled, isDragging: isSortableDragging, listeners }}>
      <Comp
        data-disabled={disabled}
        data-dragging={isSortableDragging}
        data-slot="sortable-item"
        data-value={value}
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn(isSortableDragging && "z-50 opacity-50", disabled && "opacity-50", className)}
        {...props}
      >
        {children}
      </Comp>
    </SortableItemContext.Provider>
  );
}
