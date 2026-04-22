import React, { useState } from "react";
import {
  TrendingUp,
  CheckCircle2,
  MoreHorizontal,
  Settings,
  Link2,
  Search,
  Eye,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { QuoteDetailModal } from "./QuoteModal";

//  Stats Cards

export function StatCard({
  label,
  value,
  subtext,
  accent = false,
}: {
  label: string;
  value: string;
  subtext: string;
  accent?: boolean;
}) {
  if (accent) {
    return (
      <div className="bg-[#0D1B2A] p-6 rounded-xl text-white shadow-xl flex flex-col justify-between h-40">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            {label}
          </p>
          <h4 className="text-2xl font-bold mt-2 tracking-tight">{value}</h4>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{subtext}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-40 relative overflow-hidden">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${label === "ROAS" ? "bg-[#006677]" : "bg-transparent"}`}
      />
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
          {label}
        </p>
        <h4 className="text-3xl font-bold mt-2 tracking-tight text-slate-900">
          {value}
        </h4>
      </div>
      <div className="flex items-center gap-1.5 mt-auto">
        {label === "TOTAL SPEND" ? (
          <>
            <TrendingUp className="h-3 w-3 text-brand-primary" />
            <span className="text-[10px] font-bold text-brand-primary uppercase">
              {subtext}
            </span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-3 w-3 text-[#006677]" />
            <span className="text-[10px] font-bold text-[#006677] uppercase">
              {subtext}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// --- Velocity Chart ---

const chartData = [
  { name: "Jan", value: 25 },
  { name: "Feb", value: 45 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 65 },
  { name: "May", value: 40 },
  { name: "Jun", value: 55 },
  { name: "Jul", value: 75 },
];

export function VelocityChart() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex-1">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Twitter/X Live Velocity
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time engagement density across active threads
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-[#EBF5F7] text-[#006677] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            Live
          </span>
          <MoreHorizontal className="h-5 w-5 text-slate-300 cursor-pointer" />
        </div>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
          >
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 6 ? "#0D1B2A" : "#A8D2D9"}
                  fillOpacity={index === 6 ? 1 : 0.6}
                />
              ))}
            </Bar>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-6 pt-6 border-t">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            Impressions
          </p>
          <p className="text-xl font-bold text-slate-900 mt-1">842.1K</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            Engagement Rate
          </p>
          <p className="text-xl font-bold text-slate-900 mt-1">5.2%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            Sentiment
          </p>
          <p className="text-xl font-bold text-slate-900 mt-1 italic">
            Highly Positive
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Social Integrations ---

export function SocialIntegrations() {
  return (
    <div className="w-85 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-6">
        Social Integration
      </h3>

      <div className="space-y-4">
        <IntegrationItem
          name="Meta Business"
          status="Connected"
          connected
          icon={
            <div className="bg-slate-900 h-8 w-8 rounded flex items-center justify-center">
              <div className="h-4 w-4 bg-white rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-slate-900 rounded-full" />
              </div>
            </div>
          }
        />
        <IntegrationItem
          name="TikTok Ads"
          status="Connected"
          connected
          icon={
            <div className="bg-slate-900 h-8 w-8 rounded flex items-center justify-center p-1.5">
              <div className="h-full w-full border-2 border-white rounded-sm" />
            </div>
          }
        />
        <IntegrationItem name="LinkedIn" status="Not Linked" />
        <IntegrationItem name="Snapchat" status="Not Linked" />
      </div>

      <button className="w-full mt-8 bg-slate-100 text-slate-600 py-3 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">
        Manage All Channels
      </button>
    </div>
  );
}

function IntegrationItem({
  name,
  status,
  connected = false,
  icon,
}: {
  name: string;
  status: string;
  connected?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-xl border border-slate-50 bg-slate-50/50 flex items-center justify-between group transition-all hover:bg-white hover:shadow-sm hover:border-slate-100">
      <div className="flex items-center gap-3">
        {icon || (
          <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
            <Link2 className="h-4 w-4" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-bold text-slate-900">{name}</h4>
          <p
            className={`text-[10px] font-bold uppercase tracking-tight ${connected ? "text-[#00C853]" : "text-slate-400"}`}
          >
            {status}
          </p>
        </div>
      </div>

      {connected ? (
        <button className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-600">
          <Settings className="h-4 w-4" />
        </button>
      ) : (
        <button className="text-[10px] font-bold uppercase text-[#006677] hover:underline">
          Connect
        </button>
      )}
    </div>
  );
}

// --- Quotes Table ---

const placeholderQuotes = [
  {
    id: "#é -8812",
    campaignName: "Summer Solstice Blast",
    deliverables: "15 High-Res Creatives",
    budgetEstimate: 12400.0,
    status: "approved",
  },
  {
    id: "#é -8809",
    campaignName: "Tech Rebrand 2.0",
    deliverables: "Twitter Thread Strategy",
    budgetEstimate: 4200.0,
    status: "pending",
  },
  {
    id: "#é -8798",
    campaignName: "Influencer Outreach",
    deliverables: "30 Creator Agreements",
    budgetEstimate: 18950.0,
    status: "approved",
  },
];

export function QuotesTable({ data }: { data?: any[] }) {
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const displayQuotes = data && data.length > 0 ? data : placeholderQuotes;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/30">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Recent Generated Quotes
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="text"
                placeholder="Search quotes..."
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-200 transition-all w-64"
              />
            </div>
            <button className="p-2 bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Quote ID
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Campaign Name
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Deliverable
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Budget Estimate
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayQuotes.map((quote) => (
              <tr
                key={quote.id}
                className="border-b last:border-b-0 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-xs font-medium text-slate-500 truncate max-w-25">
                  {quote.id}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  {quote.campaignName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-50">
                  {quote.deliverables}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  ${(quote.budgetEstimate || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`
                    px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight
                    ${quote.status?.toLowerCase() === "approved" ? "bg-[#E8F5E9] text-[#2E7D32]" : "bg-[#E3F2FD] text-[#1565C0]"}
                  `}
                  >
                    {quote.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {quote.status?.toLowerCase() === "approved" ? (
                      <button
                        onClick={() => setSelectedQuote(quote)}
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#006677] hover:underline transition-all"
                      >
                        <Eye className="h-3 w-3" />
                        View Specs
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setSelectedQuote(quote)}
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#006677] hover:underline transition-all"
                        >
                          <Sparkles className="h-3 w-3" />
                          Review AI
                        </button>
                        <button className="text-[10px] font-bold uppercase text-slate-400 hover:text-slate-600 transition-all">
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="w-full py-4 text-sm font-bold text-slate-500 hover:text-slate-900 border-t bg-slate-50/10 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          View All Historical Quotes
          <TrendingUp className="h-4 w-4" />
        </button>
      </div>

      <QuoteDetailModal
        quote={selectedQuote}
        onClose={() => setSelectedQuote(null)}
      />
    </>
  );
}
