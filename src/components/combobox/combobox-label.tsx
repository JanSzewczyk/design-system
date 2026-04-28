"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { cn } from "~/utils";

export type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props;

export function ComboboxLabel({ className, ...props }: ComboboxLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}
