import * as React from "react";

import { cn } from "~/utils";

export type CardDescriptionProps = React.ComponentProps<"div">;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}
