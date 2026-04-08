import * as React from "react";

import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { type ToggleSize, type ToggleVariant } from "~/components";
import { toggleVariants } from "~/components/toggle/toggle.styles";
import { cn } from "~/utils";

import { ToggleGroupContext } from "./toggle-group.context";

export type ToggleGroupItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

export function ToggleGroupItem({ children, className, variant, size, ...props }: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 focus:z-10 focus-visible:z-10",
        "group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5",
        "group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l",
        "group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-l group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        "",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}
