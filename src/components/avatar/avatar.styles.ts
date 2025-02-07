import { cva } from "class-variance-authority";

export const avatarCva = cva("relative flex shrink-0 overflow-hidden rounded text-gray-100", {
  variants: {
    size: {
      sm: "h-6 w-6 text-xs",
      md: "h-10 w-10 text-lg",
      lg: "h-14 w-14 text-2xl"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
