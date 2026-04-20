import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import { motion } from "motion/react";
import { ShieldCheck, TrendingUp } from "lucide-react";

function TrustSection() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <span className="text-sm font-bold text-brand-primary uppercase tracking-widest">
              1.2M+ Insights Delivered Daily
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-brand-secondary">
              Sentra is the connective tissue for industry leaders who demand
              precision. Our platform handles the complexity of global marketing
              spends while maintaining the auditing rigor required by CFOs.
            </h2>

            <div className="mt-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-50 p-2 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Real-time Twitter/X API Integration
                  </h4>
                  <p className="text-sm text-slate-600">
                    Monitor conversion triggers from social signals.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-cyan-50 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    YouTube Content Performance Finance
                  </h4>
                  <p className="text-sm text-slate-600">
                    Automated creator payout calculations based on live views.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <motion.div
              whileHover={{ x: 10 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <h5 className="font-bold text-brand-secondary">Sarah Chen</h5>
                  <p className="text-xs text-slate-500 uppercase">
                    CFO at NexaMedia
                  </p>
                </div>
              </div>
              <p className="italic text-slate-700 leading-relaxed">
                "Sentra reduced our month-end closing time by 40%. The marketing
                team finally sees the same numbers we do."
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-brand-secondary rounded-3xl p-8 text-white flex flex-col justify-end h-48">
                <p className="text-3xl font-bold">99.9%</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">
                  Uptime on live data sync
                </p>
              </div>

              <div className="rounded-3xl flex items-center justify-center h-48 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/19891028/pexels-photo-19891028.jpeg"
                  alt="Abstract Tech"
                  className="h-auto w-auto object-cover rounded-lg "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen selection:bg-cyan-200 selection:text-cyan-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TrustSection />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
