import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { XIcon } from "lucide-react";
import { InputGroupButton } from "~/components/input-group";
import { cn } from "~/utils";

export type ComboboxClearProps = ComboboxPrimitive.Clear.Props;

export function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      className={cn(className)}
      data-slot="combobox-clear"
      render={<InputGroupButton size="icon-xs" variant="ghost" />}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}
