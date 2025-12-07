import { cva } from "class-variance-authority";

export const colorSwatchVariants = cva(
  "border-border box-border rounded border shadow-sm [background-clip:padding-box] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      size: {
        default: "size-8",
        sm: "size-6",
        lg: "size-12"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
