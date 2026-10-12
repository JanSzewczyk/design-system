import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/tooltip";
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
      className={cn(sidebarMenuButtonVariants({ size, variant }), className)}
      data-active={isActive}
      data-sidebar="menu-button"
      data-size={size}
      data-slot="sidebar-menu-button"
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
      <TooltipContent align="center" hidden={state !== "collapsed" || isMobile} side="right" {...tooltip} />
    </Tooltip>
  );
}
