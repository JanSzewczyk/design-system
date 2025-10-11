import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type BadgeColorType, type BadgeVariantType } from "~/components";
import { badgeCva } from "~/components/badge/badge.styles";
import { cn } from "~/utils";

export type BadgeProps = React.ComponentProps<"span"> & {
  /**
   * Defines badge color
   */
  color?: BadgeColorType;
  /**
   * Defines badge variant
   */
  variant?: BadgeVariantType;
  /**
   * Defines badge content
   */
  children?: React.ReactNode;
  asChild?: boolean;
};

export function Badge({
  asChild = false,
  color = "primary",
  variant = "contained",
  className,
  children,
  ...props
}: BadgeProps) {
  const badgeStyles = badgeCva({ color, variant });
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-color={color}
      role={!asChild ? "status" : undefined}
      className={cn(badgeStyles, className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
