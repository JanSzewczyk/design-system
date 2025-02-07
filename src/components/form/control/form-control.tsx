import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { useFormField } from "../field/use-form-field";

export type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>;

export const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, FormControlProps>(function (props, ref) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  const newProps = { ...props, invalid: !!error };
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...newProps}
    />
  );
});
FormControl.displayName = "FormControl";
