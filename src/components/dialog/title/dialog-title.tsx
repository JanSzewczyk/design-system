import * as React from "react";

import { twMerge } from "tailwind-merge";

import * as ReactDialog from "@radix-ui/react-dialog";

export type DialogTitleProps = React.ComponentProps<typeof ReactDialog.Title>;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <ReactDialog.Title className={twMerge("text-heading-6", className)} {...props} />;
}
