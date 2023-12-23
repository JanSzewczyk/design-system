import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";
import { iconButtonCva } from "./icon-button.styles";
import { IconButtonColorType, IconButtonSizeType, IconButtonVariantType } from "./icon-button.types";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  size?: IconButtonSizeType;
  variant?: IconButtonVariantType;
  color?: IconButtonColorType;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function (
  { className, variant = "text", color = "primary", size = "md", asChild = false, ...props },
  ref
) {
  const Component = asChild ? Slot : "button";

  const buttonStyles = iconButtonCva({ size, variant, color, className });

  return <Component className={twMerge(buttonStyles)} ref={ref} {...props} />;
});
