import { cva } from "class-variance-authority";

export const carouselVariants = cva("relative", {
  defaultVariants: {
    orientation: "horizontal"
  },
  variants: {
    orientation: {
      horizontal: "",
      vertical: ""
    }
  }
});

export const carouselContentVariants = cva("flex", {
  defaultVariants: {
    orientation: "horizontal"
  },
  variants: {
    orientation: {
      horizontal: "-ml-4",
      vertical: "-mt-4 flex-col"
    }
  }
});

export const carouselItemVariants = cva("min-w-0 shrink-0 grow-0 basis-full", {
  defaultVariants: {
    orientation: "horizontal"
  },
  variants: {
    orientation: {
      horizontal: "pl-4",
      vertical: "pt-4"
    }
  }
});
