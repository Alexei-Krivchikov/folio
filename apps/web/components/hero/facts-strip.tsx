import { HudLabel } from "@folio/ui";

const CAREER_START_YEAR = 2023;

type Fact = { value: string; label: string; note?: string };

export function FactsStrip() {
  const years = new Date().getFullYear() - CAREER_START_YEAR;

  const facts: Fact[] = [
    { value: String(years), label: "Years in production" },
    { value: "7,000+", label: "Active users on DominoCRM", note: "per domino-crm.com" },
    { value: "3 channels", label: "4 UI languages · Telegram, Web, VK" },
    { value: "UTC+3", label: "Time zone" },
  ];

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-6 md:grid-cols-4">
      {facts.map((fact) => (
        <li key={fact.label}>
          <p className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{fact.value}</p>
          <HudLabel as="p" className="mt-2 text-foreground/80">
            {fact.label}
          </HudLabel>
          {fact.note && <p className="mt-1 text-xs text-foreground/80">{fact.note}</p>}
        </li>
      ))}
    </ul>
  );
}
