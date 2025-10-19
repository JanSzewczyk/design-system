import { cva } from "class-variance-authority";

export const itemMediaVariants = cva(
  [
    "flex shrink-0 items-center justify-center gap-2 [&_svg]:pointer-events-none",
    "group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start"
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-gray-600 size-8 rounded border [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
