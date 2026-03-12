import { cva } from "class-variance-authority";

export const sheetContentStyles = cva(
  [
    "bg-background text-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 fixed z-50 flex flex-col gap-4 bg-clip-padding shadow-lg transition duration-200 ease-in-out",
    "data-[state=open]:slide-in data-[state=closed]:slide-out"
  ],
  {
    variants: {
      side: {
        top: [
          "data-[side=top]:data-[state=open]:slide-in-from-top-10",
          "data-[side=top]:data-[state=closed]:slide-out-to-top-10",
          "data-[side=top]:inset-x-0",
          "data-[side=top]:top-0",
          "data-[side=top]:h-auto",
          "data-[side=top]:border-b",
          "data-[side=top]:max-h-[90vh]"
        ],
        right: [
          "data-[side=right]:data-[state=open]:slide-in-from-right-10",
          "data-[side=right]:data-[state=closed]:slide-out-to-right-10",
          "data-[side=right]:inset-y-0",
          "data-[side=right]:right-0",
          "data-[side=right]:h-full",
          "data-[side=right]:border-l",
          "data-[side=right]:w-3/4",
          "data-[side=right]:sm:max-w-sm"
        ],
        bottom: [
          "data-[side=bottom]:data-[state=open]:slide-in-from-bottom-10",
          "data-[side=bottom]:data-[state=closed]:slide-out-to-bottom-10",
          "data-[side=bottom]:inset-x-0",
          "data-[side=bottom]:bottom-0",
          "data-[side=bottom]:h-auto",
          "data-[side=bottom]:border-t",
          "data-[side=bottom]:max-h-[90vh]"
        ],
        left: [
          "data-[side=left]:data-[state=open]:slide-in-from-left-10",
          "data-[side=left]:data-[state=closed]:slide-out-to-left-10",
          "data-[side=left]:inset-y-0",
          "data-[side=left]:left-0",
          "data-[side=left]:h-full",
          "data-[side=left]:border-r",
          "data-[side=left]:w-3/4",
          "data-[side=left]:sm:max-w-sm"
        ]
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
