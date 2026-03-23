import { cva } from "class-variance-authority";

export const fileUploadListVariants = cva(
  "data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0 data-[state=inactive]:slide-out-to-top-2 data-[state=active]:slide-in-from-top-2 data-[state=active]:animate-in data-[state=inactive]:animate-out flex flex-col gap-2",
  {
    variants: {
      orientation: {
        vertical: "",
        horizontal: "flex-row overflow-x-auto p-1.5"
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
