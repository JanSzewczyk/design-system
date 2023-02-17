import { cva } from "class-variance-authority";

export const avatarCva = cva(
  "select-none rounded font-semibold leading-none justify-center flex items-center bg-gray-500 text-white dark:text-black",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-lg",
        md: "h-10 w-10 text-xl",
        lg: "h-14 w-14 text-2xl"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
