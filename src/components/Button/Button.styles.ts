import { cva } from "class-variance-authority";

export const buttonCva = cva(
  "border rounded font-sans font-medium leading-[1.75] tracking-[.02857em]",
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
        sm: "py-1 px-2.5 text-[.8125rem]",
        md: "px-4 py-1.5 text-sm",
        lg: "px-5 py-2 text-[.9375rem]"
      },
      variant: {
        text: "border-transparent bg-transparent hover:text-white",
        outlined: "",
        contained: ""
      }
    },
    compoundVariants: [
      {
        variant: "text",
        color: "neutral",
        class: [
          "text-gray-400",
          "hover:border-gray-400 hover:bg-gray-400",
          "active:text-white active:border-gray-300 active:bg-gray-300",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent disabled:hover:text-gray-400"
        ]
      },
      {
        variant: "text",
        color: "primary",
        class: [
          "text-primary-500",
          "hover:border-primary-400 hover:bg-primary-400",
          "active:text-white active:border-primary-600 active:bg-primary-600",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent disabled:hover:text-primary-500"
        ]
      },
      {
        variant: "text",
        color: "success",
        class: [
          "text-success-500",
          "hover:border-success-400 hover:bg-success-400",
          "active:text-white active:border-success-600 active:bg-success-600",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent disabled:hover:text-success-500"
        ]
      },
      {
        variant: "text",
        color: "warning",
        class: [
          "text-warning-500",
          "hover:border-warning-400 hover:bg-warning-400",
          "active:text-white active:border-warning-600 active:bg-warning-600",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent disabled:hover:text-warning-500"
        ]
      },
      {
        variant: "text",
        color: "error",
        class: [
          "text-error-500",
          "hover:border-error-400 hover:bg-error-400",
          "active:text-white active:border-error-600 active:bg-error-600",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent disabled:hover:text-error-500"
        ]
      },
      {
        variant: "outlined",
        color: "neutral",
        class: [
          "text-gray-400 border-gray-400 bg-transparent",
          "hover:bg-gray-500 hover:text-white",
          "active:text-white active:bg-gray-300",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-400"
        ]
      },
      {
        variant: "outlined",
        color: "primary",
        class: [
          "text-primary-500 border-primary-500 bg-transparent",
          "hover:bg-primary-400 hover:text-white",
          "active:text-white active:bg-primary-600",
          "disabled:cursor-not-allowed disabled:opacity-50  disabled:hover:bg-transparent disabled:hover:text-primary-500"
        ]
      },
      {
        variant: "outlined",
        color: "success",
        class: [
          "text-success-500 border-success-500 bg-transparent",
          "hover:bg-success-400 hover:text-white",
          "active:text-white active:bg-success-600",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-success-500"
        ]
      },
      {
        variant: "outlined",
        color: "warning",
        class: [
          "text-warning-500 border-warning-500 bg-transparent",
          "hover:bg-warning-400 hover:text-white",
          "active:text-white active:bg-warning-600",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-warning-500"
        ]
      },
      {
        variant: "outlined",
        color: "error",
        class: [
          "text-error-500 border-error-500 bg-transparent",
          "hover:bg-error-400 hover:text-white",
          "active:text-white active:bg-error-600",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-error-500"
        ]
      }
    ]
  }
);
