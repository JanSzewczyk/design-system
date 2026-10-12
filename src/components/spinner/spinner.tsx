import { LoaderCircle } from "lucide-react";
import React from "react";

import { cn } from "~/utils";

export type SpinnerProps = React.ComponentProps<"svg">;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <LoaderCircle aria-label="Loading" className={cn("size-4 animate-spin", className)} role="status" {...props} />
  );
}
