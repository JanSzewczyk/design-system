import * as React from "react";

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

export type DropdownMenuTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>;

export function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}
