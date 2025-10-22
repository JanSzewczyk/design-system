import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type ButtonSizeType, type ButtonVariantType, Spinner } from "~/components";

import { buttonVariants } from "./Button.styles";
import { cn } from "~/utils";

export type ButtonProps = React.ComponentProps<"button"> & {
  /**
   * Defines button full width
   */
  fullWidth?: boolean;
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
  loadingPosition?: "start" | "end" | "center";

  asChild?: boolean;
};

export function Button({
  asChild = false,
  variant = "default",
  disabled = false,
  fullWidth = false,
  loadingPosition: loadingPositionProp = "start",
  children,
  type = "button",
  loading = false,
  size = "default",
  endIcon,
  startIcon,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const isDisabled = disabled || loading;
  const loadingPosition = size?.startsWith("icon") ? "center" : loadingPositionProp;

  console.log(isDisabled);

  return (
    <Comp
      data-slot="button"
      aria-disabled={isDisabled || undefined}
      className={cn(buttonVariants({ fullWidth, size, variant }), className)}
      data-state={loading ? "loading" : undefined}
      disabled={isDisabled}
      role={Comp !== "button" ? "button" : undefined}
      tabIndex={isDisabled ? -1 : 0}
      type={Comp === "button" ? type : undefined}
      data-size={size}
      data-variant={variant}
      {...props}
    >
      <ButtonContent
        loading={loading}
        size={size}
        loadingPosition={loadingPosition}
        startIcon={startIcon}
        endIcon={endIcon}
        asChild={asChild}
      >
        {children}
      </ButtonContent>
    </Comp>
  );
}

function ButtonContent({
  children,
  loading = false,
  loadingPosition = "start",
  startIcon,
  asChild,
  endIcon,
  ...props
}: Partial<ButtonProps>) {
  const isStartLoading = loading && loadingPosition === "start";
  const StartIcon = isStartLoading ? <Spinner aria-label="Loading" /> : startIcon || null;

  const isEndLoading = loading && loadingPosition === "end";
  const EndIcon = isEndLoading ? <Spinner aria-label="Loading" /> : endIcon || null;

  const isCenterLoading = loading && loadingPosition === "center";

  return asChild && React.isValidElement(children) ? (
    React.cloneElement(
      children as React.ReactElement,
      props,
      <React.Fragment>
        {StartIcon}
        {isCenterLoading ? (
          <Spinner aria-label="Loading" />
        ) : React.isValidElement<React.PropsWithChildren>(children) ? (
          children.props?.children
        ) : null}
        {EndIcon}
      </React.Fragment>
    )
  ) : (
    <React.Fragment>
      {StartIcon}
      {isCenterLoading ? <Spinner aria-label="Loading" /> : children}
      {EndIcon}
    </React.Fragment>
  );
}
