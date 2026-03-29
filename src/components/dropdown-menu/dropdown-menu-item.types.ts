export const DropdownMenuItemVariant = {
  DEFAULT: "default",
  ERROR: "error"
} as const;

export type DropdownMenuItemVariantType = (typeof DropdownMenuItemVariant)[keyof typeof DropdownMenuItemVariant];
