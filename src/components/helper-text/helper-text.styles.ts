import { cva } from "class-variance-authority";

export const helperTextCva = cva("", {
  variants: {
    type: {
      description: "typography-body-2 text-gray-200",
      error: "typography-caption text-error-500"
    }
  },
  defaultVariants: {
    type: "description"
  }
});
