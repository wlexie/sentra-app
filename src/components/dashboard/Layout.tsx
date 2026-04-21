import React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Megaphone,
  CreditCard,
  Users,
  Plus,
  LifeBuoy,
  User,
  Bell,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
}

export function Sidebar({ activeTab }: SidebarProps) {
  return (
    <aside className="w-64 border-r bg-white flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Sentra logo" className="w-8 h-8" />

          <h1 className="text-xl font-bold tracking-tight text-slate-900 italic">
            Sentra
          </h1>
        </div>

        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">
          Marketing & Finance
        </p>
      </div>

      <nav className="px-4 py-2 flex-1 space-y-1">
        <SidebarLink
          icon={<LayoutDashboard className="h-4 w-4" />}
          label="Overview"
          active={activeTab === "overview"}
        />
        <SidebarLink
          icon={<BarChart3 className="h-4 w-4" />}
          label="Analytics"
        />
        <SidebarLink
          icon={<Megaphone className="h-4 w-4" />}
          label="Campaigns"
        />
        <SidebarLink
          icon={<CreditCard className="h-4 w-4" />}
          label="Finance"
        />
        <SidebarLink icon={<Users className="h-4 w-4" />} label="Clients" />
      </nav>

      <div className="p-4 space-y-4">
        <button className="flex items-center justify-center gap-2 w-full bg-[#006677] text-white py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-[#006677]/20 hover:bg-[#005566] transition-all active:scale-95">
          <Plus className="h-4 w-4" />
          New Campaign
        </button>

        <div className="pt-4 border-t space-y-1">
          <SidebarLink
            icon={<LifeBuoy className="h-4 w-4" />}
            label="Support"
          />
          <SidebarLink icon={<User className="h-4 w-4" />} label="Account" />
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`
      flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-all
      ${
        active
          ? "bg-[#F0F7F9] text-[#006677] shadow-sm"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }
    `}
    >
      {icon}
      <span className="font-semibold">{label}</span>
      {active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#006677]" />
      )}
    </button>
  );
}

export function DashboardHeader({ userName }: { userName: string }) {
  return (
    <header className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Precision Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome back, {userName}. Your performance is tracking 12% above
          benchmark.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-400 hover:text-slate-600 shadow-sm">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-10 w-10 rounded-full bg-[#E5E7EB] border-2 border-white shadow-sm overflow-hidden bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')] bg-cover" />
      </div>
    </header>
  );
}
