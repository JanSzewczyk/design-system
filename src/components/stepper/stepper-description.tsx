import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";
import { STEPPER_DESCRIPTION_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { getId } from "./stepper.utils";
import { useStepperItemContext } from "./stepper-item.context";

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
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="stepper-description"
      dir={context.dir}
      id={descriptionId}
      {...props}
    />
  );
}
