import { twMerge } from "tailwind-merge";
import React from "react";

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <div className={twMerge("mb-4 flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
}
