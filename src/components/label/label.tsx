import { Label as ReactLabel } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type LabelProps = React.ComponentProps<typeof ReactLabel.Root>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <ReactLabel.Root
      className={cn(
        "flex select-none items-center gap-2 font-medium text-sm leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className
      )}
      data-slot="label"
      {...props}
    />
  );
}
