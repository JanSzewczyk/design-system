import { cva } from "class-variance-authority";

export const selectCva = cva(
  [
    "bg-app-foreground font-poppins text-body-2 inline-flex h-10 w-full items-center justify-between gap-2 border pl-3 pr-1.5 py-2 outline-0 transition-colors duration-300 ease-in-out [&>span]:line-clamp-1",
    "data-[placeholder]:select-none data-[placeholder]:text-gray-400",
    "invalid:border-error-500 focus:border-primary-500 active:border-primary-500",
    "disabled:border-gray-800 disabled:text-gray-300 disabled:[&>svg]:text-gray-300 disabled:placeholder:text-gray-600 disabled:cursor-not-allowed"
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
