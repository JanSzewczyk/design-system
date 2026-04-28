import * as React from "react";

import { cn } from "~/utils";

export type KbdProps = React.ComponentProps<"kbd">;

export function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 font-code pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded px-1 text-xs font-medium select-none [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  );
}
