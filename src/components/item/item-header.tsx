import * as React from "react";

import { cn } from "~/utils";

export type ItemHeaderProps = React.ComponentProps<"div">;

export function ItemHeader({ className, ...props }: ItemHeaderProps) {
  return (
    <div
      data-slot="item-header"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  );
}
