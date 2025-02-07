import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardDescriptionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <p className={twMerge("text-body-2 text-gray-200", className)} {...props} />;
}
