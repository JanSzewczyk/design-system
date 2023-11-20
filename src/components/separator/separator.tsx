import * as React from "react";

import * as ReactSeparator from "@radix-ui/react-separator";
import { twMerge } from "tailwind-merge";

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof ReactSeparator.Root>;

export const Separator = React.forwardRef<React.ElementRef<typeof ReactSeparator.Root>, SeparatorProps>(function (
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
) {
  return (
    <ReactSeparator.Root
      ref={ref}
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
});
