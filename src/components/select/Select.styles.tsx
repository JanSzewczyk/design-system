import { cva } from "class-variance-authority";

export const selectCva = cva(
  [
    "inline-flex h-10 w-full appearance-none items-center justify-between gap-2 border bg-app-primary px-3 py-2 font-poppins text-gray-100 outline-0 transition-colors duration-300 ease-in-out typography-body-2",
    "placeholder:select-none placeholder:text-gray-200",
    "invalid:border-error-500 focus:border-primary-400 active:border-primary-400",
    "disabled:border-gray-400 disabled:text-gray-200 disabled:placeholder:text-gray-300"
  ],
  {
    variants: {
      invalid: {
        true: ["border-error-500 text-error-500 hover:border-error-400 focus:text-gray-100"],
        false: ["border-gray-350 text-gray-100 hover:border-primary-500"]
      }
    },
    defaultVariants: {
      invalid: false
    }
  }
);
