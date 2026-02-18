import { cva, type VariantProps } from "class-variance-authority";

export const carouselVariants = cva("relative", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: ""
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});

export const carouselContentVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "-ml-4",
      vertical: "-mt-4 flex-col"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});

export const carouselItemVariants = cva("min-w-0 shrink-0 grow-0 basis-full", {
  variants: {
    orientation: {
      horizontal: "pl-4",
      vertical: "pt-4"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});

export type CarouselVariantsProps = VariantProps<typeof carouselVariants>;
export type CarouselContentVariantsProps = VariantProps<typeof carouselContentVariants>;
export type CarouselItemVariantsProps = VariantProps<typeof carouselItemVariants>;
