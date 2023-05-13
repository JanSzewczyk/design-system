import * as React from "react";

import { buttonCva } from "./Button.styles";
import { ButtonColorType, ButtonSizeType, ButtonVariantType } from "./Button.types";

import { PolymorphicComponentProp, PolymorphicRef } from "../../types/utils.types";

type Props = {
  /**
   * Defines button full width
   */
  block?: boolean;
  /**
   * Defines button color
   */
  color?: ButtonColorType;
  /**
   * Defines button variant
   */
  variant?: ButtonVariantType;
  /**
   * Defines button size
   */
  size?: ButtonSizeType;
  /**
   * Defines button content
   */
  children?: React.ReactNode;
  /**
   * Disabled button
   */
  disabled?: boolean;
};

export type ButtonProps<T extends React.ElementType = "button"> = PolymorphicComponentProp<
  T,
  Props
>;

const Button = React.forwardRef(function <T extends React.ElementType = "button">(
  {
    as,
    block = false,
    color = "primary",
    children,
    size = "md",
    variant = "text",
    disabled = false,
    ...restProps
  }: ButtonProps<T>,
  ref?: PolymorphicRef<T>
) {
  const Component = as || "button";

  const buttonRootStyles = buttonCva({ block, size, variant, color });

  return (
    <Component
      aria-disabled={disabled || undefined}
      className={buttonRootStyles}
      disabled={disabled}
      ref={ref}
      role="button"
      {...restProps}
    >
      {children}
    </Component>
  );
});

export default Button;
