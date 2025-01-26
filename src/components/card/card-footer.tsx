import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardFooterProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return <div className={twMerge("flex items-center p-6 pt-0", className)} {...props} />;
}
