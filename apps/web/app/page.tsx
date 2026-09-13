import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Experience } from "@/components/experience/experience";
import { Hero } from "@/components/hero/hero";
import { Stack } from "@/components/stack/stack";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Contact />
    </main>
  );
}
