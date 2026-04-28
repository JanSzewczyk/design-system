import { Combobox as ComboboxPrimitive } from "@base-ui/react";

export type ComboboxValueProps = ComboboxPrimitive.Value.Props;

export function ComboboxValue({ ...props }: ComboboxValueProps) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}
