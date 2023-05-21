import { cva } from "class-variance-authority";

export const inputCva = cva(
  [
    "h-10 w-full appearance-none border bg-black py-2 font-poppins outline-0 transition-colors duration-300 ease-in-out",
    "placeholder:select-none placeholder:text-typography-secondary",
    "invalid:border-error-700 focus:border-primary-500 active:border-primary-500",
    "disabled:border-gray-700 disabled:text-typography-secondary disabled:placeholder:text-typography-disabled"
  ],
  {
    variants: {
      invalid: {
        true: [
          "text-error-700 border-error-700 hover:border-error-500 active:text-typography-primary focus:text-typography-primary"
        ],
        false: ["text-typography-primary border-gray-600 hover:border-primary-700"]
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
  [
    "pointer-events-none absolute bottom-2 top-2 inline-flex w-10 content-center items-center justify-center text-center"
  ],
  {
    variants: {
      disabled: {
        true: "text-typography-secondary"
      },
      site: {
        right: "right-0 border-l border-l-gray-600 pr-1",
        left: "left-0 border-r border-r-gray-600 pl-1"
      }
    },
    defaultVariants: {
      disabled: false
    }
  }
);
