import { Combobox as ComboboxPrimitive } from "@base-ui/react";

export type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props;

export function ComboboxCollection({ ...props }: ComboboxCollectionProps) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />;
}
