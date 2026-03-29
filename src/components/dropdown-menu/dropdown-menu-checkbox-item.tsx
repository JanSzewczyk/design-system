import * as React from "react";

import { CheckIcon } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type DropdownMenuCheckboxItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean;
};

export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-inset:pl-7",
        "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}
