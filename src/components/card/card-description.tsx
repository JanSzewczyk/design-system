import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = React.forwardRef(
  ({ className, ...props }: CardDescriptionProps, ref: React.Ref<HTMLParagraphElement>) => (
    <p ref={ref} className={twMerge("text-gray-200 typography-body-2", className)} {...props} />
  )
);
