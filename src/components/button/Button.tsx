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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function (
  {
    asChild = false,
    variant = "text",
    color = "primary",
    disabled = false,
    fullWidth = false,
    ...props
  },
  ref
) {
  const {
    children,
    type = "button",
    loading = false,
    size = "md",
    loadingPosition = "start",
    endIcon,
    startIcon,
    ...rest
  } = props;

  const Component = asChild ? Slot : "button";

  const buttonStyles = buttonCva({ fullWidth, size, variant, color });

  const isDisabled = disabled || loading;

  return (
    <Component
      {...(asChild ? props : rest)}
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
  loading = false,
  size = "md",
  loadingPosition = "start",
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
