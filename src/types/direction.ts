export const Direction = {
  LTR: "ltr",
  RTL: "rtl"
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];
