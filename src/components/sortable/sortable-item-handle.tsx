import * as React from "react";

import { Slot } from "radix-ui";

import { cn } from "~/utils";

import { SORTABLE_ITEM_HANDLE_NAME } from "./sortable.constants";
import { useSortableItemContext } from "./sortable.context";

export type SortableItemHandleProps = React.ComponentProps<"div"> & {
  cursor?: boolean;
  asChild?: boolean;
};

export function SortableItemHandle({
  className,
  asChild = false,
  cursor = true,
  children,
  ...props
}: SortableItemHandleProps) {
  const { listeners, isDragging, disabled } = useSortableItemContext(SORTABLE_ITEM_HANDLE_NAME);

  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="sortable-item-handle"
      data-dragging={isDragging}
      data-disabled={disabled}
      {...listeners}
      className={cn(cursor && (isDragging ? "cursor-grabbing!" : "cursor-grab!"), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
