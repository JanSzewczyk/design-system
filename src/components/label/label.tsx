import * as React from "react";

import { Label as ReactLabel } from "radix-ui";

import { cn } from "~/utils";

export type LabelProps = React.ComponentProps<typeof ReactLabel.Root>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <ReactLabel.Root
      className={cn("text-subtitle-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  );
}
