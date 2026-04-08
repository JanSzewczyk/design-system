"use client";

import * as React from "react";

import { Toggle as TogglePrimitive } from "radix-ui";

import { cn } from "~/utils";

import { toggleVariants } from "./toggle.styles";
import { type ToggleSizeType, type ToggleVariantType } from "./toggle.types";

export type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: ToggleVariantType;
  size?: ToggleSizeType;
};

export function Toggle({ className, variant = "default", size = "default", ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size }), className)} {...props} />
  );
}
