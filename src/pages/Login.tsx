import { motion } from "motion/react";
import { Chrome } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold tracking-tighter text-cyan-400">
        Sentra
      </span>
    </div>
  );
}

const MicrosoftIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 23 23" fill="currentColor">
    <path d="M11.5 0h11.5v11.5H11.5z" fill="#f25022" />
    <path d="M0 0h11.5v11.5H0z" fill="#7fba00" />
    <path d="M11.5 11.5h11.5v11.5H11.5z" fill="#00a4ef" />
    <path d="M0 11.5h11.5v11.5H0z" fill="#ffb900" />
  </svg>
);

export default function Login() {
  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900">
      {/* Left Panel: Brand & Atmosphere */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-12 lg:flex">
        {/* Atmosphere Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/sentra-atmosphere/1200/1200?blur=10"
            alt="Background Atmosphere"
            className="h-full w-full object-cover opacity-20 transition-transform duration-10000 hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <Logo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <h1 className="text-6xl font-bold leading-tight tracking-tight text-white lg:text-7xl">
            Precision in every <br />
            insight.
          </h1>
          <p className="mt-8 max-w-md text-lg text-slate-400">
            Access the high-fidelity intelligence platform designed for the
            modern financial architect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 w-fit"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Platform Reliability
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">
                99.99<span className="text-cyan-400">%</span>
              </span>
            </div>
            <div className="mt-4 h-1 w-24 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "99.99%" }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="h-full bg-cyan-400"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex w-full flex-col justify-between bg-white px-8 py-12 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Welcome Back
            </h2>
            <p className="mt-3 text-slate-500">
              Please enter your credentials to access your workspace.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label
                className="text-xs font-bold uppercase tracking-widest text-slate-900"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative group">
                <input
                  id="email"
                  type="email"
                  placeholder="architect@sentra.io"
                  className="h-12 w-full rounded-md border border-slate-100 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="text-xs font-bold uppercase tracking-widest text-slate-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-brand-primary hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 w-full rounded-md border border-slate-100 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-slate-600 select-none"
              >
                Remember for 30 days
              </label>
            </div>

            <button className="h-12 w-full rounded-md bg-brand-primary text-sm font-bold text-white transition-all hover:bg-brand-primary/90 active:scale-[0.98] shadow-lg shadow-brand-primary/20">
              Sign In to Dashboard
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 font-bold tracking-widest text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex h-12 items-center justify-center gap-3 rounded-md border border-slate-100 bg-white transition-all hover:bg-slate-50">
                <Chrome className="h-5 w-5 text-[#4285F4]" />
                <span className="text-sm font-bold text-slate-700">Google</span>
              </button>
              <button className="flex h-12 items-center justify-center gap-3 rounded-md border border-slate-100 bg-white transition-all hover:bg-slate-50">
                <MicrosoftIcon />
                <span className="text-sm font-bold text-slate-700">
                  Microsoft
                </span>
              </button>
            </div>
          </form>

          <p className="mt-12 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-brand-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-sm items-center justify-between text-[11px] font-medium text-slate-400 uppercase tracking-widest">
          <p>© 2026 Sentra Financial Technologies. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
