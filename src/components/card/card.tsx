import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef(({ className, ...props }: CardProps, ref: React.Ref<HTMLDivElement>) => (
  <div ref={ref} className={twMerge("h-full rounded border border-gray-400 bg-foreground", className)} {...props} />
));
