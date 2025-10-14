import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

import { useStepperItemContext } from "./stepper-item.context";
import { STEPPER_TITLE_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { getId } from "./stepper.utils";

export type StepperTitleProps = React.ComponentProps<"h3"> & {
  asChild?: boolean;
};

export function StepperTitle({ className, asChild = false, ...props }: StepperTitleProps) {
  const context = useStepperContext(STEPPER_TITLE_NAME);
  const itemContext = useStepperItemContext(STEPPER_TITLE_NAME);

  const titleId = getId(context.id, "title", itemContext.value);

  const TitlePrimitive = asChild ? Slot : "h3";

  return (
    <TitlePrimitive
      id={titleId}
      data-slot="stepper-title"
      dir={context.dir}
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  );
}
