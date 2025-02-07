import { cva } from "class-variance-authority";

export const avatarCva = cva("relative flex shrink-0 overflow-hidden rounded text-gray-100", {
  variants: {
    size: {
      sm: "size-6 text-xs",
      md: "size-10 text-lg",
      lg: "size-14 text-2xl"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
