import * as React from "react";

import { cn } from "~/utils";

export type ItemTitleProps = React.ComponentProps<"div">;

export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return (
    <div
      className={cn("flex w-fit items-center gap-2 font-medium text-sm leading-snug", className)}
      data-slot="item-title"
      {...props}
    />
  );
}
