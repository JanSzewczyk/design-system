import { cva } from "class-variance-authority";

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 rounded text-sm font-medium whitespace-nowrap transition-all outline-none",
    "hover:bg-muted hover:text-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-[pressed=true]:bg-muted data-[state=on]:bg-muted",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring",
    "aria-invalid:border-error aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ],
  {
    defaultVariants: {
      size: "default",
      variant: "default"
    },
    variants: {
      size: {
        default: "h-8 min-w-8 px-2.5",
        lg: "h-9 min-w-9 px-2.5",
        sm: "h-7 min-w-7 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5"
      },
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted"
      }
    }
  }
);
