import * as React from "react";

import { Button } from "~/components";
import { cn } from "~/utils";

import { inputGroupButtonVariants } from "./input-group-button.styles";
import { type InputGroupButtonSizeType } from "./input-group.types";

export type InputGroupButtonProps = Omit<React.ComponentProps<typeof Button>, "size"> & {
  size?: InputGroupButtonSizeType;
};

export function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}
