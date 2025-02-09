import * as React from "react";

import { Dialog as ReactDialog } from "radix-ui";
import { twMerge } from "tailwind-merge";

export type DialogDescriptionProps = React.ComponentProps<typeof ReactDialog.Description>;

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <ReactDialog.Description className={twMerge("text-body-2 text-gray-200", className)} {...props} />;
}
