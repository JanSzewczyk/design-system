import { cva } from "class-variance-authority";

export const statusVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full border px-2.5 py-1 font-medium text-xs transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-muted text-muted-foreground **:data-[slot=status-indicator]:bg-muted-foreground",
        success: "border-success/20 bg-success/10 text-success **:data-[slot=status-indicator]:bg-success",
        error: "border-error/20 bg-error/10 text-error **:data-[slot=status-indicator]:bg-error",
        warning: "border-warning/20 bg-warning/10 text-warning **:data-[slot=status-indicator]:bg-warning",
        primary: "border-primary/20 bg-primary/10 text-primary **:data-[slot=status-indicator]:bg-primary "
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
