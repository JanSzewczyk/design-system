import { cva } from "class-variance-authority";

export const selectCva = cva(
  [
    "bg-app-foreground font-poppins text-body-2 inline-flex h-10 w-full items-center justify-between gap-2 border py-2 pl-3 pr-1.5 outline-0 transition-colors duration-300 ease-in-out [&>span]:line-clamp-1",
    "data-[placeholder]:select-none data-[placeholder]:text-gray-400",
    "invalid:border-error-500 focus:border-primary-500 active:border-primary-500",
    "disabled:cursor-not-allowed disabled:border-gray-800 disabled:text-gray-300 disabled:placeholder:text-gray-600 disabled:[&>svg]:text-gray-300"
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
