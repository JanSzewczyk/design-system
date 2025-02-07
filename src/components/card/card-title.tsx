import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardTitleProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 className={twMerge("text-heading-5", className)} {...props} />;
}
