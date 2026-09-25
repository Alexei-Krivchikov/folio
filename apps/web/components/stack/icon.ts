import type { ComponentPropsWithoutRef, ComponentType } from "react";

export type StackIconProps = Omit<ComponentPropsWithoutRef<"svg">, "color"> & {
  title?: string;
  color?: string;
  size?: string | number;
};

export type StackIcon = ComponentType<StackIconProps>;
