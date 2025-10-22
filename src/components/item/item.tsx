import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type ItemSizeType, type ItemVariantType } from "~/components";
import { itemVariants } from "~/components/item/item.styles";
import { cn } from "~/utils";

export type ItemProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  variant?: ItemVariantType;
  size?: ItemSizeType;
};

export function Item({ className, variant = "default", size = "default", asChild = false, ...props }: ItemProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  );
}
