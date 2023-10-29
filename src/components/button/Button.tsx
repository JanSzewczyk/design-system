import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { buttonCva, iconContainerCva, iconCva } from "./Button.styles";
import { ButtonColorType, ButtonSizeType, ButtonVariantType } from "./Button.types";

import { LoadingIcon } from "../../icons";

type Props = {
  /**
   * Defines button full width
   */
  fullWidth?: boolean;
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

  asChild?: boolean;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & Props;

export const Button = React.forwardRef(function (
  {
    asChild = false,
    fullWidth = false,
    color = "primary",
    children,
    size = "md",
    variant = "text",
    disabled = false,
    type = "button",
    loading = false,
    loadingPosition = "start",
    endIcon,
    startIcon,
    ...restProps
  }: ButtonProps,
  ref?: React.Ref<HTMLButtonElement>
) {
  const props = {
    asChild,
    fullWidth,
    color,
    children,
    size,
    variant,
    disabled,
    type,
    loading,
    loadingPosition,
    endIcon,
    startIcon,
    ...restProps
  };

  const Component = asChild ? Slot : "button";

  const buttonStyles = buttonCva({ fullWidth, size, variant, color });

  const isDisabled = disabled || loading;

  return (
    <Component
      {...restProps}
      aria-disabled={isDisabled || undefined}
      className={buttonStyles}
      data-state={loading ? "loading" : undefined}
      disabled={isDisabled}
      ref={ref}
      role={Component !== "button" ? "button" : undefined}
      tabIndex={isDisabled ? -1 : 0}
      type={Component === "button" ? type : undefined}
    >
      {asChild ? <ButtonComponent>{children}</ButtonComponent> : <ButtonComponent {...props} />}
    </Component>
  );
});

function ButtonComponent({
  children,
  loading,
  size,
  loadingPosition,
  startIcon,
  endIcon,
  ...props
}: Partial<ButtonProps>) {
  const isStartLoading = loading && loadingPosition === "start";
  const StartIcon = isStartLoading ? <LoadingIcon aria-label="Loading" /> : startIcon || null;
  const startIconStyles = iconCva({ size, loading: isStartLoading });
  const startIconContainerStyles = iconContainerCva({ size, site: "left" });

  const isEndLoading = loading && loadingPosition === "end";
  const EndIcon = isEndLoading ? <LoadingIcon aria-label="Loading" /> : endIcon || null;
  const endIconStyles = iconCva({ size, loading: isEndLoading });
  const endIconContainerStyles = iconContainerCva({ size, site: "right" });

  const LeadingIcon = StartIcon ? (
    <span className={startIconContainerStyles} role={isStartLoading ? "progressbar" : undefined}>
      {React.cloneElement(StartIcon, { className: startIconStyles })}
    </span>
  ) : null;

  const TrailingIcon = EndIcon ? (
    <span className={endIconContainerStyles} role={isEndLoading ? "progressbar" : undefined}>
      {React.cloneElement(EndIcon, { className: endIconStyles })}
    </span>
  ) : null;

  return React.isValidElement(children) ? (
    React.cloneElement(children as React.ReactElement, {
      ...props,
      children: (
        <>
          {LeadingIcon}
          {React.isValidElement(children) ? children.props.children : null}
          {TrailingIcon}
        </>
      )
    })
  ) : (
    <>
      {LeadingIcon}
      {children}
      {TrailingIcon}
    </>
  );
}
