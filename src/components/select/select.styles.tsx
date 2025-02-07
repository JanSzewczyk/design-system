import { cva } from "class-variance-authority";

export const selectCva = cva(
  [
    "bg-app-foreground text-body-2 inline-flex h-10 w-full appearance-none items-center justify-between gap-2 border px-3 py-2 text-gray-100 outline-0 transition-colors duration-300 ease-in-out",
    "placeholder:select-none placeholder:text-gray-200",
    "invalid:border-error-500 focus:border-primary-400 active:border-primary-400",
    "disabled:border-gray-400 disabled:text-gray-200 disabled:placeholder:text-gray-300"
  ],
  {
    variants: {
      invalid: {
        true: ["text-error-500 border-error-500 hover:border-error-400 focus:text-gray-100"],
        false: ["border-gray-350 hover:border-primary-500 text-gray-100"]
      }
    },
    defaultVariants: {
      invalid: false
    }
  }
);
