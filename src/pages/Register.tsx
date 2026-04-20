import { motion } from "motion/react";
import {
  User,
  Mail,
  Building2,
  Lock,
  Shield,
  Zap,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold tracking-tighter text-cyan-400/90">
        Sentra
      </span>
    </div>
  );
}

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
      {/* Dynamic Header */}
      <div className="flex h-16 items-center justify-between border-b bg-slate-100 px-8 lg:px-12">
        <Logo />
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-brand-primary"
          >
            Help <HelpCircle className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Panel: Narrative & Value Props */}
        <div className="relative hidden w-[45%] flex-col justify-center bg-slate-950 p-16 lg:flex">
          {/* Schematic Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none overflow-hidden">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mb-12 flex justify-center"
          >
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              {/* Visual anchor - abstracted building/future icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[70%] w-[40%] rounded-t-full border border-cyan-400/20 bg-gradient-to-b from-cyan-400/10 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[40%] w-[30%] rotate-45 border border-cyan-400/30 bg-cyan-400/5 blur-sm" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
              Architecting the <br />
              future of{" "}
              <span className="text-brand-primary">
                financial <br />
                precision.
              </span>
            </h1>
            <p className="mt-8 text-xl text-slate-400 leading-relaxed">
              Join an elite ecosystem of enterprises leveraging high-fidelity
              data structures and automated fiscal intelligence.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <Shield className="h-6 w-6 text-cyan-400 mb-4" />
              <h4 className="font-bold text-white">Enterprise Grade</h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Military-grade encryption and protocol standards.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <Zap className="h-6 w-6 text-cyan-400 mb-4" />
              <h4 className="font-bold text-white">Scale Velocity</h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Built to support global multi-entity operations.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Panel: Registration Form */}
        <div className="flex w-full flex-col justify-center bg-white px-8 py-12 lg:w-[55%] lg:px-24">
          <div className="mx-auto w-full max-w-lg">
            <div className="mb-10">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                Create Account
              </h2>
              <p className="mt-3 text-lg text-slate-500">
                Start your 14-day precision pilot program.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-900">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Alex Kamau"
                    className="h-14 w-full rounded-md border border-slate-100 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-900">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    className="h-14 w-full rounded-md border border-slate-100 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-900">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Kamau & Co. Ltd"
                    className="h-14 w-full rounded-md border border-slate-100 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-900">
                  Secure Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="h-14 w-full rounded-md border border-slate-100 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                  />
                </div>
                <p className="text-[10px] italic text-slate-400">
                  Must be at least 12 characters with a mix of symbols.
                </p>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-slate-600 leading-relaxed"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-bold text-brand-primary hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and acknowledge the{" "}
                  <a
                    href="#"
                    className="font-bold text-brand-primary hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  regarding my data processing.
                </label>
              </div>

              <button className="flex h-14 w-full items-center justify-center gap-2 rounded-md bg-brand-primary text-sm font-bold text-white transition-all hover:bg-brand-primary/90 active:scale-[0.98] shadow-xl shadow-brand-primary/20">
                Initialize Account <span>→</span>
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-slate-500">
              Already registered?{" "}
              <Link
                to="/login"
                className="font-bold text-brand-primary hover:underline"
              >
                Log in to your workspace
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Simplified Footer */}
      <div className="flex h-16 items-center justify-between border-t bg-white px-8 text-[11px] font-medium text-slate-400 uppercase tracking-widest lg:px-12">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-900">Sentra</span>
          <span>
            © 2026 Sentra Financial Technologies. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-600 transition-colors">
            Security
          </a>
          <a href="#" className="hover:text-slate-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-600 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-slate-600 transition-colors">
            Status
          </a>
        </div>
      </div>
    </div>
  );
}
