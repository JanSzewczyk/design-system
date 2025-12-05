import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "border-border focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "bg-success text-success-foreground [a&]:hover:bg-success/90 border-transparent focus-visible:ring-success/20",
        warning:
          "bg-warning text-warning-foreground [a&]:hover:bg-warning/90 border-transparent focus-visible:ring-warning/20",
        error:
          "bg-error [a&]:hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error/60 text-error-foreground border-transparent"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);
