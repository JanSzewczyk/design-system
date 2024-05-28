import { cva } from "class-variance-authority";

export const avatarCva = cva("relative flex shrink-0 overflow-hidden rounded", {
  variants: {
    size: {
      sm: "text-lg h-6 w-6",
      md: "h-10 w-10 text-xl",
      lg: "h-14 w-14 text-2xl"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
