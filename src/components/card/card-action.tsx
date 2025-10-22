import * as React from "react";

import { cn } from "~/utils";

export type CardActionProps = React.ComponentProps<"div">;

export function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}
