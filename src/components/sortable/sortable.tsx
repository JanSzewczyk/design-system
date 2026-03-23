import * as React from "react";

import { Slot } from "radix-ui";
import { createPortal } from "react-dom";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type Modifiers,
  type UniqueIdentifier
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { cn } from "~/utils";

import { dropAnimationConfig } from "./sortable.constants";
import { IsOverlayContext, SortableInternalContext } from "./sortable.context";

export type SortableProps<T> = Omit<React.ComponentProps<"div">, "onDragStart" | "onDragEnd"> & {
  value: T[];
  onValueChange: (value: T[]) => void;
  getItemValue: (item: T) => string;
  children: React.ReactNode;
  onMove?: (event: { event: DragEndEvent; activeIndex: number; overIndex: number }) => void;
  strategy?: "horizontal" | "vertical" | "grid";
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  modifiers?: Modifiers;
  asChild?: boolean;
};

export function Sortable<T>({
  value,
  onValueChange,
  getItemValue,
  className,
  asChild = false,
  onMove,
  strategy = "vertical",
  onDragStart,
  onDragEnd,
  modifiers,
  children,
  ...props
}: SortableProps<T>) {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => setMounted(true), []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = React.useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id);
      onDragStart?.(event);
    },
    [onDragStart]
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      onDragEnd?.(event);

      if (!over) return;

      const activeIndex = value.findIndex((item: T) => getItemValue(item) === active.id);
      const overIndex = value.findIndex((item: T) => getItemValue(item) === over.id);

      if (activeIndex !== overIndex) {
        if (onMove) {
          onMove({ event, activeIndex, overIndex });
        } else {
          const newValue = arrayMove(value, activeIndex, overIndex);
          onValueChange(newValue);
        }
      }
    },
    [value, getItemValue, onValueChange, onMove, onDragEnd]
  );

  const handleDragCancel = React.useCallback(() => {
    setActiveId(null);
  }, []);

  const getStrategy = () => {
    switch (strategy) {
      case "horizontal":
        return rectSortingStrategy;
      case "grid":
        return rectSortingStrategy;
      case "vertical":
      default:
        return verticalListSortingStrategy;
    }
  };

  const itemIds = React.useMemo(() => value.map(getItemValue), [value, getItemValue]);

  const contextValue = React.useMemo(() => ({ activeId, modifiers }), [activeId, modifiers]);

  const overlayContent = React.useMemo(() => {
    if (!activeId) return null;
    let result: React.ReactNode = null;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement<{ value?: string; className?: string }>(child) && child.props.value === activeId) {
        result = React.cloneElement(child, {
          ...child.props,
          className: cn(child.props.className, "z-50")
        });
      }
    });
    return result;
  }, [activeId, children]);

  const Comp = asChild ? Slot.Root : "div";

  return (
    <SortableInternalContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        modifiers={modifiers}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always
          }
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={itemIds} strategy={getStrategy()}>
          <Comp
            data-slot="sortable"
            data-dragging={activeId !== null}
            className={cn(activeId !== null && "cursor-grabbing!", className)}
            {...props}
          >
            {children}
          </Comp>
        </SortableContext>
        {mounted &&
          createPortal(
            <DragOverlay
              dropAnimation={dropAnimationConfig}
              modifiers={modifiers}
              className={cn("z-50", activeId && "cursor-grabbing")}
            >
              <IsOverlayContext.Provider value={true}>{overlayContent}</IsOverlayContext.Provider>
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </SortableInternalContext.Provider>
  );
}
