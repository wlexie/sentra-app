// import { motion } from "motion/react";
import {
  Users,
  FileText,
  Smartphone,
  Network,
  ExternalLink,
  PlaySquare,
  Share2,
} from "lucide-react";
// import { cn } from "@/src/lib/utils";

export default function Features() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            Architected for Precision
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            One platform to rule your entire pipeline—from the first lead to the
            final invoice.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Unified Auth */}
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 flex flex-col justify-between h-full">
            <div>
              <div className="bg-slate-50 w-fit p-3 rounded-xl mb-6">
                <Users className="h-6 w-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-secondary">
                Unified Client & Admin Auth
              </h3>
              <p className="mt-4 text-slate-600">
                Secure, role-based access control for both your internal finance
                teams and external marketing clients. Seamlessly toggle between
                perspectives.
              </p>
            </div>
            <div className="mt-8 rounded-xl bg-slate-50 p-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-brand-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Marketing Lead
                </p>
                <p className="text-xs text-slate-500">
                  Access: Campaign Tracking
                </p>
                <div className="mt-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-brand-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Instant Quote */}
          <div className="rounded-3xl bg-brand-secondary p-8 shadow-sm border border-slate-800 flex flex-col justify-between text-white py-12">
            <div>
              <div className="bg-white/10 w-fit p-3 rounded-xl mb-6">
                <FileText className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold">Instant Quote Generation</h3>
              <p className="mt-4 text-slate-400">
                Turn marketing proposals into financial realities. Generate
                complex, line-item quotes in seconds using real-time resource
                data.
              </p>
            </div>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 text-cyan-400 font-semibold hover:underline"
            >
              Explore quoting engine <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Campaign Tracking */}
          <div className="rounded-3xl bg-white p-0 shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <div className="bg-slate-50 w-fit p-3 rounded-xl mb-6">
                <Network className="h-6 w-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-secondary">
                Campaign Tracking
              </h3>
              <p className="mt-4 text-slate-600">
                Live performance data integrated with your P&L. See the exact
                ROI of every marketing dollar spent.
              </p>
            </div>
            <div className="bg-slate-200 md:w-1/2 relative h-64 md:h-auto">
              <img
                src="https://picsum.photos/seed/tracking/600/600"
                alt="Campaign Tracking UI"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-secondary/20" />
            </div>
          </div>

          {/* Omnichannel */}
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-brand-secondary">
                Omnichannel Integration
              </h3>
              <p className="mt-4 text-slate-600">
                Pull live feed data from Twitter/X, YouTube, and LinkedIn
                directly into your financial forecasts. Social sentiment meets
                fiscal reality.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-end gap-3">
              <div className="p-3 bg-slate-50 rounded-lg text-slate-400">
                <PlaySquare className="h-6 w-6" />
              </div>
              <div className="p-3 bg-slate-50 rounded-lg text-slate-400">
                <Share2 className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
