import * as React from "react";

import { twMerge } from "tailwind-merge";

import { inputCva, inputIconContainerCva } from "./input.styles";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  startIcon?: React.ReactElement | string;
  endIcon?: React.ReactElement | string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function (
  { invalid = false, startIcon, endIcon, disabled = false, className, ...props },
  ref
) {
  const inputStyles = inputCva({ withEndIcon: !!endIcon, withStartIcon: !!startIcon, invalid });
  const inputIconStartContainer = inputIconContainerCva({ site: "left", disabled });
  const inputIconEndContainer = inputIconContainerCva({ site: "right", disabled });

  return (
    <div className="relative text-gray-100 typography-body-2">
      {startIcon ? <span className={inputIconStartContainer}>{startIcon}</span> : null}
      <input
        {...props}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        className={twMerge(inputStyles, className)}
        ref={ref}
      />
      {endIcon ? (
        <span aria-hidden className={inputIconEndContainer}>
          {endIcon}
        </span>
      ) : null}
    </div>
  );
});
