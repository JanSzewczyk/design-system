import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

import { useStepperItemContext } from "./stepper-item.context";
import { STEPPER_INDICATOR_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { useStepperStore } from "./stepper.store";
import { type StepperDataState } from "./stepper.types";
import { getDataState } from "./stepper.utils";

export type StepperIndicatorProps = Omit<React.ComponentProps<"div">, "children"> & {
  asChild?: boolean;
  children?: React.ReactNode | ((dataState: StepperDataState) => React.ReactNode);
};

export function StepperIndicator({ className, children, asChild, ref, ...props }: StepperIndicatorProps) {
  const { indicators, dir } = useStepperContext(STEPPER_INDICATOR_NAME);
  const itemContext = useStepperItemContext(STEPPER_INDICATOR_NAME);
  const value = useStepperStore((state) => state.value);
  const itemValue = itemContext.value;
  const stepState = useStepperStore((state) => state.steps.get(itemValue));
  const steps = useStepperStore((state) => state.steps);

  const stepPosition = Array.from(steps.keys()).indexOf(itemValue) + 1;

  const dataState = getDataState(value, itemValue, stepState, steps);

  const StepperIndicatorPrimitive = asChild ? Slot : "div";

  return (
    <StepperIndicatorPrimitive
      data-slot="stepper-indicator"
      data-state={dataState}
      dir={dir}
      ref={ref}
      className={cn(
        "bg-app-foreground relative flex size-6 shrink-0 items-center justify-center self-end overflow-hidden rounded-t border-x border-t border-gray-800 text-xs transition-colors duration-500",
        "data-[state=completed]:bg-success-500/50 data-[state=completed]:border-success-500",
        "data-[state=active]:bg-primary-500/50 data-[state=active]:border-primary-500",
        className
      )}
      {...props}
    >
      <div className="absolute">
        {typeof children === "function"
          ? children(dataState)
          : indicators &&
              ((itemContext.stepState?.loading && indicators.loading) ||
                (dataState === "completed" && indicators.completed) ||
                (dataState === "active" && indicators.active) ||
                (dataState === "inactive" && indicators.inactive))
            ? (itemContext.stepState?.loading && indicators.loading) ||
              (dataState === "completed" && indicators.completed) ||
              (dataState === "active" && indicators.active) ||
              (dataState === "inactive" && indicators.inactive)
            : children
              ? children
              : stepPosition}
      </div>
    </StepperIndicatorPrimitive>
  );
}

// TODO Add loading state
