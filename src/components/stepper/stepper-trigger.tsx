import * as React from "react";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Slot } from "@radix-ui/react-slot";
import { useIsomorphicLayoutEffect } from "~/hooks";
import { cn } from "~/utils";

import { useStepperFocusContext } from "./stepper-focus.context";
import { useStepperItemContext } from "./stepper-item.context";
import { STEPPER_ARROW_KEYS, STEPPER_TRIGGER_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { useStepperStore, useStepperStoreContext } from "./stepper.store";
import { type StepperNavigationDirection } from "./stepper.types";
import { focusFirst, getDataState, getFocusIntent, getId, wrapArray } from "./stepper.utils";

export type StepperTriggerElement = React.ComponentRef<typeof StepperTrigger>;

export type StepperTriggerProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

export function StepperTrigger({ asChild, disabled, className, ref, ...triggerProps }: StepperTriggerProps) {
  const context = useStepperContext(STEPPER_TRIGGER_NAME);
  const itemContext = useStepperItemContext(STEPPER_TRIGGER_NAME);
  const store = useStepperStoreContext(STEPPER_TRIGGER_NAME);
  const focusContext = useStepperFocusContext(STEPPER_TRIGGER_NAME);
  const value = useStepperStore((state) => state.value);
  const itemValue = itemContext.value;
  const stepState = useStepperStore((state) => state.steps.get(itemValue));
  const activationMode = context.activationMode;
  const orientation = context.orientation;
  const loop = context.loop;

  const steps = useStepperStore((state) => state.steps);
  const stepIndex = Array.from(steps.keys()).indexOf(itemValue);

  const stepPosition = stepIndex + 1;
  const stepCount = steps.size;

  const triggerId = getId(context.id, "trigger", itemValue);
  const contentId = getId(context.id, "content", itemValue);
  const titleId = getId(context.id, "title", itemValue);
  const descriptionId = getId(context.id, "description", itemValue);

  const isDisabled = context.disabled || stepState?.disabled || disabled;
  const isActive = value === itemValue;
  const isTabStop = focusContext.tabStopId === triggerId;
  const dataState = getDataState(value, itemValue, stepState, steps);

  const triggerRef = React.useRef<StepperTriggerElement>(null);
  const composedRef = useComposedRefs(ref, triggerRef);
  const isArrowKeyPressedRef = React.useRef(false);
  const isMouseClickRef = React.useRef(false);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (STEPPER_ARROW_KEYS.includes(event.key)) {
        isArrowKeyPressedRef.current = true;
      }
    }
    function onKeyUp() {
      isArrowKeyPressedRef.current = false;
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    focusContext.onItemRegister({
      id: triggerId,
      ref: triggerRef,
      value: itemValue,
      active: isTabStop,
      disabled: !!isDisabled
    });

    if (!isDisabled) {
      focusContext.onFocusableItemAdd();
    }

    return () => {
      focusContext.onItemUnregister(triggerId);
      if (!isDisabled) {
        focusContext.onFocusableItemRemove();
      }
    };
  }, [focusContext, triggerId, itemValue, isTabStop, isDisabled]);

  const onClick = React.useCallback(
    async (event: React.MouseEvent<StepperTriggerElement>) => {
      triggerProps.onClick?.(event);
      if (event.defaultPrevented) return;

      if (!isDisabled && !context.nonInteractive) {
        const currentStepIndex = Array.from(steps.keys()).indexOf(value ?? "");
        const targetStepIndex = Array.from(steps.keys()).indexOf(itemValue);
        const direction = targetStepIndex > currentStepIndex ? "next" : "prev";

        await store.setStateWithValidation(itemValue, direction);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDisabled, context.nonInteractive, store, itemValue, value, steps, triggerProps.onClick]
  );

  const onFocus = React.useCallback(
    async (event: React.FocusEvent<StepperTriggerElement>) => {
      triggerProps.onFocus?.(event);
      if (event.defaultPrevented) return;

      focusContext.onItemFocus(triggerId);

      const isKeyboardFocus = !isMouseClickRef.current;

      if (!isActive && !isDisabled && activationMode !== "manual" && !context.nonInteractive && isKeyboardFocus) {
        const currentStepIndex = Array.from(steps.keys()).indexOf(value || "");
        const targetStepIndex = Array.from(steps.keys()).indexOf(itemValue);
        const direction = targetStepIndex > currentStepIndex ? "next" : "prev";

        await store.setStateWithValidation(itemValue, direction);
      }

      isMouseClickRef.current = false;
    },
    [
      focusContext,
      triggerId,
      activationMode,
      isActive,
      isDisabled,
      context.nonInteractive,
      store,
      itemValue,
      value,
      steps,
      triggerProps.onFocus
    ]
  );

  const onKeyDown = React.useCallback(
    async (event: React.KeyboardEvent<StepperTriggerElement>) => {
      triggerProps.onKeyDown?.(event);
      if (event.defaultPrevented) return;

      if (event.key === "Enter" && context.nonInteractive) {
        event.preventDefault();
        return;
      }

      if ((event.key === "Enter" || event.key === " ") && activationMode === "manual" && !context.nonInteractive) {
        event.preventDefault();
        if (!isDisabled && triggerRef.current) {
          triggerRef.current.click();
        }
        return;
      }

      if (event.key === "Tab" && event.shiftKey) {
        focusContext.onItemShiftTab();
        return;
      }

      if (event.target !== event.currentTarget) return;

      const focusIntent = getFocusIntent(event, context.dir, orientation);

      if (focusIntent !== undefined) {
        if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
        event.preventDefault();

        const items = focusContext.getItems().filter((item) => !item.disabled);
        let candidateRefs = items.map((item) => item.ref);

        if (focusIntent === "last") {
          candidateRefs.reverse();
        } else if (focusIntent === "prev" || focusIntent === "next") {
          if (focusIntent === "prev") candidateRefs.reverse();
          const currentIndex = candidateRefs.findIndex((ref) => ref.current === event.currentTarget);
          candidateRefs = loop ? wrapArray(candidateRefs, currentIndex + 1) : candidateRefs.slice(currentIndex + 1);
        }

        if (store.hasValidation() && candidateRefs.length > 0) {
          const nextRef = candidateRefs[0];
          const nextElement = nextRef?.current;
          const nextItem = items.find((item) => item.ref.current === nextElement);

          if (nextItem && nextItem.value !== itemValue) {
            const currentStepIndex = Array.from(steps.keys()).indexOf(value || "");
            const targetStepIndex = Array.from(steps.keys()).indexOf(nextItem.value);
            const direction: StepperNavigationDirection = targetStepIndex > currentStepIndex ? "next" : "prev";

            if (direction === "next") {
              const isValid = await store.setStateWithValidation(nextItem.value, direction);
              if (!isValid) return;
            } else {
              store.setState("value", nextItem.value);
            }

            queueMicrotask(() => nextElement?.focus());
            return;
          }
        }

        queueMicrotask(() => focusFirst(candidateRefs));
      }
    },
    [
      focusContext,
      context.nonInteractive,
      context.dir,
      activationMode,
      orientation,
      loop,
      isDisabled,
      triggerProps.onKeyDown,
      store,
      itemValue,
      value,
      steps
    ]
  );

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent<StepperTriggerElement>) => {
      triggerProps.onMouseDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      isMouseClickRef.current = true;

      if (isDisabled) {
        event.preventDefault();
      } else {
        focusContext.onItemFocus(triggerId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focusContext, triggerId, isDisabled, triggerProps.onMouseDown]
  );

  const TriggerPrimitive = asChild ? Slot : "button";

  return (
    <TriggerPrimitive
      id={triggerId}
      role="tab"
      type="button"
      disabled={isDisabled}
      tabIndex={isTabStop ? 0 : -1}
      ref={composedRef}
      data-slot="stepper-trigger"
      data-disabled={isDisabled ? "" : undefined}
      data-state={dataState}
      aria-controls={contentId}
      aria-current={isActive ? "step" : undefined}
      aria-describedby={`${titleId} ${descriptionId}`}
      aria-posinset={stepPosition}
      aria-selected={isActive}
      aria-setsize={stepCount}
      // className={cn(
      //   "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex items-center justify-center gap-3 rounded-md text-left transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      //   "not-has-[[data-slot=description]]:rounded-full not-has-[[data-slot=title]]:rounded-full",
      //   className
      // )}
      className={cn(
        "inline-flex w-full cursor-pointer items-center gap-3 rounded text-left transition-colors duration-500 outline-none",
        "disabled:pointer-events-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      {...triggerProps}
    />
  );
}
