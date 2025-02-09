import * as React from "react";

import { Dialog as ReactSheet } from "radix-ui";
import { twMerge } from "tailwind-merge";

export type SheetTitleProps = React.ComponentProps<typeof ReactSheet.Title>;

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return <ReactSheet.Title className={twMerge("typography-heading-6", className)} {...props} />;
}
