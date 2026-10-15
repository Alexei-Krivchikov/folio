import type * as React from "react";
import { cn } from "../lib/utils";
import { HudLabel } from "./hud-label";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  label: string;
  as?: "h1" | "h2" | "h3" | "h4";
  labelClassName?: string;
}

export function SectionHeading({
  label,
  as: Heading = "h2",
  className,
  labelClassName,
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <>
      <HudLabel className={cn("mb-4 block", labelClassName)}>{label}</HudLabel>
      <Heading
        className={cn("text-3xl font-semibold tracking-tight text-foreground md:text-5xl", className)}
        {...props}
      >
        {children}
      </Heading>
    </>
  );
}
