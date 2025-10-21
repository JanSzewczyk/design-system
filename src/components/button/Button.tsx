import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type ButtonColorType, type ButtonSizeType, type ButtonVariantType, Spinner } from "~/components";

import { buttonCva, iconContainerCva, iconCva } from "./Button.styles";

export type ButtonProps = React.ComponentProps<"button"> & {
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

export function Button({
  asChild = false,
  variant = "text",
  color = "primary",
  disabled = false,
  fullWidth = false,
  loadingPosition = "start",
  children,
  type = "button",
  loading = false,
  size = "md",
  endIcon,
  startIcon,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const buttonStyles = buttonCva({ fullWidth, size, variant, color });

  const isDisabled = disabled || loading;

  return (
    <Comp
      data-slot="button"
      aria-disabled={isDisabled || undefined}
      className={buttonStyles}
      data-state={loading ? "loading" : undefined}
      disabled={isDisabled}
      role={Comp !== "button" ? "button" : undefined}
      tabIndex={isDisabled ? -1 : 0}
      type={Comp === "button" ? type : undefined}
      {...props}
    >
      <ButtonContent
        loading={loading}
        size={size}
        loadingPosition={loadingPosition}
        startIcon={startIcon}
        endIcon={endIcon}
      >
        {children}
      </ButtonContent>
    </Comp>
  );
}

function ButtonContent({
  children,
  loading = false,
  size = "md",
  loadingPosition = "start",
  startIcon,
  endIcon,
  ...props
}: Partial<ButtonProps>) {
  const isStartLoading = loading && loadingPosition === "start";
  const StartIcon = isStartLoading ? <Spinner aria-label="Loading" /> : startIcon || null;
  const startIconStyles = iconCva({ size, loading: isStartLoading });
  const startIconContainerStyles = iconContainerCva({ size, site: "left" });

  const isEndLoading = loading && loadingPosition === "end";
  const EndIcon = isEndLoading ? <Spinner aria-label="Loading" /> : endIcon || null;
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
    React.cloneElement(
      children as React.ReactElement,
      props,
      <React.Fragment>
        {LeadingIcon}
        {React.isValidElement<React.PropsWithChildren>(children) ? children.props?.children : null}
        {TrailingIcon}
      </React.Fragment>
    )
  ) : (
    <React.Fragment>
      {LeadingIcon}
      {children}
      {TrailingIcon}
    </React.Fragment>
  );
}
