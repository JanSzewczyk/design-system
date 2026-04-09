import * as React from "react";

import { ChevronLeftIcon } from "lucide-react";

import { cn } from "~/utils";

import { PaginationLink } from "./pagination-link";

export type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink> & { text?: string };

export function PaginationPrevious({ className, text = "Previous", ...props }: PaginationPreviousProps) {
  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={cn("pl-1.5!", className)} {...props}>
      <ChevronLeftIcon data-icon="inline-start" className="cn-rtl-flip" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}
