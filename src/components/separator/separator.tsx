import * as React from "react";

import { Separator as ReactSeparator } from "radix-ui";

import { cn } from "~/utils";

export type SeparatorProps = React.ComponentProps<typeof ReactSeparator.Root>;

export function Separator({ className, orientation = "horizontal", decorative = false, ...props }: SeparatorProps) {
  return (
    <ReactSeparator.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  );
}
