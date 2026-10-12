import * as React from "react";

import { cn } from "~/utils";

export type CardDescriptionProps = React.ComponentProps<"div">;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <div className={cn("text-muted-foreground text-sm", className)} data-slot="card-description" {...props} />;
}
