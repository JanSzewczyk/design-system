import * as React from "react";

import * as ReactSheet from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

export type SheetDescriptionProps = React.ComponentPropsWithoutRef<typeof ReactSheet.Description>;
export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof ReactSheet.Description>,
  SheetDescriptionProps
>(function ({ className, ...props }, ref) {
  return (
    <ReactSheet.Description
      ref={ref}
      className={twMerge("text-gray-200 typography-body-2", className)}
      {...props}
    />
  );
});
