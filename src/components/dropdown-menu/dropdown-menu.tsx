import * as React from "react";

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root>;

export function DropdownMenu(props: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}
