import { cva } from "class-variance-authority";

export const textareaCva = cva(
  [
    "bg-app-primary font-poppins text-body-2 h-28 min-h-10 w-full appearance-none border px-3 py-2 outline-0 transition-colors duration-300 ease-in-out placeholder:select-none placeholder:text-gray-200",
    "focus:border-primary-400",
    "active:border-primary-400",
    "disabled:border-gray-400 disabled:text-gray-200 disabled:placeholder:text-gray-300"
  ],
  {
    variants: {
      invalid: {
        true: ["text-error-500 border-error-500", "hover:border-error-400", "focus:text-gray-100"],
        false: ["border-gray-350 text-gray-100", "hover:border-primary-500"]
      }
    },
    defaultVariants: {
      invalid: false
    }
  }
);
