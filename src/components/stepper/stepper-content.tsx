import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";

import { STEPPER_CONTENT_NAME } from "./stepper.constants";
import { useStepperContext } from "./stepper.context";
import { useStepperStore } from "./stepper.store";
import { getId } from "./stepper.utils";

export type StepperContentProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  value: string;
  forceMount?: boolean;
};

export function StepperContent({
  value: valueProp,
  asChild = false,
  forceMount = false,
  className,
  ...props
}: StepperContentProps) {
  const context = useStepperContext(STEPPER_CONTENT_NAME);
  const value = useStepperStore((state) => state.value);

  const contentId = getId(context.id, "content", valueProp);
  const triggerId = getId(context.id, "trigger", valueProp);

  const isActive = value === valueProp;

  if (!isActive && !forceMount) {
    return null;
  }

  const ContentPrimitive = asChild ? Slot : "div";

  return (
    <ContentPrimitive
      aria-labelledby={triggerId}
      className={cn("w-full", className, !isActive && forceMount && "hidden")}
      data-slot="stepper-content"
      data-state={value}
      dir={context.dir}
      hidden={!isActive && forceMount}
      id={contentId}
      role="tabpanel"
      {...props}
    />
  );
}
