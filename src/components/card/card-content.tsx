import * as React from "react";

import { cn } from "~/utils";

export type CardContentProps = React.ComponentProps<"div">;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("px-6", className)} data-slot="card-content" {...props} />;
}
