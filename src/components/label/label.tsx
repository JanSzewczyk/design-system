import * as React from "react";

import * as ReactLabel from "@radix-ui/react-label";
import { twMerge } from "tailwind-merge";

export type LabelProps = React.ComponentPropsWithoutRef<typeof ReactLabel.Root>;

export const Label = React.forwardRef<React.ElementRef<typeof ReactLabel.Root>, LabelProps>(function (
  { className, ...props },
  ref
) {
  return (
    <ReactLabel.Root
      ref={ref}
      className={twMerge("typography-subtitle-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  );
});
