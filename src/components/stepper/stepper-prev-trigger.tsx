import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { STEPPER_PREV_TRIGGER_NAME } from "./stepper.constants";
import { useStepperStore, useStepperStoreContext } from "./stepper.store";

export type StepperPrevTriggerProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

export function StepperPrevTrigger({ asChild = false, disabled, onClick, ...props }: StepperPrevTriggerProps) {
  const store = useStepperStoreContext(STEPPER_PREV_TRIGGER_NAME);
  const value = useStepperStore((state) => state.value);
  const steps = useStepperStore((state) => state.steps);

  const stepKeys = Array.from(steps.keys());
  const currentIndex = value ? stepKeys.indexOf(value) : -1;
  const isDisabled = disabled || currentIndex <= 0;

  const handleClick = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || isDisabled) {
        return;
      }

      const prevIndex = Math.max(currentIndex - 1, 0);
      const prevStepValue = stepKeys[prevIndex];

      if (prevStepValue) {
        store.setState("value", prevStepValue);
      }
    },
    [currentIndex, isDisabled, onClick, stepKeys, store]
  );

  const StepperPrevTriggerPrimitive = asChild ? Slot : "button";

  return (
    <StepperPrevTriggerPrimitive
      type="button"
      data-slot="stepper-prev-trigger"
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    />
  );
}
