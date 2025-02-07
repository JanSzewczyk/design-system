import * as React from "react";

import { twMerge } from "tailwind-merge";

import * as ReactDialog from "@radix-ui/react-dialog";

export type DialogDescriptionProps = React.ComponentProps<typeof ReactDialog.Description>;

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <ReactDialog.Description className={twMerge("text-body-2 text-gray-200", className)} {...props} />;
}
