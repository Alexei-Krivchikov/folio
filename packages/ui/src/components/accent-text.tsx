import type * as React from "react";
import { cn } from "../lib/utils";

export type AccentTextProps = React.HTMLAttributes<HTMLElement>;

export function AccentText({ className, children, ...props }: AccentTextProps) {
  return (
    <em className={cn("font-serif italic font-normal", className)} {...props}>
      {children}
    </em>
  );
}
