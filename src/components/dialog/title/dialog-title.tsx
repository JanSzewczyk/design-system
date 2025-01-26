import * as React from "react";

import * as ReactDialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

export type DialogTitleProps = React.ComponentProps<typeof ReactDialog.Title>;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <ReactDialog.Title className={twMerge("typography-heading-6", className)} {...props} />;
}
