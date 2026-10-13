import { cn } from "../lib/utils";

const noise = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
);

export interface GrainProps {
  className?: string;
}

export function Grain({ className }: GrainProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 z-40 opacity-[0.06] select-none", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,${noise}")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}
