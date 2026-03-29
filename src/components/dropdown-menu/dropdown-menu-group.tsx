import * as React from "react";

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

export type DropdownMenuGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.Group>;

export function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}
