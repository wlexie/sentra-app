import React from "react";
import { TrendingUp, CheckCircle2, MoreHorizontal, Plus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// --- Admin Stats Grid ---

export function AdminStatCard({
  label,
  value,
  subtext,
  trend,
  icon: Icon,
  badge,
}: {
  label: string;
  value: string;
  subtext: string;
  trend?: string;
  icon: any;
  badge?: string;
}) {
  const isAccent = label === "CLIENT GROWTH";

  return (
    <div
      className={`p-8 rounded-[40px] shadow-sm border transition-all h-[240px] flex flex-col justify-between ${isAccent ? "bg-[#0F172A] border-slate-800 text-white shadow-2xl shadow-slate-900/40" : "bg-white border-slate-100 text-slate-900"}`}
    >
      <div className="flex justify-between items-start">
        <div
          className={`h-14 w-14 rounded-2xl flex items-center justify-center ${isAccent ? "bg-slate-800 text-brand-primary" : "bg-slate-50 text-[#006677]"}`}
        >
          <Icon className="h-7 w-7" />
        </div>
      </div>

      <div className="mt-6">
        <p
          className={`text-[11px] uppercase tracking-[0.25em] font-extrabold mb-1.5 ${isAccent ? "text-slate-400" : "text-slate-400"}`}
        >
          {label}
        </p>
        <h4 className="text-4xl font-extrabold tracking-tight">{value}</h4>
      </div>

      <div className="mt-auto flex items-center gap-3">
        {badge ? (
          <span className="bg-[#EBF5F7] text-[#006677] text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-widest">
            {badge}
          </span>
        ) : trend ? (
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#006677] tracking-tight">
            <TrendingUp className="h-3.5 w-3.5" />
            {trend}
          </div>
        ) : (
          <p className="text-xs font-bold text-slate-300 tracking-tight">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

// --- Platform Performance Chart ---

const performanceData = [
  { name: "JAN", revenue: 45, volume: 30 },
  { name: "FEB", revenue: 52, volume: 35 },
  { name: "MAR", revenue: 48, volume: 32 },
  { name: "APR", revenue: 75, volume: 55 },
  { name: "MAY", revenue: 65, volume: 45 },
  { name: "JUN", revenue: 70, volume: 50 },
];

export function PlatformPerformanceChart() {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex-1 h-full">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Platform Performance
          </h3>
          <p className="text-sm font-medium text-slate-400 mt-1">
            Monthly revenue vs. campaign volume
          </p>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          <button className="px-6 py-2 text-xs font-extrabold rounded-xl bg-white text-[#0F172A] shadow-lg shadow-slate-200/50">
            Revenue
          </button>
          <button className="px-6 py-2 text-xs font-extrabold rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
            Volume
          </button>
        </div>
      </div>

      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={performanceData}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            barGap={14}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 800, fill: "#CBD5E1" }}
              dy={20}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "#F8FAFC" }}
              contentStyle={{
                borderRadius: "24px",
                border: "none",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="revenue" radius={[8, 8, 0, 0]} barSize={28}>
              {performanceData.map((entry, index) => (
                <Cell
                  key={`cell-rev-${index}`}
                  fill={index === 3 ? "#0F172A" : "#E2E8F0"}
                />
              ))}
            </Bar>
            <Bar dataKey="volume" radius={[8, 8, 0, 0]} barSize={28}>
              {performanceData.map((entry, index) => (
                <Cell
                  key={`cell-vol-${index}`}
                  fill={index === 3 ? "#006677" : "#F1F5F9"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// --- Side Widgets ---

export function PrecisionAuditPanel() {
  return (
    <div className="bg-[#E0E7FF] p-10 rounded-[40px] relative overflow-hidden flex flex-col justify-between h-[250px]">
      <div className="relative z-10">
        <h4 className="text-xl font-extrabold text-[#312E81] tracking-tight">
          Precision Audit
        </h4>
        <p className="text-sm font-medium text-[#4338CA]/70 mt-3 leading-relaxed max-w-[200px]">
          System-wide data consistency check completed. No anomalies found.
        </p>
      </div>

      <div className="mt-8 flex justify-between items-center relative z-10">
        <button className="bg-[#312E81] text-white px-6 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-900/20 hover:bg-[#312E81]/90 transition-all active:scale-95">
          Review AI
        </button>
        <div className="h-8 w-8 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center text-[#312E81] border border-[#312E81]/10">
          <CheckCircle2 className="h-5 w-5" />
        </div>
      </div>

      {/* Shapes */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20" />
    </div>
  );
}

export function QuickInsights() {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex-1">
      <h4 className="text-xl font-extrabold text-slate-900 tracking-tight mb-8">
        Quick Insights
      </h4>
      <div className="space-y-6">
        <InsightItem color="bg-teal-500" label="Meta Ads API Sync: Optimal" />
        <InsightItem color="bg-[#0F172A]" label="Avg. CPC: $0.42" />
        <InsightItem color="bg-[#EF4444]" label="Unallocated Funds: $12,400" />
      </div>
    </div>
  );
}

function InsightItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`h-2.5 w-2.5 rounded-full ${color} shadow-sm`} />
      <span className="text-sm font-extrabold text-slate-600 tracking-tight">
        {label}
      </span>
    </div>
  );
}

// --- Client Management Table ---

export function ClientManagementTable({
  data = [],
  onViewCampaigns,
}: {
  data?: any[];
  onViewCampaigns?: (id: string) => void;
}) {
  const displayData =
    data.length > 0
      ? data
      : [
          {
            id: "1",
            fullName: "Velocity Retail",
            companyName: "Velocity Retail",
            spend: "$142,500",
            activity: "2 hours ago: Campaign update",
          },
          {
            id: "2",
            fullName: "Neo Bank Int.",
            companyName: "Neo Bank Int.",
            spend: "$89,200",
            activity: "6 hours ago: Monthly Audit",
          },
          {
            id: "3",
            fullName: "Glow Skincare",
            companyName: "Glow Skincare",
            spend: "$0.00",
            activity: "Yesterday: Quote requested",
          },
          {
            id: "4",
            fullName: "Aero Logistics",
            companyName: "Aero Logistics",
            spend: "$210,000",
            activity: "2 days ago: Optimization run",
          },
        ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mt-12">
      <div className="px-8 py-6 flex justify-between items-center border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Client Management
        </h3>
        <button className="text-xs font-bold text-[#006677] hover:underline flex items-center gap-2">
          View All Clients
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Client Name
              </th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Status
              </th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Spend (MTD)
              </th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Recent Activity
              </th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {displayData.map((client, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                      {(client.companyName || client.fullName || "?").charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {client.companyName || client.fullName}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                      client.spend !== "$0.00"
                        ? "bg-[#EBF5F7] text-[#006677]"
                        : "bg-[#F2F3F8] text-[#5C667E]"
                    }`}
                  >
                    {client.spend !== "$0.00" ? "Active" : "Pending"}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-bold text-slate-900">
                  {client.spend || "$0.00"}
                </td>
                <td className="px-8 py-5 text-sm text-slate-400">
                  {client.activity || "No recent activity"}
                </td>
                <td className="px-8 py-5 text-right font-medium">
                  <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onViewCampaigns?.(client.id)}
                      className="text-xs font-bold text-[#006677] hover:underline uppercase tracking-widest"
                    >
                      View Campaigns
                    </button>
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
