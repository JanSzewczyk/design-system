import * as React from "react";

import { twMerge } from "tailwind-merge";

import * as ReactSheet from "@radix-ui/react-dialog";

export type SheetTitleProps = React.ComponentProps<typeof ReactSheet.Title>;

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return <ReactSheet.Title className={twMerge("typography-heading-6", className)} {...props} />;
}
