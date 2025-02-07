import * as React from "react";

import { twMerge } from "tailwind-merge";

import * as ReactLabel from "@radix-ui/react-label";

export type LabelProps = React.ComponentProps<typeof ReactLabel.Root>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <ReactLabel.Root
      className={twMerge("text-subtitle-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  );
}
