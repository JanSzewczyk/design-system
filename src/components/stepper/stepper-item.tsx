import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { useIsomorphicLayoutEffect } from "~/hooks";
import { cn } from "~/utils";
import { STEPPER_ITEM_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { useStepperStore, useStepperStoreContext } from "./stepper.store";
import { getDataState } from "./stepper.utils";
import { StepperItemContext, type StepperItemContextValue } from "./stepper-item.context";

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
    store.addStep({ completed, disabled, loading, value: itemValue });

    return () => {
      store.removeStep(itemValue);
    };
  }, [itemValue, completed, disabled, loading]);

  useIsomorphicLayoutEffect(() => {
    store.setStep({ completed, disabled, loading, value: itemValue });
  }, [itemValue, completed, disabled, loading]);

  const stepState = useStepperStore((state) => state.steps.get(itemValue));
  const steps = useStepperStore((state) => state.steps);
  const dataState = getDataState(value, itemValue, stepState, steps);

  const itemContextValue = React.useMemo<StepperItemContextValue>(
    () => ({
      stepState,
      value: itemValue
    }),
    [itemValue, stepState]
  );

  const StepperItemPrimitive = asChild ? Slot : "div";

  return (
    <StepperItemContext.Provider value={itemContextValue}>
      <StepperItemPrimitive
        className={cn(
          "group/step flex flex-1 flex-col justify-end data-[disabled]:opacity-50",
          "",
          // "group-data-[orientation=horizontal]/stepper-nav:flex-row group-data-[orientation=vertical]/stepper-nav:flex-col",
          className
        )}
        data-disabled={stepState?.disabled ? "" : undefined}
        data-orientation={orientation}
        data-slot="stepper-item"
        data-state={dataState}
        dir={dir}
        {...props}
      >
        {children}
        <div
          className={cn(
            "h-1 w-full bg-border transition-colors duration-500",
            "data-[state=active]:bg-primary data-[state=completed]:bg-success"
          )}
          data-state={dataState}
        />
      </StepperItemPrimitive>
    </StepperItemContext.Provider>
  );
}
