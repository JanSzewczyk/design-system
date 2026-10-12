import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";

export type SidebarGroupActionProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

export function SidebarGroupAction({ className, asChild = false, ...props }: SidebarGroupActionProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 group-data-[collapsible=icon]:hidden md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      data-sidebar="group-action"
      data-slot="sidebar-group-action"
      {...props}
    />
  );
}
