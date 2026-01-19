import { cva } from "class-variance-authority";

export const timelineVariants = cva(
  "relative flex [--timeline-connector-thickness:0.125rem] [--timeline-dot-size:0.875rem]",
  {
    variants: {
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row items-start"
      },
      variant: {
        default: "",
        alternate: ""
      }
    },
    compoundVariants: [
      {
        orientation: "vertical",
        variant: "default",
        class: "gap-6"
      },
      {
        orientation: "horizontal",
        variant: "default",
        class: "gap-8"
      },
      {
        orientation: "vertical",
        variant: "alternate",
        class: "relative w-full gap-3"
      },
      {
        orientation: "horizontal",
        variant: "alternate",
        class: "items-center gap-4"
      }
    ],
    defaultVariants: {
      orientation: "vertical",
      variant: "default"
    }
  }
);

export const timelineItemVariants = cva("relative flex", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: ""
    },
    variant: {
      default: "",
      alternate: ""
    },
    isAlternateRight: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      orientation: "vertical",
      variant: "default",
      class: "gap-3 pb-8 last:pb-0"
    },
    {
      orientation: "horizontal",
      variant: "default",
      class: "flex-col gap-3"
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: false,
      class: "w-1/2 gap-3 pr-6 pb-12 last:pb-0"
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: true,
      class: "ml-auto w-1/2 flex-row-reverse gap-3 pb-12 pl-6 last:pb-0"
    },
    {
      orientation: "horizontal",
      variant: "alternate",
      class: "grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3"
    }
  ],
  defaultVariants: {
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false
  }
});

export const timelineContentVariants = cva("flex-1", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: ""
    },
    variant: {
      default: "",
      alternate: ""
    },
    isAlternateRight: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      variant: "alternate",
      orientation: "vertical",
      isAlternateRight: false,
      class: "text-right"
    },
    {
      variant: "alternate",
      orientation: "horizontal",
      isAlternateRight: false,
      class: "row-start-3 pt-2"
    },
    {
      variant: "alternate",
      orientation: "horizontal",
      isAlternateRight: true,
      class: "row-start-1 pb-2"
    }
  ],
  defaultVariants: {
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false
  }
});

export const timelineDotVariants = cva(
  "relative z-10 flex size-[var(--timeline-dot-size)] shrink-0 items-center justify-center rounded-full border-2 bg-background",
  {
    variants: {
      status: {
        completed: "border-primary",
        active: "border-primary",
        pending: "border-border"
      },
      orientation: {
        vertical: "",
        horizontal: ""
      },
      variant: {
        default: "",
        alternate: ""
      },
      isAlternateRight: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      {
        variant: "alternate",
        orientation: "vertical",
        isAlternateRight: false,
        class: "absolute -right-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background"
      },
      {
        variant: "alternate",
        orientation: "vertical",
        isAlternateRight: true,
        class: "absolute -left-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background"
      },
      {
        variant: "alternate",
        orientation: "horizontal",
        class: "row-start-2 bg-background"
      },
      {
        variant: "alternate",
        status: "completed",
        class: "bg-background"
      },
      {
        variant: "alternate",
        status: "active",
        class: "bg-background"
      }
    ],
    defaultVariants: {
      status: "pending",
      orientation: "vertical",
      variant: "default",
      isAlternateRight: false
    }
  }
);

export const timelineConnectorVariants = cva("absolute z-0", {
  variants: {
    isCompleted: {
      true: "bg-primary",
      false: "bg-border"
    },
    orientation: {
      vertical: "",
      horizontal: ""
    },
    variant: {
      default: "",
      alternate: ""
    },
    isAlternateRight: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      orientation: "vertical",
      variant: "default",
      class:
        "start-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] top-3 h-[calc(100%+0.5rem)] w-[var(--timeline-connector-thickness)]"
    },
    {
      orientation: "horizontal",
      variant: "default",
      class:
        "start-3 top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] h-[var(--timeline-connector-thickness)] w-[calc(100%+0.5rem)]"
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: false,
      class: "top-2 -right-[calc(var(--timeline-connector-thickness)/2)] h-full w-[var(--timeline-connector-thickness)]"
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: true,
      class: "top-2 -left-[calc(var(--timeline-connector-thickness)/2)] h-full w-[var(--timeline-connector-thickness)]"
    },
    {
      orientation: "horizontal",
      variant: "alternate",
      class:
        "top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] left-3 row-start-2 h-[var(--timeline-connector-thickness)] w-[calc(100%+0.5rem)]"
    }
  ],
  defaultVariants: {
    isCompleted: false,
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false
  }
});
