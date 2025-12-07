import { cva } from "class-variance-authority";

export const dialogContentVariants = cva(
  [
    "bg-background border-border fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-1rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded border p-6 shadow-lg duration-200",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 "
  ],
  {
    variants: {
      width: {
        xs: "w-xs",
        sm: "w-sm",
        md: "w-md",
        lg: "w-lg",
        xl: "w-xl",
        "2xl": "w-2xl",
        "3xl": "w-3xl",
        "4xl": "w-4xl",
        "5xl": "w-5xl",
        "6xl": "w-6xl",
        full: "w-full"
      }
    },
    defaultVariants: {
      width: "md"
    }
  }
);
