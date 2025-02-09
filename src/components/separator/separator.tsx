import * as React from "react";

import { Separator as ReactSeparator } from "radix-ui";
import { twMerge } from "tailwind-merge";

export type SeparatorProps = React.ComponentProps<typeof ReactSeparator.Root>;

export function Separator({ className, orientation = "horizontal", decorative = true, ...props }: SeparatorProps) {
  return (
    <ReactSeparator.Root
      decorative={decorative}
      orientation={orientation}
      className={twMerge(
        "shrink-0 bg-gray-400",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
}
