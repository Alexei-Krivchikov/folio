import { Children, type CSSProperties, type ReactNode } from "react";
import { cn } from "../lib/utils";

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  duration?: number;
}

const PAUSED =
  "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]";

export function Marquee({ children, className, itemClassName = "px-6", duration = 50 }: MarqueeProps) {
  const items = Children.map(children, (child) => <li className={cn("shrink-0", itemClassName)}>{child}</li>);

  return (
    <div
      className={cn(
        "group/marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] motion-reduce:[mask-image:none]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max animate-marquee will-change-transform motion-reduce:w-full motion-reduce:animate-none",
          PAUSED,
        )}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <ul className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:shrink">{items}</ul>
        <ul aria-hidden="true" inert className="flex shrink-0 items-center motion-reduce:hidden">
          {items}
        </ul>
      </div>
    </div>
  );
}
