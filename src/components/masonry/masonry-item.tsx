import type React from "react";

import { Slot } from "@radix-ui/react-slot";

export type MasonryItemProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};
export type MasonryItemElement = HTMLDivElement;

export function MasonryItem({ asChild, ref, ...props }: MasonryItemProps) {
  const ItemPrimitive = asChild ? Slot : "div";

  return <ItemPrimitive data-slot="masonry-item" ref={ref} {...props} />;
}
