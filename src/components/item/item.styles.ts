import { cva } from "class-variance-authority";

export const itemVariants = cva(
  "group/item [a]:hover:bg-accent/50 [a]:transition-colors focus-visible:border-ring focus-visible:ring-ring/50 flex flex-wrap items-center rounded border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "gap-4 p-4 ",
        sm: "gap-2.5 px-4 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
