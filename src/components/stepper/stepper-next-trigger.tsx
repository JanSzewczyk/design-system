import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { STEPPER_NEXT_TRIGGER_NAME } from "./stepper.constants";
import { useStepperStore, useStepperStoreContext } from "./stepper.store";

export type StepperNextTriggerProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

export function StepperNextTrigger({ asChild = false, onClick, disabled, ...props }: StepperNextTriggerProps) {
  const store = useStepperStoreContext(STEPPER_NEXT_TRIGGER_NAME);
  const value = useStepperStore((state) => state.value);
  const steps = useStepperStore((state) => state.steps);

  const stepKeys = Array.from(steps.keys());
  const currentIndex = value ? stepKeys.indexOf(value) : -1;

  const isDisabled = disabled || currentIndex >= stepKeys.length - 1;

  const handleClick = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || isDisabled) {
        return;
      }

      const nextIndex = Math.min(currentIndex + 1, stepKeys.length - 1);
      const nextStepValue = stepKeys[nextIndex];

      if (nextStepValue) {
        await store.setStateWithValidation(nextStepValue, "next");
      }
    },
    [onClick, isDisabled, currentIndex, stepKeys, store]
  );

  const StepperNextTriggerPrimitive = asChild ? Slot : "button";

  return (
    <StepperNextTriggerPrimitive
      type="button"
      data-slot="stepper-next-trigger"
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    />
  );
}
