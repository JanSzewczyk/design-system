import * as React from "react";

import { cn } from "~/utils";

export type EmptyProps = React.ComponentProps<"div"> & { border?: boolean | "dashed" };

export function Empty({ className, border = false, ...props }: EmptyProps) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "border-border flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded p-6 text-center text-balance md:p-12",
        border ? "border" : "",
        border === "dashed" ? "border-dashed" : "",
        className
      )}
      {...props}
    />
  );
}
