import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Experience } from "@/components/experience/experience";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { AnchorScroll } from "@/components/navigation/anchor-scroll";
import { Projects } from "@/components/projects/projects";
import { Stack } from "@/components/stack/stack";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnchorScroll />
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
