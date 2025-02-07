import * as React from "react";

import * as ReactLabel from "@radix-ui/react-label";
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
