import * as React from "react";

import { ArrowPathIcon } from "@heroicons/react/24/outline";

import { buttonCva, iconContainerCva, iconCva } from "./Button.styles";
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

  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
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
    startIcon,
    endIcon,
    type,
    ...restProps
  }: ButtonProps<T>,
  ref?: PolymorphicRef<T>
) {
  const Component = as || "button";

  const IconLeft = startIcon || <ArrowPathIcon />;
  const IconRight = endIcon || <ArrowPathIcon />;

  const buttonStyles = buttonCva({ block, size, variant, color });
  const iconStyles = iconCva({ size });
  const iconContainerRightStyles = iconContainerCva({ size, side: "right" });
  const iconContainerLeftStyles = iconContainerCva({ size, side: "left" });

  return (
    <Component
      aria-disabled={disabled || undefined}
      className={buttonStyles}
      disabled={disabled}
      ref={ref}
      role="button"
      tabIndex={0}
      type={Component === "button" ? "button" : undefined}
      {...restProps}
    >
      {IconLeft ? (
        <span className={iconContainerLeftStyles}>
          {React.cloneElement(IconLeft, { className: iconStyles })}
        </span>
      ) : null}
      {children}
      {IconRight ? (
        <span className={iconContainerRightStyles}>
          {React.cloneElement(IconRight, { className: iconStyles })}
        </span>
      ) : null}
    </Component>
  );
});

export default Button;
