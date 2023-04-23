import * as React from "react";

import { buttonCva } from "./Button.styles";
import { ButtonColorType, ButtonSizeType, ButtonVariantType } from "./Button.types";

import { PolymorphicComponentProp, PolymorphicRef } from "../../types/utils.types";

type Props = {
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
  children: React.ReactNode;
  /**
   * Disabled button
   */
  disabled?: boolean;
};

export type ButtonProps<T extends React.ElementType> = PolymorphicComponentProp<T, Props>;

const Button = React.forwardRef(function <T extends React.ElementType = "button">(
  {
    as,
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

  const buttonRootStyles = buttonCva({ size, variant, color });

  return (
    <Component className={buttonRootStyles} ref={ref} {...restProps}>
      {children}
    </Component>
  );
});

export default Button;
