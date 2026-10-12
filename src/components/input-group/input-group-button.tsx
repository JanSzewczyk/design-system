import * as React from "react";

import { Button } from "~/components/button";
import { cn } from "~/utils";
import { type InputGroupButtonSizeType } from "./input-group.types";
import { inputGroupButtonVariants } from "./input-group-button.styles";

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
      className={cn(inputGroupButtonVariants({ size }), className)}
      data-size={size}
      type={type}
      variant={variant}
      {...props}
    />
  );
}
