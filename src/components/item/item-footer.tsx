import * as React from "react";

import { cn } from "~/utils";

export type ItemFooterProps = React.ComponentProps<"div">;

export function ItemFooter({ className, ...props }: ItemFooterProps) {
  return (
    <div
      data-slot="item-footer"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  );
}
