import * as React from "react";

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type ScrollBarProps = React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;

export function ScrollBar({ className, orientation = "vertical", ...props }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" ? "h-full w-2.5 border-l border-l-transparent" : "",
        orientation === "horizontal" ? "h-2.5 flex-col border-t border-t-transparent" : "",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}
