import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { cn } from "~/utils";

export type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;

export function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  );
}
