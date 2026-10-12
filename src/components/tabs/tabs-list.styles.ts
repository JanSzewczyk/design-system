import { cva } from "class-variance-authority";

export const tabsListVariants = cva(
  [
    "group/tabs-list inline-flex w-fit items-center justify-center rounded p-[3px] text-muted-foreground",
    "group-data-[orientation=horizontal]/tabs:h-8",
    "group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
    "data-[variant=line]:rounded-none"
  ],
  {
    defaultVariants: {
      variant: "default"
    },
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    }
  }
);
