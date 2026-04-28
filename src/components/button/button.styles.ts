import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center rounded border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:not-aria-[haspopup]:translate-y-px",
    "aria-invalid:border-error aria-invalid:ring-3 aria-invalid:ring-error/20 dark:aria-invalid:border-error/50 dark:aria-invalid:ring-error/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        error:
          "bg-error/10 text-error hover:bg-error/20 focus-visible:border-error/40 focus-visible:ring-error/20 dark:bg-error/20 dark:hover:bg-error/30 dark:focus-visible:ring-error/40",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        xs: "h-6 gap-1 rounded px-2 text-xs in-data-[slot=button-group]:rounded has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        "icon-xs": "size-6 rounded in-data-[slot=button-group]:rounded [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded in-data-[slot=button-group]:rounded",
        icon: "size-8",
        "icon-lg": "size-9"
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
