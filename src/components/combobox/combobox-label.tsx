import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "~/utils";

export type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props;

export function ComboboxLabel({ className, ...props }: ComboboxLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn("px-2 py-1.5 text-muted-foreground text-xs", className)}
      data-slot="combobox-label"
      {...props}
    />
  );
}
