import type { StackIconProps } from "./icon";

export const motionHex = "#FFF312";

export function MotionIcon({ title = "Motion", color = "currentColor", size = 24, ...props }: StackIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color === "default" ? motionHex : color}
      viewBox="0 0 24 24"
      {...props}
    >
      <title>{title}</title>
      <path d="M2 4h20l-2.5 5H4.5z" />
      <path d="M4.5 10h15l-2.5 5H7z" />
      <path d="M7 16h10l-2.5 5H9.5z" />
    </svg>
  );
}
