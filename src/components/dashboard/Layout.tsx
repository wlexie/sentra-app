import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Megaphone,
  CreditCard,
  Users,
  Plus,
  LifeBuoy,
  User,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/src/lib/firebase";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewCampaign?: () => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
  onNewCampaign,
}: SidebarProps) {
  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/#");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <aside className="w-70 border-r border-[#E5E9EC] bg-white flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-white font-bold italic shadow-xl shadow-slate-900/10">
            S
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              Sentra Unified
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1.5">
              Marketing & Finance
            </p>
          </div>
        </div>
      </div>

      <nav className="px-5 py-4 flex-1 space-y-1.5">
        <SidebarLink
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Overview"
          active={activeTab === "overview"}
          onClick={() => onTabChange("overview")}
        />
        <SidebarLink
          icon={<BarChart3 className="h-5 w-5" />}
          label="Analytics"
          active={activeTab === "analytics"}
          onClick={() => onTabChange("analytics")}
        />
        <SidebarLink
          icon={<Megaphone className="h-5 w-5" />}
          label="Campaigns"
          active={activeTab === "campaigns"}
          onClick={() => onTabChange("campaigns")}
        />
        <SidebarLink
          icon={<CreditCard className="h-5 w-5" />}
          label="Finance"
          active={activeTab === "finance"}
          onClick={() => onTabChange("finance")}
        />
        <SidebarLink
          icon={<Users className="h-5 w-5" />}
          label="Clients"
          active={activeTab === "clients"}
          onClick={() => onTabChange("clients")}
        />
      </nav>

      <div className="p-6 space-y-4 pt-10 border-t border-slate-50">
        <button
          onClick={onNewCampaign}
          className="flex items-center justify-center gap-2.5 w-full bg-[#006677] text-white py-4 rounded-xl text-sm font-bold shadow-xl shadow-[#006677]/20 hover:bg-[#005566] transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          New Campaign
        </button>

        <div className="pt-6 space-y-1">
          <SidebarLink
            icon={<LifeBuoy className="h-5 w-5" />}
            label="Support"
          />

          <div className="space-y-1">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className={`
                flex items-center gap-4 w-full px-5 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200
                ${accountOpen ? "bg-slate-50 text-[#0F172A]" : "text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-50"}
              `}
            >
              <User className="h-5 w-5" />
              <span className="tracking-tight">Account</span>
              <div className="ml-auto">
                {accountOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </button>

            {accountOpen && (
              <div className="pl-12 space-y-1 animate-in slide-in-from-top-2 duration-200">
                <button className="flex items-center gap-3 w-full py-2 text-xs font-bold text-slate-400 hover:text-[#0F172A] transition-colors">
                  <Settings className="h-3.5 w-3.5" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full py-2 text-xs font-bold text-red-400 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
      flex items-center gap-4 w-full px-5 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200
      ${
        active
          ? "bg-[#F1F5F9] text-[#0F172A]"
          : "text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-50"
      }
    `}
    >
      {icon}
      <span className="tracking-tight">{label}</span>
      {active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#006677]" />
      )}
    </button>
  );
}

export function DashboardHeader({
  userName,
  role = "Platform Lead",
}: {
  userName: string;
  role?: string;
}) {
  return (
    <header className="flex justify-between items-center mb-8 h-20 -mt-4">
      <div className="relative w-95 group">
        <Search className="h-5 w-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors" />
        <input
          type="text"
          placeholder="Global Search..."
          className="w-full pl-14 pr-6 py-4 bg-[#F1F5F9] border-none rounded-2xl text-sm outline-none transition-all placeholder:text-slate-400 placeholder:font-medium"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="h-12 w-12 flex items-center justify-center rounded-2xl text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-100 transition-all">
            <Bell className="h-6 w-6" />
          </button>
          <button className="h-12 w-12 flex items-center justify-center rounded-2xl text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-100 transition-all">
            <Settings className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center gap-4 pl-6">
          <div className="text-right">
            <h4 className="text-base font-extrabold text-[#0F172A] leading-tight tracking-tight">
              {userName}
            </h4>
            <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5">
              {role}
            </p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-slate-100 border-2 border-white shadow-xl overflow-hidden">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
              alt={userName}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
