import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardFooter = React.forwardRef(
  ({ className, ...props }: CardFooterProps, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className={twMerge("flex items-center p-6 pt-0", className)} {...props} />
  )
);
