import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";
import { STEPPER_INDICATOR_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { useStepperStore } from "./stepper.store";
import { type StepperDataState } from "./stepper.types";
import { getDataState } from "./stepper.utils";
import { useStepperItemContext } from "./stepper-item.context";

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
      className={cn(
        "relative flex size-6 shrink-0 items-center justify-center self-end overflow-hidden rounded-t border-border border-x border-t bg-muted text-muted-foreground text-xs transition-colors duration-500",
        "data-[state=completed]:border-success data-[state=completed]:bg-success/50 data-[state=completed]:text-success-foreground",
        "data-[state=active]:border-primary data-[state=active]:bg-primary/50 data-[state=active]:text-primary-foreground",
        className
      )}
      data-slot="stepper-indicator"
      data-state={dataState}
      dir={dir}
      ref={ref}
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
