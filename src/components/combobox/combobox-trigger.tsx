import { ChevronDownIcon } from "lucide-react";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "~/utils";

export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;

export function ComboboxTrigger({ className, children, ...props }: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />
    </ComboboxPrimitive.Trigger>
  );
}
