import * as React from "react";

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import { cn } from "~/utils";

import { type DropdownMenuItemVariantType } from "./dropdown-menu-item.types";

export type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: DropdownMenuItemVariantType;
};

export function DropdownMenuItem({ className, inset, variant = "default", ...props }: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded px-1.5 py-1 text-sm outline-hidden select-none data-inset:pl-7",
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=error]:focus:**:text-accent-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-[variant=error]:text-error data-[variant=error]:*:[svg]:text-error dark:data-[variant=error]:focus:bg-error/20 data-[variant=error]:focus:bg-error/10 data-[variant=error]:focus:text-error",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}
