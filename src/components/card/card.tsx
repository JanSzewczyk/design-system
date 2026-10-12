import * as React from "react";

import { cn } from "~/utils";

export type CardProps = React.ComponentProps<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded border border-border bg-card py-6 text-card-foreground shadow-sm",
        className
      )}
      data-slot="card"
      {...props}
    />
  );
}
