import * as React from "react";

import { textareaCva } from "./Textarea.styles";

export type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  invalid?: boolean;
};

export function Textarea({ invalid = false, ...props }: TextareaProps) {
  const textareaStyles = textareaCva({ invalid });

  return <textarea aria-invalid={invalid || undefined} className={textareaStyles} {...props} />;
}
