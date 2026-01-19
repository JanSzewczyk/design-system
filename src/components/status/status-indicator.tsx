import * as React from "react";

import { cn } from "~/utils";

export type StatusIndicatorProps = React.ComponentProps<"div">;

export function StatusIndicator(props: StatusIndicatorProps) {
  const { className, ...indicatorProps } = props;

  return (
    <div
      data-slot="status-indicator"
      {...indicatorProps}
      className={cn(
        "relative flex size-2 shrink-0 rounded-full",
        "before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-inherit",
        "after:absolute after:inset-0.5 after:rounded-full after:bg-inherit",
        className
      )}
    />
  );
}
