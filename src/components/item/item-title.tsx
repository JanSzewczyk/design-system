import * as React from "react";

import { cn } from "~/utils";

export type ItemTitleProps = React.ComponentProps<"div">;

export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return (
    <div
      data-slot="item-title"
      className={cn("flex w-fit items-center gap-2 text-sm leading-snug font-medium text-gray-100", className)}
      {...props}
    />
  );
}
