import { cva } from "class-variance-authority";

export const selectCva = cva(
  [
    "h-10 w-full appearance-none border bg-app-primary py-2 font-poppins outline-0 inline-flex items-center justify-between text-gray-100 typography-body-2 gap-2 transition-colors duration-300 ease-in-out",
    "placeholder:select-none placeholder:text-gray-200",
    "invalid:border-error-500 focus:border-primary-400 active:border-primary-400",
    "disabled:border-gray-400 disabled:text-gray-200 disabled:placeholder:text-gray-300"
  ],
  {
    variants: {
      invalid: {
        true: ["text-error-500 border-error-500 hover:border-error-400 focus:text-gray-100"],
        false: ["text-gray-100 border-gray-350 hover:border-primary-500"]
      },
      withStartIcon: {
        true: "pl-11",
        false: "pl-3"
      },
      withEndIcon: {
        true: "pr-11",
        false: "pr-3"
      }
    },
    defaultVariants: {
      invalid: false,
      withStartIcon: false,
      withEndIcon: false
    }
  }
);
