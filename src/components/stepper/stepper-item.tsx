import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { StepperItemContext, type StepperItemContextValue } from "./stepper-item.context";
import { STEPPER_ITEM_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { useStepperStore, useStepperStoreContext } from "./stepper.store";
import { getDataState, useIsomorphicLayoutEffect } from "./stepper.utils";
import { cn } from "~/utils";

export type StepperItemProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  value: string;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

export function StepperItem({
  value: itemValue,
  completed = false,
  disabled = false,
  loading = false,
  asChild,
  className,
  children,
  ...props
}: StepperItemProps) {
  const { orientation, dir } = useStepperContext(STEPPER_ITEM_NAME);

  const store = useStepperStoreContext(STEPPER_ITEM_NAME);
  const value = useStepperStore((state) => state.value);

  useIsomorphicLayoutEffect(() => {
    store.addStep({ value: itemValue, completed, disabled, loading });

    return () => {
      store.removeStep(itemValue);
    };
  }, [itemValue, completed, disabled, loading]);

  useIsomorphicLayoutEffect(() => {
    store.setStep({ value: itemValue, completed, disabled, loading });
  }, [itemValue, completed, disabled, loading]);

  const stepState = useStepperStore((state) => state.steps.get(itemValue));
  const steps = useStepperStore((state) => state.steps);
  const dataState = getDataState(value, itemValue, stepState, steps);

  const itemContextValue = React.useMemo<StepperItemContextValue>(
    () => ({
      value: itemValue,
      stepState
    }),
    [itemValue, stepState]
  );

  const StepperItemPrimitive = asChild ? Slot : "div";

  return (
    <StepperItemContext.Provider value={itemContextValue}>
      <StepperItemPrimitive
        data-disabled={stepState?.disabled ? "" : undefined}
        data-orientation={orientation}
        data-state={dataState}
        data-slot="stepper-item"
        dir={dir}
        className={cn(
          "group/step flex flex-1 flex-col justify-end",
          "",
          // "group-data-[orientation=horizontal]/stepper-nav:flex-row group-data-[orientation=vertical]/stepper-nav:flex-col",
          className
        )}
        {...props}
      >
        {children}
        <div
          data-state={dataState}
          className={cn(
            "h-1 w-full bg-gray-800 transition-colors duration-500",
            "data-[state=active]:bg-primary-500 data-[state=completed]:bg-success-500"
          )}
        />
      </StepperItemPrimitive>
    </StepperItemContext.Provider>
  );
}
