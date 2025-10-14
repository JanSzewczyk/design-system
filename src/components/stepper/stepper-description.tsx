import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

import { useStepperItemContext } from "./stepper-item.context";
import { STEPPER_DESCRIPTION_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { getId } from "./stepper.utils";

export type StepperDescriptionProps = React.ComponentProps<"span"> & {
  asChild?: boolean;
};

export function StepperDescription({ className, asChild, ...props }: StepperDescriptionProps) {
  const context = useStepperContext(STEPPER_DESCRIPTION_NAME);
  const itemContext = useStepperItemContext(STEPPER_DESCRIPTION_NAME);

  const descriptionId = getId(context.id, "description", itemContext.value);

  const StepperDescriptionPrimitive = asChild ? Slot : "span";

  return (
    <StepperDescriptionPrimitive
      id={descriptionId}
      data-slot="stepper-description"
      dir={context.dir}
      className={cn("text-sm text-gray-700", className)}
      {...props}
    />
  );
}
