import * as React from "react";

import { Label as ReactLabel } from "radix-ui";
import { twMerge } from "tailwind-merge";

export type LabelProps = React.ComponentProps<typeof ReactLabel.Root>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <ReactLabel.Root
      className={twMerge("text-subtitle-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  );
}
