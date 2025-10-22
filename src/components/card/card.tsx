import * as React from "react";

import { cn } from "~/utils";

export type CardProps = React.ComponentProps<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground border-border flex flex-col gap-6 rounded border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
