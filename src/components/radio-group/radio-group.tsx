import * as React from "react";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type RadioGroupProps = RadioGroupPrimitive.RadioGroupProps;

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />;
}
