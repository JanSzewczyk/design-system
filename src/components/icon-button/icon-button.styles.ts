import { cva } from "class-variance-authority";

export const iconButtonCva = cva(
  [
    "inline-flex items-center justify-center align-middle no-underline transition-colors ease-in-out duration-300",
    "appearance-none select-none rounded-sm border",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
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
      size: {
        sm: "w-6.5 h-6.5",
        md: "w-8.5 h-8.5",
        lg: "w-10.5 h-10.5"
      },
      variant: {
        text: "border-transparent bg-transparent",
        outlined: "bg-transparent",
        contained: ""
      }
    },
    compoundVariants: [
      // ---------- TEXT ---------- //
      {
        variant: "text",
        color: "neutral",
        class: [
          "text-gray-100",
          "hover:border-gray-350 hover:bg-gray-350 hover:text-gray-100",
          "active:border-gray-400 active:bg-gray-400"
        ]
      },
      {
        variant: "text",
        color: "primary",
        class: [
          "text-primary-500",
          "hover:border-primary-500 hover:bg-primary-500 hover:text-white",
          "active:border-primary-600 active:bg-primary-600 active:text-white"
        ]
      },
      {
        variant: "text",
        color: "success",
        class: [
          "text-success-500",
          "hover:border-success-500 hover:bg-success-500 hover:text-white",
          "active:border-success-600 active:bg-success-600 active:text-white"
        ]
      },
      {
        variant: "text",
        color: "warning",
        class: [
          "text-warning-500",
          "hover:border-warning-500 hover:bg-warning-500 hover:text-white",
          "active:border-warning-600 active:bg-warning-600 active:text-white"
        ]
      },
      {
        variant: "text",
        color: "error",
        class: [
          "text-error-500",
          "hover:border-error-500 hover:bg-error-500 hover:text-white",
          "active:border-error-600 active:bg-error-600 active:text-white"
        ]
      },

      // ---------- OUTLINED ---------- //
      {
        variant: "outlined",
        color: "neutral",
        class: ["text-gray-100 border-gray-350", "hover:bg-gray-350", "active:bg-gray-400"]
      },
      {
        variant: "outlined",
        color: "primary",
        class: [
          "text-primary-500 border-primary-500",
          "hover:bg-primary-500 hover:text-white",
          "active:text-white active:bg-primary-600"
        ]
      },
      {
        variant: "outlined",
        color: "success",
        class: [
          "text-success-500 border-success-500",
          "hover:bg-success-500 hover:text-white",
          "active:text-white active:bg-success-600"
        ]
      },
      {
        variant: "outlined",
        color: "warning",
        class: [
          "text-warning-500 border-warning-500",
          "hover:bg-warning-500 hover:text-white",
          "active:text-white active:bg-warning-600"
        ]
      },
      {
        variant: "outlined",
        color: "error",
        class: [
          "text-error-500 border-error-500",
          "hover:bg-error-500 hover:text-white",
          "active:text-white active:bg-error-600"
        ]
      },

      // ---------- OUTLINED ---------- //
      {
        variant: "contained",
        color: "neutral",
        class: [
          "text-gray-100 border-gray-350 bg-gray-350",
          "hover:border-gray-300 hover:bg-gray-300",
          "active:border-gray-400 active:bg-gray-400"
        ]
      },
      {
        variant: "contained",
        color: "primary",
        class: [
          "border-primary-500 bg-primary-500 text-white",
          "hover:border-primary-400 hover:bg-primary-400",
          "active:border-primary-600 active:bg-primary-600"
        ]
      },
      {
        variant: "contained",
        color: "success",
        class: [
          "border-success-500 bg-success-500 text-white",
          "hover:border-success-400 hover:bg-success-400",
          "active:border-success-600 active:bg-success-600"
        ]
      },
      {
        variant: "contained",
        color: "warning",
        class: [
          "border-warning-500 bg-warning-500 text-white",
          "hover:border-warning-400 hover:bg-warning-400",
          "active:border-warning-600 active:bg-warning-600"
        ]
      },
      {
        variant: "contained",
        color: "error",
        class: [
          "border-error-500 bg-error-500 text-white",
          "hover:border-error-400 hover:bg-error-400",
          "active:border-error-600 active:bg-error-600"
        ]
      }
    ],
    defaultVariants: {
      color: "primary",
      size: "md",
      variant: "text"
    }
  }
);
