import { cva } from "class-variance-authority";

export const colorSwatchVariants = cva(
  "border-border box-border rounded border [background-clip:padding-box] shadow-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    defaultVariants: {
      size: "default"
    },
    variants: {
      size: {
        default: "size-8",
        lg: "size-12",
        sm: "size-6"
      }
    }
  }
);
