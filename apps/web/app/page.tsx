import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Experience } from "@/components/experience/experience";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { AnchorScroll } from "@/components/navigation/anchor-scroll";
import { Header } from "@/components/navigation/header";
import { Projects } from "@/components/projects/projects";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnchorScroll />
      <Header />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
