import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";

export type BreadcrumbLinkProps = React.ComponentProps<"a"> & {
  asChild?: boolean;
};

export function BreadcrumbLink({ asChild, className, ...props }: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp className={cn("transition-colors hover:text-foreground", className)} data-slot="breadcrumb-link" {...props} />
  );
}
