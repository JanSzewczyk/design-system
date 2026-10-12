import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";

import { itemVariants } from "./item.styles";
import { type ItemSizeType, type ItemVariantType } from "./item.types";

export type ItemProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  variant?: ItemVariantType;
  size?: ItemSizeType;
};

export function Item({ className, variant = "default", size = "default", asChild = false, ...props }: ItemProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(itemVariants({ className, size, variant }))}
      data-size={size}
      data-slot="item"
      data-variant={variant}
      {...props}
    />
  );
}
