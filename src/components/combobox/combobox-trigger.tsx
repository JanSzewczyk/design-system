import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "~/utils";

export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;

export function ComboboxTrigger({ className, children, ...props }: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  );
}
