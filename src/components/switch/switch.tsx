import * as React from "react";

import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "~/utils";

import { switchThumbVariants, switchVariants } from "./switch.styles";
import { type SwitchSizeType } from "./switch.types";

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: SwitchSizeType;
};

export function Switch({ className, size = "default", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn(switchVariants({ size }), className)} {...props}>
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={switchThumbVariants({ size })} />
    </SwitchPrimitive.Root>
  );
}
