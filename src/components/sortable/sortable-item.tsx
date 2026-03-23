import * as React from "react";

import { Slot } from "radix-ui";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
    id: value,
    disabled: disabled || isOverlay,
    animateLayoutChanges
  });

  if (isOverlay) {
    const Comp = asChild ? Slot.Root : "div";

    return (
      <SortableItemContext.Provider value={{ listeners: undefined, isDragging: true, disabled: false }}>
        <Comp data-slot="sortable-item" data-value={value} data-dragging={true} className={cn(className)} {...props}>
          {children}
        </Comp>
      </SortableItemContext.Provider>
    );
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  } as React.CSSProperties;

  const Comp = asChild ? Slot.Root : "div";

  return (
    <SortableItemContext.Provider value={{ listeners, isDragging: isSortableDragging, disabled }}>
      <Comp
        data-slot="sortable-item"
        data-value={value}
        data-dragging={isSortableDragging}
        data-disabled={disabled}
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
