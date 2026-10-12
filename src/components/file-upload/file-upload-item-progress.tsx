import { Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";
import { ITEM_PROGRESS_NAME } from "./file-upload.constants";
import { useFileUploadItemContext } from "./file-upload-item.context";

export type FileUploadItemProgressProps = React.ComponentProps<"div"> & {
  variant?: "linear" | "circular" | "fill";
  size?: number;
  asChild?: boolean;
  forceMount?: boolean;
};

export function FileUploadItemProgress(props: FileUploadItemProgressProps) {
  const { variant = "linear", size = 40, asChild, forceMount, className, ...progressProps } = props;

  const itemContext = useFileUploadItemContext(ITEM_PROGRESS_NAME);

  if (!itemContext.fileState) return null;

  const shouldRender = forceMount || itemContext.fileState.progress !== 100;

  if (!shouldRender) return null;

  const ItemProgressPrimitive = asChild ? SlotPrimitive.Slot : "div";

  switch (variant) {
    case "circular": {
      const circumference = 2 * Math.PI * ((size - 4) / 2);
      const strokeDashoffset = circumference - (itemContext.fileState.progress / 100) * circumference;

      return (
        <ItemProgressPrimitive
          aria-labelledby={itemContext.nameId}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={itemContext.fileState.progress}
          aria-valuetext={`${itemContext.fileState.progress}%`}
          data-slot="file-upload-progress"
          role="progressbar"
          {...progressProps}
          className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", className)}
        >
          <svg
            className="-rotate-90 transform"
            fill="none"
            height={size}
            stroke="currentColor"
            viewBox={`0 0 ${size} ${size}`}
            width={size}
          >
            <circle className="text-primary/20" cx={size / 2} cy={size / 2} r={(size - 4) / 2} strokeWidth="2" />
            <circle
              className="text-primary transition-[stroke-dashoffset] duration-300 ease-linear"
              cx={size / 2}
              cy={size / 2}
              r={(size - 4) / 2}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </ItemProgressPrimitive>
      );
    }

    case "fill": {
      const progressPercentage = itemContext.fileState.progress;
      const topInset = 100 - progressPercentage;

      return (
        <ItemProgressPrimitive
          aria-labelledby={itemContext.nameId}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progressPercentage}
          aria-valuetext={`${progressPercentage}%`}
          data-slot="file-upload-progress"
          role="progressbar"
          {...progressProps}
          className={cn("absolute inset-0 bg-primary/50 transition-[clip-path] duration-300 ease-linear", className)}
          style={{
            clipPath: `inset(${topInset}% 0% 0% 0%)`
          }}
        />
      );
    }

    default:
      return (
        <ItemProgressPrimitive
          aria-labelledby={itemContext.nameId}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={itemContext.fileState.progress}
          aria-valuetext={`${itemContext.fileState.progress}%`}
          data-slot="file-upload-progress"
          role="progressbar"
          {...progressProps}
          className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-primary/20", className)}
        >
          <div
            className="h-full w-full flex-1 bg-primary transition-transform duration-300 ease-linear"
            style={{
              transform: `translateX(-${100 - itemContext.fileState.progress}%)`
            }}
          />
        </ItemProgressPrimitive>
      );
  }
}
