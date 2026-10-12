import * as React from "react";

import { type AlertVariant } from "~/components/alert/alert.types";
import { cn } from "~/utils";

import { alertVariants } from "./alert.styles";

export type AlertProps = React.ComponentProps<"div"> & { variant?: AlertVariant };

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  return <div className={cn(alertVariants({ variant }), className)} data-slot="alert" role="alert" {...props} />;
}
