import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

export type BreadcrumbLinkProps = React.ComponentProps<"a"> & {
  asChild?: boolean;
};

export function BreadcrumbLink({ asChild, className, ...props }: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp data-slot="breadcrumb-link" className={cn("hover:text-foreground transition-colors", className)} {...props} />
  );
}
