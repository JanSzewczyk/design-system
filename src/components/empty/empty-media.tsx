import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils";

export type EmptyMediaProps = React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>;

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export function EmptyMedia({ className, variant = "default", ...props }: EmptyMediaProps) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  );
}
