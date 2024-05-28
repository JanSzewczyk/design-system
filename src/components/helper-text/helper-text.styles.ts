import { cva } from "class-variance-authority";

export const helperTextCva = cva("", {
  variants: {
    type: {
      description: "text-gray-200 typography-body-2",
      error: "text-error-500 typography-caption"
    }
  },
  defaultVariants: {
    type: "description"
  }
});
