import { cva } from "class-variance-authority";

export const inputCva = cva(
  [
    "bg-app-foreground font-poppins h-10 w-full appearance-none border py-2 outline-0 transition-colors duration-300 ease-in-out",
    "placeholder:select-none placeholder:text-gray-200",
    "invalid:border-error-500 focus:border-primary-400 active:border-primary-400",
    "disabled:border-gray-400 disabled:text-gray-200 disabled:placeholder:text-gray-300"
  ],
  {
    variants: {
      invalid: {
        true: ["text-error-500 border-error-500 hover:border-error-400 focus:text-gray-100"],
        false: ["border-gray-350 hover:border-primary-500 text-gray-100"]
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
        true: "text-gray-200"
      },
      site: {
        right: "right-0 border-l border-l-gray-400 pr-1",
        left: "left-0 border-r border-r-gray-400 pl-1"
      }
    },
    defaultVariants: {
      disabled: false
    }
  }
);
