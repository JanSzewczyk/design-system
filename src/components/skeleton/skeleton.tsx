import * as React from "react";

import { cn } from "~/utils";

export type SkeletonProps = React.ComponentProps<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div data-slot="skeleton" className={cn("bg-muted animate-pulse rounded-md", className)} {...props} />;
}
