import { ChevronLeftIcon } from "lucide-react";
import * as React from "react";

import { cn } from "~/utils";

import { PaginationLink } from "./pagination-link";

export type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink> & { text?: string };

export function PaginationPrevious({ className, text = "Previous", ...props }: PaginationPreviousProps) {
  return (
    <PaginationLink aria-label="Go to previous page" className={cn("pl-1.5!", className)} size="default" {...props}>
      <ChevronLeftIcon className="cn-rtl-flip" data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}
