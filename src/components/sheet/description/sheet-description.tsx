import * as React from "react";

import { twMerge } from "tailwind-merge";

import * as ReactSheet from "@radix-ui/react-dialog";

export type SheetDescriptionProps = React.ComponentProps<typeof ReactSheet.Description>;

export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return <ReactSheet.Description className={twMerge("typography-body-2 text-gray-200", className)} {...props} />;
}
