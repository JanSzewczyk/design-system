import * as React from "react";

import { twMerge } from "tailwind-merge";

import { helperTextCva } from "./helper-text.styles";
import { HelperTextType } from "./text-helper.types";

export type HelperTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  type?: HelperTextType;
};

export const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(function (
  { className, children, type = "description", role, ...props },
  ref
) {
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
});
