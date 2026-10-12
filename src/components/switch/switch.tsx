import { Switch as SwitchPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

import { switchThumbVariants, switchVariants } from "./switch.styles";
import { type SwitchSizeType } from "./switch.types";

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: SwitchSizeType;
};

export function Switch({ className, size = "default", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root className={cn(switchVariants({ size }), className)} data-slot="switch" {...props}>
      <SwitchPrimitive.Thumb className={switchThumbVariants({ size })} data-slot="switch-thumb" />
    </SwitchPrimitive.Root>
  );
}
