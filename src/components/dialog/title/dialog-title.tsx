import * as React from "react";

import { Dialog as ReactDialog } from "radix-ui";
import { twMerge } from "tailwind-merge";

export type DialogTitleProps = React.ComponentProps<typeof ReactDialog.Title>;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <ReactDialog.Title className={twMerge("text-heading-6", className)} {...props} />;
}
