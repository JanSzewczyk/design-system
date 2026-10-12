import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "~/utils";

export type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;

export function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        "hidden w-full justify-center py-2 text-center text-muted-foreground text-sm group-data-empty/combobox-content:flex",
        className
      )}
      data-slot="combobox-empty"
      {...props}
    />
  );
}
