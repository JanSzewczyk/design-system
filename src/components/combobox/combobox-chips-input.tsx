import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "~/utils";

export type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props;

export function ComboboxChipsInput({ className, ...props }: ComboboxChipsInputProps) {
  return (
    <ComboboxPrimitive.Input
      className={cn("min-w-16 flex-1 outline-none", className)}
      data-slot="combobox-chip-input"
      {...props}
    />
  );
}
