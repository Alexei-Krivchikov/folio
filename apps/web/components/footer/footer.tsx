export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col items-center justify-between gap-3 border-t border-zinc-800 pt-6 text-xs text-zinc-500 md:flex-row">
        <p>© {new Date().getFullYear()} Alexei Krivchikov. All rights reserved.</p>
        <p className="text-zinc-600">Built with Next.js · Tailwind · Motion</p>
      </div>
    </footer>
  );
}
