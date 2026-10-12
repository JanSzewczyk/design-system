import * as React from "react";

import { cn } from "~/utils";

export type InputGroupTextProps = React.ComponentProps<"span">;

export function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      data-slot="input-group-text"
      {...props}
    />
  );
}
