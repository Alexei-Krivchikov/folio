import { About } from "@/components/about/about";
import { Hero } from "@/components/hero/hero";
import { Stack } from "@/components/stack/stack";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Stack />
    </main>
  );
}
