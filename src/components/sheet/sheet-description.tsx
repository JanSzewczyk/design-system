import * as React from "react";

import { Dialog as ReactSheet } from "radix-ui";

import { cn } from "~/utils";

export type SheetDescriptionProps = React.ComponentProps<typeof ReactSheet.Description>;

export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return <ReactSheet.Description className={cn("typography-body-2 text-gray-300", className)} {...props} />;
}
