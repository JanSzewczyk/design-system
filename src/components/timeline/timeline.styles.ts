import { cva } from "class-variance-authority";

export const timelineVariants = cva(
  "relative flex [--timeline-connector-thickness:0.125rem] [--timeline-dot-size:0.875rem]",
  {
    compoundVariants: [
      {
        class: "gap-6",
        orientation: "vertical",
        variant: "default"
      },
      {
        class: "gap-8",
        orientation: "horizontal",
        variant: "default"
      },
      {
        class: "relative w-full gap-3",
        orientation: "vertical",
        variant: "alternate"
      },
      {
        class: "items-center gap-4",
        orientation: "horizontal",
        variant: "alternate"
      }
    ],
    defaultVariants: {
      orientation: "vertical",
      variant: "default"
    },
    variants: {
      orientation: {
        horizontal: "flex-row items-start",
        vertical: "flex-col"
      },
      variant: {
        alternate: "",
        default: ""
      }
    }
  }
);

export const timelineItemVariants = cva("relative flex", {
  compoundVariants: [
    {
      class: "gap-3 pb-8 last:pb-0",
      orientation: "vertical",
      variant: "default"
    },
    {
      class: "flex-col gap-3",
      orientation: "horizontal",
      variant: "default"
    },
    {
      class: "w-1/2 gap-3 pr-6 pb-12 last:pb-0",
      isAlternateRight: false,
      orientation: "vertical",
      variant: "alternate"
    },
    {
      class: "ml-auto w-1/2 flex-row-reverse gap-3 pb-12 pl-6 last:pb-0",
      isAlternateRight: true,
      orientation: "vertical",
      variant: "alternate"
    },
    {
      class: "grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3",
      orientation: "horizontal",
      variant: "alternate"
    }
  ],
  defaultVariants: {
    isAlternateRight: false,
    orientation: "vertical",
    variant: "default"
  },
  variants: {
    isAlternateRight: {
      false: "",
      true: ""
    },
    orientation: {
      horizontal: "",
      vertical: ""
    },
    variant: {
      alternate: "",
      default: ""
    }
  }
});

export const timelineContentVariants = cva("flex-1", {
  compoundVariants: [
    {
      class: "text-right",
      isAlternateRight: false,
      orientation: "vertical",
      variant: "alternate"
    },
    {
      class: "row-start-3 pt-2",
      isAlternateRight: false,
      orientation: "horizontal",
      variant: "alternate"
    },
    {
      class: "row-start-1 pb-2",
      isAlternateRight: true,
      orientation: "horizontal",
      variant: "alternate"
    }
  ],
  defaultVariants: {
    isAlternateRight: false,
    orientation: "vertical",
    variant: "default"
  },
  variants: {
    isAlternateRight: {
      false: "",
      true: ""
    },
    orientation: {
      horizontal: "",
      vertical: ""
    },
    variant: {
      alternate: "",
      default: ""
    }
  }
});

export const timelineDotVariants = cva(
  "relative z-10 flex size-(--timeline-dot-size) shrink-0 items-center justify-center rounded-full border-2 bg-background",
  {
    compoundVariants: [
      {
        class: "absolute -right-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background",
        isAlternateRight: false,
        orientation: "vertical",
        variant: "alternate"
      },
      {
        class: "absolute -left-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background",
        isAlternateRight: true,
        orientation: "vertical",
        variant: "alternate"
      },
      {
        class: "row-start-2 bg-background",
        orientation: "horizontal",
        variant: "alternate"
      },
      {
        class: "bg-background",
        status: "completed",
        variant: "alternate"
      },
      {
        class: "bg-background",
        status: "active",
        variant: "alternate"
      }
    ],
    defaultVariants: {
      isAlternateRight: false,
      orientation: "vertical",
      status: "pending",
      variant: "default"
    },
    variants: {
      isAlternateRight: {
        false: "",
        true: ""
      },
      orientation: {
        horizontal: "",
        vertical: ""
      },
      status: {
        active: "border-primary",
        completed: "border-primary",
        pending: "border-border"
      },
      variant: {
        alternate: "",
        default: ""
      }
    }
  }
);

export const timelineConnectorVariants = cva("absolute z-0", {
  compoundVariants: [
    {
      class:
        "start-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] top-3 h-[calc(100%+0.5rem)] w-(--timeline-connector-thickness)",
      orientation: "vertical",
      variant: "default"
    },
    {
      class:
        "start-3 top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] h-(--timeline-connector-thickness) w-[calc(100%+0.5rem)]",
      orientation: "horizontal",
      variant: "default"
    },
    {
      class: "top-2 -right-[calc(var(--timeline-connector-thickness)/2)] h-full w-(--timeline-connector-thickness)",
      isAlternateRight: false,
      orientation: "vertical",
      variant: "alternate"
    },
    {
      class: "top-2 -left-[calc(var(--timeline-connector-thickness)/2)] h-full w-(--timeline-connector-thickness)",
      isAlternateRight: true,
      orientation: "vertical",
      variant: "alternate"
    },
    {
      class:
        "top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] left-3 row-start-2 h-(--timeline-connector-thickness) w-[calc(100%+0.5rem)]",
      orientation: "horizontal",
      variant: "alternate"
    }
  ],
  defaultVariants: {
    isAlternateRight: false,
    isCompleted: false,
    orientation: "vertical",
    variant: "default"
  },
  variants: {
    isAlternateRight: {
      false: "",
      true: ""
    },
    isCompleted: {
      false: "bg-border",
      true: "bg-primary"
    },
    orientation: {
      horizontal: "",
      vertical: ""
    },
    variant: {
      alternate: "",
      default: ""
    }
  }
});
