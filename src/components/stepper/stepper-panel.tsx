import React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

import { useStepperStore } from "./stepper.store";

export type StepperPanelProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export function StepperPanel({ children, asChild = false, className, ...props }: StepperPanelProps) {
  const currentValue = useStepperStore((state) => state.value);

  const StepperPanelPrimitive = asChild ? Slot : "div";

  return (
    <StepperPanelPrimitive
      data-slot="stepper-panel"
      data-state={currentValue}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </StepperPanelPrimitive>
  );
}
