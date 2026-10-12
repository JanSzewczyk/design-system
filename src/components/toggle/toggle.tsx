import { Toggle as TogglePrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

import { toggleVariants } from "./toggle.styles";
import { type ToggleSize, type ToggleVariant } from "./toggle.types";

export type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

export function Toggle({ className, variant = "default", size = "default", ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root className={cn(toggleVariants({ size, variant }), className)} data-slot="toggle" {...props} />
  );
}
