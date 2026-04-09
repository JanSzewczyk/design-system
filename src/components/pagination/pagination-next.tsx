import * as React from "react";

import { ChevronRightIcon } from "lucide-react";

import { cn } from "~/utils";

import { PaginationLink } from "./pagination-link";

export type PaginationNextProps = React.ComponentProps<typeof PaginationLink> & { text?: string };

export function PaginationNext({ className, text = "Next", ...props }: PaginationNextProps) {
  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn("pr-1.5!", className)} {...props}>
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" className="cn-rtl-flip" />
    </PaginationLink>
  );
}
