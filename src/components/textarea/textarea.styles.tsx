import { cva } from "class-variance-authority";

export const textareaCva = cva(
  [
    "bg-app-foreground font-poppins h-28 min-h-10 w-full appearance-none border px-3 py-2 outline-0 transition-colors duration-300 ease-in-out",
    "placeholder:select-none placeholder:text-gray-400",
    "invalid:border-error-500",
    "focus:border-primary-500",
    "active:border-primary-500",
    "disabled:cursor-not-allowed disabled:border-gray-800 disabled:text-gray-300 disabled:placeholder:text-gray-600"
  ],
  {
    variants: {
      invalid: {
        true: ["text-error-500 border-error-500 hover:border-error-400 focus:text-gray-100"],
        false: ["hover:border-primary-600 border-gray-600 text-gray-100"]
      }
    },
    defaultVariants: {
      invalid: false
    }
  }
);
