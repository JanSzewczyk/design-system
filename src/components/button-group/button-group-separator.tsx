import * as React from "react";

import { Separator } from "~/components/separator";
import { cn } from "~/utils";

export type ButtonGroupSeparatorProps = React.ComponentProps<typeof Separator>;

export function ButtonGroupSeparator({ className, orientation = "vertical", ...props }: ButtonGroupSeparatorProps) {
  return (
    <Separator
      className={cn(
        "relative self-stretch bg-input data-[orientation=horizontal]:mx-px data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto data-[orientation=horizontal]:w-auto",
        className
      )}
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  );
}
