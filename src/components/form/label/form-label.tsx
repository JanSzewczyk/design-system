import * as React from "react";

import { twMerge } from "tailwind-merge";

import { Label, type LabelProps } from "~/components/label";

import { useFormField } from "../field/use-form-field";

export type FormLabelProps = LabelProps & {
  caption?: React.ReactNode;
};

export const FormLabel = React.forwardRef<React.ElementRef<typeof Label>, FormLabelProps>(
  ({ className, caption, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
      <div className="flex flex-row items-end justify-between">
        <Label
          ref={ref}
          className={twMerge(error ? "text-error-500" : null, className)}
          htmlFor={formItemId}
          {...props}
        />

        {caption ? <div className="typography-caption text-gray-200">{caption}</div> : null}
      </div>
    );
  }
);
FormLabel.displayName = "FormLabel";
