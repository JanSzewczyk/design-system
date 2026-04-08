"use client";

import * as React from "react";

import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { type ToggleSize, type ToggleVariant } from "~/components";
import { cn } from "~/utils";

import { ToggleGroupContext } from "./toggle-group.context";

export type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
  /**
   * Gap between items in spacing scale units. Use 0 to join items without gap.
   */
  spacing?: number;
};

export function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}
