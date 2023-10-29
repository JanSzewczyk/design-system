import { cva } from "class-variance-authority";

export const buttonCva = cva(
  [
    "inline-flex items-center justify-center align-middle no-underline transition-colors ease-in-out duration-300",
    "font-sans appearance-none select-none rounded-sm border font-medium tracking-[.02857em]",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
  ],
  {
    variants: {
      fullWidth: {
        true: "w-full"
      },
      color: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        error: ""
      },
      size: {
        sm: "px-2.5 py-1 text-[.8125rem] leading-4",
        md: "px-4 py-1.5 text-sm leading-5",
        lg: "px-5 py-2 text-[.9375rem] leading-6"
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
          "hover:border-gray-100 hover:bg-gray-100 hover:text-black",
          "active:border-gray-200 active:bg-gray-200"
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
        class: [
          "text-gray-100 border-gray-100",
          "hover:bg-gray-100 hover:text-black",
          "active:text-gray-600 active:bg-gray-200"
        ]
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
          "border-gray-100 bg-gray-100 text-black",
          "hover:border-white hover:bg-white",
          "active:border-gray-200 active:bg-gray-200"
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
      fullWidth: false,
      color: "primary",
      size: "md",
      variant: "text"
    }
  }
);

export const iconContainerCva = cva("", {
  variants: {
    site: {
      left: "",
      right: ""
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  },
  compoundVariants: [
    // ---------- LEFT ---------- //
    {
      site: "left",
      size: "sm",
      class: "-ml-0.5 mr-1.5"
    },
    {
      site: "left",
      size: "md",
      class: "-ml-1 mr-2"
    },
    {
      site: "left",
      size: "lg",
      class: "-ml-1.5 mr-2.5"
    },

    // ---------- RIGHT ---------- //
    {
      site: "right",
      size: "sm",
      class: "-mr-0.5 ml-1.5"
    },
    {
      site: "right",
      size: "md",
      class: "-mr-1 ml-2"
    },
    {
      site: "right",
      size: "lg",
      class: "-mr-1.5 ml-2.5"
    }
  ],
  defaultVariants: {
    site: "left",
    size: "md"
  }
});

export const iconCva = cva("", {
  variants: {
    loading: {
      true: "motion-reduce:hidden animate-spin"
    },
    size: {
      sm: "h-4.5 w-4.5",
      md: "h-5 w-5",
      lg: "h-5.5 w-5.5"
    }
  },
  defaultVariants: {
    loading: false,
    size: "md"
  }
});
