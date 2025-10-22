import * as React from "react";

import { cn } from "~/utils";

export type CardContentProps = React.ComponentProps<"div">;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}
