"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { cn } from "~/utils";

export type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props;

export function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}
