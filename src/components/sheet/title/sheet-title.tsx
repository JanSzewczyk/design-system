import * as React from "react";

import * as ReactSheet from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

export type SheetTitleProps = React.ComponentPropsWithoutRef<typeof ReactSheet.Title>;

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof ReactSheet.Title>,
  SheetTitleProps
>(function ({ className, ...props }, ref) {
  return (
    <ReactSheet.Title
      ref={ref}
      className={twMerge("typography-subtitle-1", className)}
      {...props}
    />
  );
});
