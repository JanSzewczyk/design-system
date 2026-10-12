import * as React from "react";

import { cn } from "~/utils";

export type CardTitleProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <div className={cn("font-semibold leading-none", className)} data-slot="card-title" {...props} />;
}
