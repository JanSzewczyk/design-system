import * as React from "react";

import * as SelectPrimitive from "@radix-ui/react-select";

export type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;

export function SelectGroup(props: SelectGroupProps) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}
