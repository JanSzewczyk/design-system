import * as React from "react";

import { cn } from "~/utils";

export type CardTitleProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />;
}
