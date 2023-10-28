import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef(
  ({ className, ...props }: CardHeaderProps, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className={twMerge("flex flex-col p-6", className)} {...props} />
  )
);
