import * as React from "react";

import { Dialog as ReactDialog } from "radix-ui";

import { cn } from "~/utils";

export type DialogDescriptionProps = React.ComponentProps<typeof ReactDialog.Description>;

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <ReactDialog.Description className={cn("text-body-2 text-gray-300", className)} {...props} />;
}
