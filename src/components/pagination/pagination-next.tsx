import { ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { cn } from "~/utils";

import { PaginationLink } from "./pagination-link";

export type PaginationNextProps = React.ComponentProps<typeof PaginationLink> & { text?: string };

export function PaginationNext({ className, text = "Next", ...props }: PaginationNextProps) {
  return (
    <PaginationLink aria-label="Go to next page" className={cn("pr-1.5!", className)} size="default" {...props}>
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon className="cn-rtl-flip" data-icon="inline-end" />
    </PaginationLink>
  );
}
