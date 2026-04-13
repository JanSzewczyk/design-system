import { cva } from "class-variance-authority";

export const alertDialogContentVariants = cva(
  [
    "group/alert-dialog-content bg-popover text-popover-foreground ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded p-4 ring-1 duration-100 outline-none ",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
  ],
  {
    variants: {
      size: {
        default: "max-w-xs sm:max-w-sm",
        sm: "max-w-xs"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
