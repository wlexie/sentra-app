import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$499",
    period: "/mo",
    features: [
      "Up to 5 Admins",
      "Campaign Tracking",
      "Social Integration (1 platform)",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$1,299",
    period: "/mo",
    features: [
      "Unlimited Clients",
      "Full Quoting Engine",
      "Omnichannel Live Data",
      "Advanced Reporting",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Custom SSO & Security",
      "API White-labeling",
      "Dedicated Account Lead",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-secondary">
            Scale with Confidence
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Transparent pricing for organizations that value clarity.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl transition-all hover:shadow-xl",
                plan.popular
                  ? "bg-brand-secondary text-white ring-4 ring-brand-primary/20 scale-105 z-10"
                  : "bg-white border border-slate-100 text-slate-900",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.popular ? "text-slate-400" : "text-slate-500",
                    )}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="mb-10 space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={cn(
                        "h-5 w-5 shrink-0",
                        plan.popular ? "text-cyan-400" : "text-brand-primary",
                      )}
                    />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full rounded-md px-4 py-3 text-sm font-bold transition-all",
                  plan.popular
                    ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                    : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100",
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
