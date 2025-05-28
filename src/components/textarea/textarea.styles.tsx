import { cva } from "class-variance-authority";

export const textareaCva = cva(
  [
    "bg-app-foreground font-poppins h-28 min-h-10 w-full appearance-none border py-2 px-3 outline-0 transition-colors duration-300 ease-in-out",
    "placeholder:select-none placeholder:text-gray-400",
    "invalid:border-error-500",
    "focus:border-primary-500",
    "active:border-primary-500",
    "disabled:border-gray-800 disabled:text-gray-300 disabled:placeholder:text-gray-600 disabled:cursor-not-allowed"
  ],
  {
    variants: {
      invalid: {
        true: ["text-error-500 border-error-500 hover:border-error-400 focus:text-gray-100"],
        false: ["border-gray-600 hover:border-primary-600 text-gray-100"]
      }
    },
    defaultVariants: {
      invalid: false
    }
  }
);
