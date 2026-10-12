import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";

export type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;

export function SelectGroup(props: SelectGroupProps) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}
