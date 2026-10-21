import type { StackIconProps } from "./icon";

export const huskyHex = "#FFFFFF";

export function HuskyIcon({ title = "Husky", size = 24, ...props }: StackIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <title>{title}</title>
      <text
        x="12"
        y="20"
        fontSize="21"
        textAnchor="middle"
        className="[filter:grayscale(1)_brightness(1.6)] transition-[filter] duration-200 group-hover/tile:[filter:none]"
      >
        🐶
      </text>
    </svg>
  );
}
