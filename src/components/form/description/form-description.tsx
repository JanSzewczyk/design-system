import * as React from "react";

import { HelperText } from "~/components";

import { useFormField } from "../field/use-form-field";

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(function (props, ref) {
  const { formDescriptionId } = useFormField();

  return <HelperText ref={ref} id={formDescriptionId} {...props} />;
});
FormDescription.displayName = "FormDescription";
