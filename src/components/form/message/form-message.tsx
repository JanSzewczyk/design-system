import * as React from "react";

import { HelperText } from "~/components";

import { useFormField } from "../field/use-form-field";

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(function (
  { children, ...props },
  ref
) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <HelperText ref={ref} type="error" id={formMessageId} {...props}>
      {body}
    </HelperText>
  );
});
FormMessage.displayName = "FormMessage";
