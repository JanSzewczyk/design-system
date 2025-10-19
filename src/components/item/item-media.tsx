import * as React from "react";

import { itemMediaVariants } from "~/components/item/item-media.styles";
import { type ItemMediaVariantType } from "~/components/item/item-media.types";
import { cn } from "~/utils";

export type ItemMediaProps = React.ComponentProps<"div"> & {
  variant?: ItemMediaVariantType;
};

export function ItemMedia({ className, variant = "default", ...props }: ItemMediaProps) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
}
