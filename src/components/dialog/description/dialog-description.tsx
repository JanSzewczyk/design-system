import * as React from "react";

import * as ReactDialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof ReactDialog.Description>;
export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof ReactDialog.Description>,
  DialogDescriptionProps
>(function ({ className, ...props }, ref) {
  return (
    <ReactDialog.Description ref={ref} className={twMerge("text-gray-200 typography-body-2", className)} {...props} />
  );
});
