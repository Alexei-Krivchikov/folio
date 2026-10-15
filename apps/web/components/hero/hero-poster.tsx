const poster = [
  "radial-gradient(60% 55% at 78% 18%, color-mix(in srgb, var(--accent-to) 30%, transparent), transparent 72%)",
  "radial-gradient(55% 50% at 14% 88%, color-mix(in srgb, var(--accent-from) 20%, transparent), transparent 72%)",
  "linear-gradient(to bottom, transparent 70%, var(--background))",
  "var(--background)",
].join(", ");

export function HeroPoster() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: poster }} />
  );
}
