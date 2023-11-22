import { twMerge } from "tailwind-merge";
import React from "react";

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <div className={twMerge("flex flex-col space-y-2 text-center sm:text-left mb-4", className)} {...props} />;
}
