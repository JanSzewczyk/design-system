import * as React from "react";

import { Select as SelectPrimitive } from "radix-ui";

export type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;

export function SelectGroup(props: SelectGroupProps) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}
