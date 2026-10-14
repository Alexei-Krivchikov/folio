import type * as React from "react";
import { cn } from "../lib/utils";

export interface HudLabelProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function HudLabel({ as: Component = "span", className, children, ...props }: HudLabelProps) {
  return (
    <Component className={cn("font-mono text-xs uppercase tracking-[0.2em] text-muted", className)} {...props}>
      {children}
    </Component>
  );
}
