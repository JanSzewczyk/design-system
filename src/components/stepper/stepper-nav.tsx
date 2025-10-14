import * as React from "react";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

import { StepperFocusContext, type StepperFocusContextValue, type StepperItemData } from "./stepper-focus.context";
import { STEPPER_ENTRY_FOCUS, STEPPER_EVENT_OPTIONS, STEPPER_NAV_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { useStepperStore } from "./stepper.store";
import { focusFirst } from "./stepper.utils";

export type StepperNavProps = React.ComponentProps<"nav"> & {
  asChild?: boolean;
};

type StepperNavElement = React.ComponentRef<typeof StepperNav>;

export function StepperNav({ className, children, asChild, ref, ...listProps }: StepperNavProps) {
  const context = useStepperContext(STEPPER_NAV_NAME);
  const orientation = context.orientation;
  const currentValue = useStepperStore((state) => state.value);

  const [tabStopId, setTabStopId] = React.useState<string | null>(null);
  const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);
  const [focusableItemCount, setFocusableItemCount] = React.useState(0);

  const isClickFocusRef = React.useRef(false);
  const itemsRef = React.useRef<Map<string, StepperItemData>>(new Map());
  const listRef = React.useRef<HTMLElement>(null);
  const composedRef = useComposedRefs(ref, listRef);

  const onItemFocus = React.useCallback((tabStopId: string) => {
    setTabStopId(tabStopId);
  }, []);

  const onItemShiftTab = React.useCallback(() => {
    setIsTabbingBackOut(true);
  }, []);

  const onFocusableItemAdd = React.useCallback(() => {
    setFocusableItemCount((prevCount) => prevCount + 1);
  }, []);

  const onFocusableItemRemove = React.useCallback(() => {
    setFocusableItemCount((prevCount) => prevCount - 1);
  }, []);

  const onItemRegister = React.useCallback((item: StepperItemData) => {
    itemsRef.current.set(item.id, item);
  }, []);

  const onItemUnregister = React.useCallback((id: string) => {
    itemsRef.current.delete(id);
  }, []);

  const getItems = React.useCallback(() => {
    return Array.from(itemsRef.current.values())
      .filter((item) => item.ref.current)
      .sort((a, b) => {
        const elementA = a.ref.current;
        const elementB = b.ref.current;
        if (!elementA || !elementB) return 0;
        const position = elementA.compareDocumentPosition(elementB);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1;
        }
        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
          return 1;
        }
        return 0;
      });
  }, []);

  const onBlur = React.useCallback(
    (event: React.FocusEvent<StepperNavElement>) => {
      listProps.onBlur?.(event);
      if (event.defaultPrevented) return;

      setIsTabbingBackOut(false);
    },
    [listProps.onBlur]
  );

  const onFocus = React.useCallback(
    (event: React.FocusEvent<StepperNavElement>) => {
      listProps.onFocus?.(event);
      if (event.defaultPrevented) return;

      const isKeyboardFocus = !isClickFocusRef.current;
      if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
        const entryFocusEvent = new CustomEvent(STEPPER_ENTRY_FOCUS, STEPPER_EVENT_OPTIONS);
        event.currentTarget.dispatchEvent(entryFocusEvent);

        if (!entryFocusEvent.defaultPrevented) {
          const items = Array.from(itemsRef.current.values()).filter((item) => !item.disabled);
          const selectedItem = currentValue ? items.find((item) => item.value === currentValue) : undefined;
          const activeItem = items.find((item) => item.active);
          const currentItem = items.find((item) => item.id === tabStopId);

          const candidateItems = [selectedItem, activeItem, currentItem, ...items].filter(
            Boolean
          ) as Array<StepperItemData>;
          const candidateRefs = candidateItems.map((item) => item.ref);
          focusFirst(candidateRefs, false);
        }
      }
      isClickFocusRef.current = false;
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listProps.onFocus, isTabbingBackOut, currentValue, tabStopId]
  );

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent<StepperNavElement>) => {
      listProps.onMouseDown?.(event);

      if (event.defaultPrevented) return;

      isClickFocusRef.current = true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listProps.onMouseDown]
  );

  const focusContextValue = React.useMemo<StepperFocusContextValue>(
    () => ({
      tabStopId,
      onItemFocus,
      onItemShiftTab,
      onFocusableItemAdd,
      onFocusableItemRemove,
      onItemRegister,
      onItemUnregister,
      getItems
    }),
    [
      tabStopId,
      onItemFocus,
      onItemShiftTab,
      onFocusableItemAdd,
      onFocusableItemRemove,
      onItemRegister,
      onItemUnregister,
      getItems
    ]
  );

  const StepperNavPrimitive = asChild ? Slot : "nav";

  // TODO add data-state={state}
  return (
    <StepperFocusContext.Provider value={focusContextValue}>
      <StepperNavPrimitive
        role="tablist"
        data-slot="stepper-nav"
        aria-orientation={orientation}
        data-orientation={orientation}
        dir={context.dir}
        tabIndex={isTabbingBackOut || focusableItemCount === 0 ? -1 : 0}
        ref={composedRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
        className={cn(
          "group/stepper-nav inline-flex gap-4",
          "data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          className
        )}
        {...listProps}
      >
        {children}
      </StepperNavPrimitive>
    </StepperFocusContext.Provider>
  );
}
