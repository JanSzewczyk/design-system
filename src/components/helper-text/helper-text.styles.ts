import { cva } from "class-variance-authority";

export const helperTextCva = cva("", {
  variants: {
    type: {
      description: "text-body-2 text-gray-200",
      error: "text-caption text-error-500"
    }
  },
  defaultVariants: {
    type: "description"
  }
});
