import { Search, Bell, Settings, ChevronDown } from "lucide-react";
// import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const navLinks = ["Solutions", "Platform", "Pricing", "Resources"];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Sentra logo" className="w-8 h-8" />
            <span className="text-2xl font-bold tracking-tighter text-brand-secondary">
              Sentra
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-brand-primary"
              >
                {link}
                {(link === "Solutions" || link === "Resources") && (
                  <ChevronDown className="h-4 w-4" />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>

          <button className="rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-primary/90 active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
