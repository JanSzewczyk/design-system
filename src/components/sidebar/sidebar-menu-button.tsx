import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components";
import { cn } from "~/utils";

import { useSidebarContext } from "./sidebar.context";
import { sidebarMenuButtonVariants } from "./sidebar.styles";
import { type SidebarMenuButtonSizeType, type SidebarMenuButtonVariantType } from "./sidebar-menu-button.types";

export type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  variant?: SidebarMenuButtonVariantType;
  size?: SidebarMenuButtonSizeType;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
};

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebarContext("SidebarMenuButton");

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = { children: tooltip };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  );
}
