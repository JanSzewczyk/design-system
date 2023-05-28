import * as React from "react";

import { inputCva, inputIconContainerCva } from "./Input.styles";

import { OmitStylesProps } from "../../types/utils.types";

type Props = {
  invalid?: boolean;
  startIcon?: React.ReactElement | string;
  endIcon?: React.ReactElement | string;
};

export type InputProps = OmitStylesProps<React.ComponentPropsWithoutRef<"input">> & Props;

export const Input = React.forwardRef(function (
  { invalid = false, startIcon, endIcon, disabled = false, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const inputStyles = inputCva({ withEndIcon: !!endIcon, withStartIcon: !!startIcon, invalid });
  const inputIconStartContainer = inputIconContainerCva({ site: "left", disabled });
  const inputIconEndContainer = inputIconContainerCva({ site: "right", disabled });

  return (
    <div className="relative text-gray-100 typography-body-2">
      {startIcon ? <span className={inputIconStartContainer}>{startIcon}</span> : null}
      <input
        aria-invalid={invalid || undefined}
        disabled={disabled}
        className={inputStyles}
        ref={ref}
        {...props}
      />
      {endIcon ? (
        <span aria-hidden className={inputIconEndContainer}>
          {endIcon}
        </span>
      ) : null}
    </div>
  );
});