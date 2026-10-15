export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row">
        <p>© {new Date().getFullYear()} Alexei Krivchikov. All rights reserved.</p>
        <p>Built with Next.js · Tailwind · Motion</p>
      </div>
    </footer>
  );
}
