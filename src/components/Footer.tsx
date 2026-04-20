import { Globe, Share2, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-secondary text-slate-400 py-20 border-t border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-1">
            <a
              href="/"
              className="text-2xl font-bold tracking-tighter text-white mb-6 block"
            >
              Sentra
            </a>
            <p className="text-sm leading-relaxed max-w-xs">
              Precision in every insight. We unify marketing performance with
              financial accountability for the modern enterprise.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              Product
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Platform
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs">
            © 2026 Sentra Technologies. All rights reserved. Precision is every
            insight.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              <Globe className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Share2 className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
