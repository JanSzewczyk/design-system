import * as React from "react";

import { cn } from "~/utils";

export type SkeletonProps = React.ComponentProps<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} data-slot="skeleton" {...props} />;
}
