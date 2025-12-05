import * as React from "react";

import { cn } from "~/utils";

export type BadgeDotProps = React.ComponentProps<"span">;

export function BadgeDot({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge-dot"
      className={cn("size-1.5 rounded-full bg-[currentColor] opacity-75", className)}
      {...props}
    />
  );
}
