import * as React from "react";

import { cn } from "~/utils";

export type ItemGroupProps = React.ComponentProps<"div">;

export function ItemGroup({ className, ...props }: ItemGroupProps) {
  return (
    <div role="list" data-slot="item-group" className={cn("group/item-group flex flex-col", className)} {...props} />
  );
}
