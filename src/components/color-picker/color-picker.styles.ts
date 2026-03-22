import { cva } from "class-variance-authority";

export const inputGroupItemVariants = cva(
  "h-8 [-moz-appearance:textfield] focus-visible:z-10 focus-visible:ring-1 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
  {
    variants: {
      position: {
        first: "rounded-e-none",
        middle: "-ms-px rounded-none border-l-0",
        last: "-ms-px rounded-s-none border-l-0",
        isolated: ""
      }
    },
    defaultVariants: {
      position: "isolated"
    }
  }
);
