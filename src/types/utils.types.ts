import * as React from "react";

export type AsProp<C extends React.ElementType> = {
  /**
   * Defines HTML tag to be used for component
   */
  as?: C;
};

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is the type for the "ref" only
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];

export type OmitStylesProps<T extends React.ElementType> = Omit<T, "className" | "style">;
