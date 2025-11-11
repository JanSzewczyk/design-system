import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium outline-none transition-all",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring",
    "aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error"
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        error:
          "bg-error hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error/60 text-white",
        outline:
          "bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false
    }
  }
);
