import * as React from "react";

import { textareaCva } from "./textarea.styles";

import { OmitStylesProps } from "../../types/utils.types";

type Props = {
  invalid?: boolean;
};

export type TextareaProps = OmitStylesProps<React.ComponentPropsWithoutRef<"textarea">> & Props;

const Textarea = React.forwardRef(function (
  { invalid = false, ...props }: TextareaProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  const textareaStyles = textareaCva({ invalid });

  return (
    <textarea aria-invalid={invalid || undefined} className={textareaStyles} ref={ref} {...props} />
  );
});

export default Textarea;
