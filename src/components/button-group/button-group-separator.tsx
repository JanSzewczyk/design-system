import * as React from "react";

import { Separator } from "~/components/separator";
import { cn } from "~/utils";

export type ButtonGroupSeparatorProps = React.ComponentProps<typeof Separator>;

export function ButtonGroupSeparator({ className, orientation = "vertical", ...props }: ButtonGroupSeparatorProps) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative self-stretch data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  );
}
