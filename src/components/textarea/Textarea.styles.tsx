import { cva } from "class-variance-authority";

export const textareaCva = cva(
  [
    "h-28 min-h-10 w-full appearance-none border bg-app-primary px-3 py-2 font-poppins outline-0 transition-colors duration-300 ease-in-out scroll typography-body-2 placeholder:select-none placeholder:text-gray-200",
    "focus:border-primary-400",
    "active:border-primary-400",
    "disabled:border-gray-400 disabled:text-gray-200 disabled:placeholder:text-gray-300"
  ],
  {
    variants: {
      invalid: {
        true: ["text-error-500 border-error-500", "hover:border-error-400", "focus:text-gray-100"],
        false: ["text-gray-100 border-gray-350", "hover:border-primary-500"]
      }
    },
    defaultVariants: {
      invalid: false
    }
  }
);
