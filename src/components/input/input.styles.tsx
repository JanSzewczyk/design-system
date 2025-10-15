import { cva } from "class-variance-authority";

export const inputCva = cva(
  [
    "bg-app-foreground font-poppins h-10 w-full appearance-none border py-2 outline-0 transition-colors duration-300 ease-in-out",
    "placeholder:select-none placeholder:text-gray-400",
    "invalid:border-error-500 focus:border-primary-500 active:border-primary-500",
    "disabled:cursor-not-allowed disabled:border-gray-800 disabled:text-gray-300 disabled:placeholder:text-gray-600"
  ],
  {
    variants: {
      invalid: {
        true: ["text-error-500 border-error-500 hover:border-error-400 focus:text-gray-100"],
        false: ["hover:border-primary-600 border-gray-600 text-gray-100"]
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

export const inputIconContainerCva = cva(
  ["pointer-events-none absolute inset-y-2 inline-flex w-10 place-content-center items-center text-center"],
  {
    variants: {
      disabled: {
        true: "text-gray-300"
      },
      site: {
        right: "right-0 border-l border-l-gray-800 pr-1",
        left: "left-0 border-r border-r-gray-800 pl-1"
      }
    },
    defaultVariants: {
      disabled: false
    }
  }
);
