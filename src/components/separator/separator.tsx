import * as React from "react";

import { Separator as ReactSeparator } from "radix-ui";

import { cn } from "~/utils";

export type SeparatorProps = React.ComponentProps<typeof ReactSeparator.Root>;

export function Separator({ className, orientation = "horizontal", decorative = false, ...props }: SeparatorProps) {
  return (
    <ReactSeparator.Root
      decorative={decorative}
      orientation={orientation}
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-gray-800",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
}
