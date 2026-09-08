import { Button } from "@folio/ui";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground p-10">
      <h1 className="text-3xl font-bold">folio — Tailwind + shadcn + Lenis OK</h1>
      <p className="mt-2 text-zinc-400">Next.js 16 + React 19 + Turborepo + Tailwind 4</p>
      <div className="mt-6 flex gap-3">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <p className="mt-6 text-sm text-zinc-500">Scroll to test Lenis smooth (add more content in Phase 2)</p>
      <div className="h-screen" />
      <p className="text-zinc-500">Lenis end</p>
    </main>
  );
}
