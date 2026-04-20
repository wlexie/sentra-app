import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-inset ring-slate-200">
                VERSION 2.0 IS LIVE
              </span>
              <h1 className="mt-4 text-5xl font-bold leading-[1.1] text-brand-secondary lg:text-7xl">
                Unified <br />
                <span className="text-brand-primary">Intelligence</span> for
                Marketing & Finance
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-lg">
                Stop juggling disconnected spreadsheets. Sentra bridges the gap
                between creative growth and fiscal precision with an automated,
                AI-driven operations platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="group flex items-center gap-2 rounded-md bg-brand-primary px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand-primary/90">
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50">
                Watch Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl border-8 border-slate-100 bg-brand-secondary/95 p-1 shadow-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://picsum.photos/seed/dashboard/1200/900"
                alt="Sentra Dashboard UI"
                className="w-full h-full object-cover rounded-xl opacity-80 mix-blend-overlay"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary/40 to-transparent" />

              {/* Mock UI Elements */}
              <div className="absolute left-6 top-6 right-6">
                <div className="h-1.5 w-1/3 rounded-full bg-white/20 mb-8" />
                <div className="space-y-4">
                  <div className="h-4 w-full rounded-full bg-cyan-400/20" />
                  <div className="h-4 w-3/4 rounded-full bg-cyan-400/20" />
                </div>
              </div>

              <div className="absolute right-12 bottom-12 h-24 w-24 rounded-full border-8 border-cyan-400/30 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin-slow" />
              </div>
            </div>

            {/* Background blobs */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-primary/5 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
