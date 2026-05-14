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
  Megaphone,
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
import { QuoteDetailModal } from "./QuoteDetailModal";

// --- Stats Cards ---

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
      <div className="bg-[#0F172A] p-8 rounded-[32px] text-white shadow-2xl flex flex-col justify-between h-48 border border-slate-800">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-slate-400">
            {label}
          </p>
          <h4 className="text-4xl font-extrabold mt-3 tracking-tight">
            {value}
          </h4>
        </div>
        <p className="text-xs font-bold text-slate-400 leading-relaxed tracking-tight">
          {subtext}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between h-48 relative overflow-hidden transition-all hover:shadow-md">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${label === "ROAS" ? "bg-[#006677]" : "bg-transparent"}`}
      />
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-slate-400">
          {label}
        </p>
        <h4 className="text-4xl font-extrabold mt-3 tracking-tight text-[#0F172A]">
          {value}
        </h4>
      </div>
      <div className="flex items-center gap-2 mt-auto">
        {label === "TOTAL SPEND" ? (
          <>
            <TrendingUp className="h-4 w-4 text-[#006677]" />
            <span className="text-[11px] font-extrabold text-[#006677] uppercase tracking-wider">
              {subtext}
            </span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4 text-teal-500" />
            <span className="text-[11px] font-extrabold text-teal-500 uppercase tracking-wider">
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
    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex-1">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
            Twitter/X Live Velocity
          </h3>
          <p className="text-sm font-medium text-slate-400 mt-1">
            Real-time engagement density
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-[#EBF5F7] text-[#006677] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-widest border border-[#006677]/10">
            Live Stream
          </span>
          <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-300 hover:text-slate-600 transition-all cursor-pointer">
            <MoreHorizontal className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 6 ? "#0F172A" : "#E2E8F0"}
                />
              ))}
            </Bar>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "24px",
                border: "none",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-10 pt-10 border-t border-slate-50">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-slate-300 text-center">
            Impressions
          </p>
          <p className="text-2xl font-extrabold text-[#0F172A] mt-2 text-center">
            842.1K
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-slate-300 text-center">
            Rate
          </p>
          <p className="text-2xl font-extrabold text-[#0F172A] mt-2 text-center">
            5.2%
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-slate-300 text-center">
            Sentiment
          </p>
          <p className="text-lg font-extrabold text-teal-500 mt-2 text-center">
            POSITIVE
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Social Integrations ---

export function SocialIntegrations() {
  return (
    <div className="w-[380px] bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
      <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight mb-8">
        Channels
      </h3>

      <div className="space-y-4">
        <IntegrationItem
          name="Meta Business"
          status="Connected"
          connected
          icon={
            <div className="bg-[#1877F2] h-10 w-10 rounded-2xl flex items-center justify-center text-white">
              <div className="font-bold text-xl">f</div>
            </div>
          }
        />
        <IntegrationItem
          name="TikTok Ads"
          status="Connected"
          connected
          icon={
            <div className="bg-black h-10 w-10 rounded-2xl flex items-center justify-center text-white p-2.5">
              <div className="h-full w-full border-2 border-white rounded-sm" />
            </div>
          }
        />
        <IntegrationItem name="LinkedIn" status="Not Linked" />
        <IntegrationItem name="Snapchat" status="Not Linked" />
      </div>

      <button className="w-full mt-10 bg-slate-50 text-slate-500 py-4 rounded-2xl text-sm font-extrabold hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100">
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
    <div className="p-5 rounded-3xl border border-slate-50 bg-[#F8FAFB] flex items-center justify-between group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-100">
      <div className="flex items-center gap-4">
        {icon || (
          <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center text-slate-300 shadow-sm">
            <Link2 className="h-5 w-5" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-extrabold text-[#0F172A] tracking-tight">
            {name}
          </h4>
          <p
            className={`text-[10px] font-extrabold uppercase tracking-widest mt-0.5 ${connected ? "text-teal-500" : "text-slate-400"}`}
          >
            {status}
          </p>
        </div>
      </div>

      {connected ? (
        <button className="h-10 w-10 flex items-center justify-center text-slate-300 hover:text-slate-600 transition-colors">
          <Settings className="h-5 w-5" />
        </button>
      ) : (
        <button className="text-[11px] font-extrabold uppercase text-[#006677] hover:underline tracking-widest">
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
  const displayQuotes = data || [];

  return (
    <>
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mt-8">
        <div className="p-10 flex justify-between items-center border-b border-slate-50">
          <div>
            <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              Active Deliverables
            </h3>
            <p className="text-xs font-medium text-slate-400 mt-1">
              Live tracking of cross-channel campaign specs.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <Search className="h-5 w-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="text"
                placeholder="Search specs..."
                className="w-full pl-14 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>
            <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-300 hover:text-slate-600 transition-all shadow-sm">
              <MoreHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {displayQuotes.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-10 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                    UID
                  </th>
                  <th className="px-10 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                    Entity Name
                  </th>
                  <th className="px-10 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                    Deliverables
                  </th>
                  <th className="px-10 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                    Budget
                  </th>
                  <th className="px-10 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                    Status
                  </th>
                  <th className="px-10 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {displayQuotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-10 py-6 text-xs font-bold text-slate-400 truncate max-w-[100px]">
                      {quote.id}
                    </td>
                    <td className="px-10 py-6 text-sm font-extrabold text-[#0F172A] tracking-tight">
                      {quote.campaignName}
                    </td>
                    <td className="px-10 py-6 text-xs font-bold text-slate-500 truncate max-w-[200px]">
                      {quote.deliverables}
                    </td>
                    <td className="px-10 py-6 text-sm font-extrabold text-[#0F172A] tracking-tight">
                      ${(quote.budgetEstimate || 0).toLocaleString()}
                    </td>
                    <td className="px-10 py-6">
                      <span
                        className={`
                        px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest
                        ${quote.status?.toLowerCase() === "approved" ? "bg-teal-50 text-teal-600" : "bg-blue-50 text-blue-600"}
                      `}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-6 transition-opacity">
                        <button
                          onClick={() => setSelectedQuote(quote)}
                          className="flex items-center gap-2 text-[11px] font-extrabold uppercase text-[#006677] hover:underline"
                        >
                          <Sparkles className="h-4 w-4" />
                          Review AI
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-20 text-center flex flex-col items-center">
              <div className="h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
                <Megaphone className="h-8 w-8" />
              </div>
              <p className="text-slate-400 font-bold text-[10px] tracking-tight uppercase tracking-[0.25em]">
                No platform activity detected
              </p>
              <p className="text-xs text-slate-300 mt-2">
                Active campaigns will manifest here.
              </p>
            </div>
          )}
        </div>

        <button className="w-full py-6 text-sm font-extrabold text-slate-400 hover:text-[#0F172A] border-t border-slate-50 bg-[#FDFDFD] hover:bg-white transition-all flex items-center justify-center gap-3">
          Explore Historical Ledger
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
