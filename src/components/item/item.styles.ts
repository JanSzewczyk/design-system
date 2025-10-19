import { cva } from "class-variance-authority";

export const itemCva = cva(
  [
    "group/item flex items-center border border-transparent text-sm rounded-md transition-colors duration-100 flex-wrap outline-none",
    "[a]:hover:bg-gray-900 [a]:transition-colors",
    "focus-visible:ring-primary-500/50 focus-visible:ring-[3px]"
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-gray-800"
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
