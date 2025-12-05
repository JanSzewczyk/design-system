import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { badgeVariants } from "~/components/badge/badge.styles";
import { cn } from "~/utils";

import { type BadgeVariant } from "./badge.types";

export type BadgeProps = React.ComponentProps<"span"> & { variant?: BadgeVariant; asChild?: boolean };

export function Badge({ className, variant = "primary", asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}
