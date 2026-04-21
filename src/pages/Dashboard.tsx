import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  LayoutDashboard,
  CreditCard,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white flex flex-col">
        <div className="p-6 border-b">
          <span className="text-2xl font-bold tracking-tighter text-brand-secondary">
            Sentra
          </span>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
            Command Center
          </p>
        </div>

        <nav className="p-4 flex-1 space-y-2">
          <NavItem
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Overview"
            active
          />
          <NavItem icon={<BarChart3 className="h-4 w-4" />} label="Analytics" />
          <NavItem icon={<Users className="h-4 w-4" />} label="Clients" />
          <NavItem icon={<FileText className="h-4 w-4" />} label="Quotes" />
          <NavItem icon={<CreditCard className="h-4 w-4" />} label="Finance" />
          <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" />
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Workspace Overview
            </h1>
            <p className="text-slate-500 mt-1">
              Welcome back, {profile?.fullName || "Architect"}.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-md text-sm font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all active:scale-95">
            <Plus className="h-4 w-4" />
            New Quote Request
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="Active Campaigns" value="12" change="+2" />
          <StatCard
            label="Total Spent"
            value="$240.5k"
            change="+14%"
            positive
          />
          <StatCard label="Quote Requests" value="3" change="2 Pending" />
          <StatCard
            label="Conversion ROI"
            value="4.2x"
            change="+0.5"
            positive
          />
        </div>

        {/* Role Identity Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center text-brand-primary font-bold text-2xl">
              {profile?.fullName?.charAt(0) || "U"}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {profile?.fullName}
              </h3>
              <p className="text-sm text-slate-500">{profile?.companyName}</p>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-brand-primary uppercase tracking-tight">
                Role: {profile?.role}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
              Account Status
            </p>
            <p className="text-sm font-bold text-green-500">
              Verified Precision Member
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({
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
      flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-md transition-all
      ${active ? "bg-cyan-50 text-brand-primary shadow-sm ring-1 ring-cyan-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
    `}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  label,
  value,
  change,
  positive = false,
}: {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
        {label}
      </p>
      <div className="flex items-baseline justify-between">
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${positive ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"}`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
