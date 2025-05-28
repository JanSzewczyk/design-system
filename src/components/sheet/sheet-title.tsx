import * as React from "react";

import { Dialog as ReactSheet } from "radix-ui";

import { cn } from "~/utils";

export type SheetTitleProps = React.ComponentProps<typeof ReactSheet.Title>;

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return <ReactSheet.Title className={cn("typography-heading-6", className)} {...props} />;
}
