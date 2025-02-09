import * as React from "react";

import { cn } from "~/utils";

import { inputCva, inputIconContainerCva } from "./input.styles";

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  invalid?: boolean;
  startIcon?: React.ReactElement | string;
  endIcon?: React.ReactElement | string;
};

export function Input({ invalid = false, startIcon, endIcon, disabled = false, className, ...props }: InputProps) {
  const inputStyles = inputCva({ withEndIcon: !!endIcon, withStartIcon: !!startIcon, invalid });
  const inputIconStartContainer = inputIconContainerCva({ site: "left", disabled });
  const inputIconEndContainer = inputIconContainerCva({ site: "right", disabled });

  return (
    <div className="text-body-2 relative text-gray-100">
      {startIcon ? <span className={inputIconStartContainer}>{startIcon}</span> : null}
      <input
        aria-invalid={invalid || undefined}
        disabled={disabled}
        className={cn(inputStyles, className)}
        {...props}
      />
      {endIcon ? (
        <span aria-hidden className={inputIconEndContainer}>
          {endIcon}
        </span>
      ) : null}
    </div>
  );
}
