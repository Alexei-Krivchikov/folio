import { HudLabel, LocalTime } from "@folio/ui";

const CAPTION = "tracking-[0.12em]";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 pt-8 pb-10">
      <div className="flex flex-col items-center gap-3 border-t border-border pt-6 text-center">
        <div className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-between md:text-left">
          <HudLabel as="p" className={CAPTION}>
            Local time <LocalTime utcOffset={3} className="text-foreground" /> UTC+3
          </HudLabel>
          <HudLabel as="p" className={CAPTION}>
            Built with Next.js · Tailwind · Motion · OGL · Lenis
          </HudLabel>
        </div>
        <HudLabel as="p" className={`${CAPTION} w-full md:text-left`}>
          © {new Date().getFullYear()} Alexei Krivchikov. All rights reserved.
        </HudLabel>
      </div>
    </footer>
  );
}
