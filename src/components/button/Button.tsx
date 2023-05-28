import * as React from "react";

import { buttonCva, iconContainerCva, iconCva } from "./Button.styles";
import { ButtonColorType, ButtonSizeType, ButtonVariantType } from "./Button.types";

import { LoadingIcon } from "../../icons";
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
  /**
   * Defines left icon
   */
  startIcon?: React.ReactElement;
  /**
   * Defines right icon
   */
  endIcon?: React.ReactElement;
  /**
   * Defines is button is in loading state
   */
  loading?: boolean;
  /**
   * Defines is position of loading icon
   */
  loadingPosition?: "start" | "end";
};

export type ButtonProps<T extends React.ElementType = "button"> = PolymorphicComponentProp<
  T,
  Props
>;

export const Button = React.forwardRef(function <T extends React.ElementType = "button">(
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
    loading = false,
    loadingPosition = "start",
    ...restProps
  }: ButtonProps<T>,
  ref?: PolymorphicRef<T>
) {
  const Component = as || "button";

  const buttonStyles = buttonCva({ block, size, variant, color });

  const isStartLoading = loading && loadingPosition === "start";
  const StartIcon = isStartLoading ? <LoadingIcon aria-label="Loading" /> : startIcon || null;
  const startIconStyles = iconCva({ size, loading: isStartLoading });
  const startIconContainerStyles = iconContainerCva({ size, site: "left" });

  const isEndLoading = loading && loadingPosition === "end";
  const EndIcon = isEndLoading ? <LoadingIcon aria-label="Loading" /> : endIcon || null;
  const endIconStyles = iconCva({ size, loading: isEndLoading });
  const endIconContainerStyles = iconContainerCva({ size, site: "right" });

  const isDisabled = disabled || loading;

  return (
    <Component
      aria-disabled={isDisabled || undefined}
      className={buttonStyles}
      data-state={loading ? "loading" : undefined}
      disabled={isDisabled}
      ref={ref}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      type={Component === "button" ? "button" : undefined}
      {...restProps}
    >
      {StartIcon ? (
        <span
          className={startIconContainerStyles}
          role={isStartLoading ? "progressbar" : undefined}
        >
          {React.cloneElement(StartIcon, { className: startIconStyles })}
        </span>
      ) : null}
      {children}
      {EndIcon ? (
        <span className={endIconContainerStyles} role={isEndLoading ? "progressbar" : undefined}>
          {React.cloneElement(EndIcon, { className: endIconStyles })}
        </span>
      ) : null}
    </Component>
  );
});
