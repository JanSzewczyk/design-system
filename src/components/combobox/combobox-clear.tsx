import { XIcon } from "lucide-react";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { InputGroupButton } from "~/components/input-group";
import { cn } from "~/utils";

export type ComboboxClearProps = ComboboxPrimitive.Clear.Props;

export function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}
