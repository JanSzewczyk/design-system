import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = React.forwardRef(
  ({ className, ...props }: CardContentProps, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className={twMerge("p-6 pt-0", className)} {...props} />
  )
);
