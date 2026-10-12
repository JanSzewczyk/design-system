import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";

import { type Button } from "../button";
import { buttonVariants } from "../button/button.styles";

export type PaginationLinkProps = {
  isActive?: boolean;
  asChild?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

export function PaginationLink({
  className,
  isActive,
  asChild,
  size = "icon",
  children,
  ...props
}: PaginationLinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      aria-current={isActive ? "page" : undefined}
      className={cn(buttonVariants({ size, variant: isActive ? "outline" : "ghost" }), className)}
      data-active={isActive}
      data-slot="pagination-link"
      {...props}
    >
      {children}
    </Comp>
  );
}
