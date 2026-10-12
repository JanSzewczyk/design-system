import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import * as React from "react";

export type ComboboxProps = React.ComponentProps<typeof ComboboxPrimitive.Root>;

export const Combobox = ComboboxPrimitive.Root;

export function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}
