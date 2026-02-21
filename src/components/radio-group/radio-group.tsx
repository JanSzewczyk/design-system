import * as React from "react";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "~/utils";

// TODO: fix after fixing the bug in radix-ui
export type RadioGroupProps = React.ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  defaultValue?: string;
  value?: string | null;
  onValueChange?: (value: string) => void;
};

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />;
}
