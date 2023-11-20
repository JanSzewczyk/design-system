import * as React from "react";

import * as ReactDialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof ReactDialog.Title>;

export const DialogTitle = React.forwardRef<React.ElementRef<typeof ReactDialog.Title>, DialogTitleProps>(function (
  { className, ...props },
  ref
) {
  return <ReactDialog.Title ref={ref} className={twMerge("typography-heading-6", className)} {...props} />;
});
