import { About } from "@/components/about/about";
import { Hero } from "@/components/hero/hero";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
    </main>
  );
}
