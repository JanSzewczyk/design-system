import * as React from "react";
import { buttonCva } from "./Button.styles";
import { ButtonColorType, ButtonSizeType, ButtonVariantType } from "./Button.types";
import { PolymorphicComponentProp, PolymorphicRef } from "../../types/utils.types";

export type ButtonProp = {
  /**
   * Defines button color
   * @default 'primary'
   */
  color?: ButtonColorType;
  /**
   * Defines button variant
   * @default 'text'
   */
  variant?: ButtonVariantType;
  /**
   * Defines button size
   * @default 'md'
   */
  size?: ButtonSizeType;
  /**
   * Defines avatar children
   */
  children?: React.ReactNode;
};

export default React.forwardRef(function <T extends React.ElementType = "button">(
  {
    as,
    color = "primary",
    children,
    size = "md",
    variant = "text",
    ...restProps
  }: PolymorphicComponentProp<T, ButtonProp>,
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
