import { cva } from "class-variance-authority";

export const badgeCva = cva(
  [
    "text-xs inline-flex w-fit shrink-0 items-center justify-center gap-x-1 overflow-hidden whitespace-nowrap rounded border px-2 py-0.5 transition-[color,box-shadow]",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
    "focus-visible:border-ring focus-visible:ring-primary-500/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-error-500/20 aria-invalid:border-ring-error-500"
  ],
  {
    variants: {
      color: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        error: ""
      },
      variant: {
        contained: "",
        outlined: "bg-transparent"
      }
    },
    compoundVariants: [
      // ---------- contained ---------- //
      {
        variant: "contained",
        color: "neutral",
        class: ["border-gray-500 bg-gray-500 text-white"]
      },
      {
        variant: "contained",
        color: "primary",
        class: ["border-primary-500 bg-primary-500 text-white"]
      },
      {
        variant: "contained",
        color: "success",
        class: ["border-success-500 bg-success-500 text-white"]
      },
      {
        variant: "contained",
        color: "warning",
        class: ["border-warning-500 bg-warning-500 text-white"]
      },
      {
        variant: "contained",
        color: "error",
        class: ["border-error-500 bg-error-500 text-white"]
      },

      // ---------- OUTLINED ---------- //
      {
        variant: "outlined",
        color: "neutral",
        class: ["border-gray-500 text-gray-100"]
      },
      {
        variant: "outlined",
        color: "primary",
        class: ["border-primary-500 text-primary-500"]
      },
      {
        variant: "outlined",
        color: "success",
        class: ["border-success-500 text-success-500"]
      },
      {
        variant: "outlined",
        color: "warning",
        class: ["border-warning-500 text-warning-500"]
      },
      {
        variant: "outlined",
        color: "error",
        class: ["border-error-500 text-error-500"]
      }
    ],
    defaultVariants: {
      color: "primary",
      variant: "contained"
    }
  }
);
