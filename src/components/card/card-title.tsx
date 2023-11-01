import React from "react";

import { twMerge } from "tailwind-merge";

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = React.forwardRef(
  ({ className, ...props }: CardTitleProps, ref: React.Ref<HTMLParagraphElement>) => (
    <h3 ref={ref} className={twMerge("typography-heading-5", className)} {...props} />
  )
);
