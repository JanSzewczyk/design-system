import { cva } from "class-variance-authority";

export const switchVariants = cva(
  [
    "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none",
    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3",
    "aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error dark:aria-invalid:border-error/50 aria-invalid:ring-3",
    "data-disabled:cursor-not-allowed data-disabled:opacity-50",
    "after:absolute after:-inset-x-3 after:-inset-y-2"
  ],
  {
    variants: {
      size: {
        default: "h-[18.4px] w-8",
        sm: "h-3.5 w-6"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);

export const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full ring-0 transition-transform",
    "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground"
  ],
  {
    variants: {
      size: {
        default: "size-4 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        sm: "size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
