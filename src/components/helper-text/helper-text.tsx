import * as React from "react";

import { twMerge } from "tailwind-merge";

import { type HelperTextType } from "~/components";

import { helperTextCva } from "./helper-text.styles";

export type HelperTextProps = React.HTMLAttributes<HTMLParagraphElement> &
  React.RefAttributes<HTMLParagraphElement> & {
    type?: HelperTextType;
  };

export function HelperText({ className, children, type = "description", role, ref, ...props }: HelperTextProps) {
  return (
    <p
      ref={ref}
      className={twMerge(helperTextCva({ type }), className)}
      role={type === "error" ? "alert" : role}
      {...props}
    >
      {children}
    </p>
  );
}
