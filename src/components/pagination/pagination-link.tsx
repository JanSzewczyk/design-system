import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
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
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(buttonVariants({ variant: isActive ? "outline" : "ghost", size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
