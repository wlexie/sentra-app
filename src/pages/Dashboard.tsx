import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Sidebar, DashboardHeader } from "@/src/components/dashboard/Layout";
import {
  StatCard,
  VelocityChart,
  SocialIntegrations,
  QuotesTable,
} from "@/src/components/dashboard/Widgets";
import {
  AdminStatCard,
  PlatformPerformanceChart,
  PrecisionAuditPanel,
  QuickInsights,
  ClientManagementTable,
} from "@/src/components/dashboard/AdminWidgets";
import { NewQuoteModal } from "@/src/components/dashboard/NewQuoteModal";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { db } from "@/src/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import {
  DollarSign,
  Megaphone,
  FileText,
  Users,
  X,
  BarChart3,
  CreditCard,
  Loader2,
} from "lucide-react";
import { Quote } from "@/src/types";

export default function Dashboard() {
  const { profile, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [clientFilter, setClientFilter] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const isAdmin = profile?.role === "admin";
  const isClient = profile?.role === "client";

  useEffect(() => {
    if (profile !== undefined) {
      setLoadingProfile(false);
    }
  }, [profile]);

  useEffect(() => {
    if (!user || loadingProfile) return;

    let q;
    if (isClient) {
      q = query(collection(db, "quotes"), where("clientId", "==", user.uid));
    } else {
      // Admin query - support filtering by clientId
      if (clientFilter) {
        q = query(
          collection(db, "quotes"),
          where("clientId", "==", clientFilter),
        );
      } else {
        q = query(collection(db, "quotes"), limit(50));
      }

      // Also fetch clients for Admin
      const clientsQuery = query(
        collection(db, "users"),
        where("role", "==", "client"),
        limit(100),
      );

      const unsubscribeClients = onSnapshot(clientsQuery, (snapshot) => {
        const clientsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClients(clientsData);
      });

      return () => unsubscribeClients();
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const quotesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as Quote[];

        // Sort client-side to avoid missing index errors for where + orderBy
        const sortedQuotes = [...quotesData].sort((a: Quote, b: Quote) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });

        setQuotes(sortedQuotes);
      },
      (error) => {
        console.error("Quotes snapshot error:", error);
      },
    );

    return () => unsubscribe();
  }, [user, profile, clientFilter, loadingProfile]);

  if (loadingProfile && user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-[#006677] animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            Synchronizing Portfolio...
          </p>
        </div>
      </div>
    );
  }

  // Handle Tab Content
  const renderContent = () => {
    if (activeTab === "analytics") {
      return (
        <div className="py-20 text-center animate-in fade-in slide-in-from-bottom-4">
          <div className="max-w-md mx-auto bg-white p-12 rounded-3xl border border-slate-100 shadow-sm">
            <BarChart3 className="h-12 w-12 text-brand-primary mx-auto mb-6 opacity-20" />
            <h2 className="text-xl font-bold mb-2">Advanced Analytics</h2>
            <p className="text-slate-500 text-sm">
              Deep-dive performance metrics across multi-channel portfolios are
              currently being synthesized.
            </p>
          </div>
        </div>
      );
    }

    if (activeTab === "campaigns") {
      return (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {clientFilter
                  ? `Campaigns for ${clients.find((c) => c.id === clientFilter)?.fullName || "Selected Client"}`
                  : "Active Campaigns"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing all live and pending campaign assets.
              </p>
              {clientFilter && (
                <button
                  onClick={() => setClientFilter(null)}
                  className="text-xs font-bold text-brand-primary mt-2 flex items-center gap-1 hover:underline"
                >
                  <X className="h-3 w-3" />
                  Clear Filter
                </button>
              )}
            </div>
            {(isClient || isAdmin) && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-brand-primary/20"
              >
                Launch New Campaign
              </button>
            )}
          </div>
          <QuotesTable data={quotes} />
        </div>
      );
    }

    if (activeTab === "finance") {
      return (
        <div className="py-20 text-center animate-in fade-in slide-in-from-bottom-4">
          <div className="max-w-md mx-auto bg-white p-12 rounded-3xl border border-slate-100 shadow-sm">
            <CreditCard className="h-12 w-12 text-[#006677] mx-auto mb-6 opacity-20" />
            <h2 className="text-xl font-bold mb-2">Financial Ledger</h2>
            <p className="text-slate-500 text-sm">
              Transaction records and automated billing reconciliation are being
              secured.
            </p>
          </div>
        </div>
      );
    }

    if (activeTab === "clients") {
      return (
        <div className="animate-in fade-in duration-500">
          <ClientManagementTable
            data={clients}
            onViewCampaigns={(id) => {
              setClientFilter(id);
              setActiveTab("campaigns");
            }}
          />
        </div>
      );
    }

    // Default Overview Content
    return isAdmin ? (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Platform Overview
          </h1>
          <p className="text-slate-500 mt-2">
            Welcome back, {profile?.fullName?.split(" ")[0]}. Your active
            portfolios are performing 12.4% above benchmark this quarter.
          </p>
        </div>

        {/* Admin Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <AdminStatCard
            label="TOTAL MANAGED SPEND"
            value={`$${quotes.reduce((acc, q) => acc + (q.budgetEstimate || 0), 0).toLocaleString()}`}
            subtext="Live platform budget"
            icon={DollarSign}
          />
          <AdminStatCard
            label="ACTIVE CAMPAIGNS"
            value={quotes
              .filter((q) => q.status === "approved")
              .length.toString()}
            subtext={`${quotes.filter((q) => q.status === "approved").length} verified live`}
            icon={Megaphone}
          />
          <AdminStatCard
            label="QUOTES PENDING"
            value={quotes
              .filter((q) => q.status === "pending" || q.status === "modifying")
              .length.toString()}
            subtext="Awaiting attention"
            icon={FileText}
          />
          <AdminStatCard
            label="TOTAL REQUISITIONS"
            value={quotes.length.toString()}
            subtext="Historical ledger count"
            icon={Users}
          />
        </div>

        {/* Performance Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch mb-12">
          <div className="lg:col-span-8 h-full">
            <PlatformPerformanceChart />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-8 h-full">
            <PrecisionAuditPanel />
            <QuickInsights />
          </div>
        </div>

        {/* Bottom Section: Client Management & Recent Quotes */}
        <ClientManagementTable
          data={clients}
          onViewCampaigns={(id) => {
            setClientFilter(id);
            setActiveTab("campaigns");
          }}
        />

        <div className="mt-20">
          <div className="flex justify-between items-end mb-8 px-2">
            <div>
              <h3 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                Recent Platform Campaigns
              </h3>
              <p className="text-sm font-medium text-slate-400 mt-1">
                Cross-client active and pending campaign requests.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("campaigns")}
              className="text-xs font-bold text-[#006677] hover:underline uppercase tracking-widest"
            >
              View All Deliverables
            </button>
          </div>
          <QuotesTable data={quotes} />
        </div>
      </div>
    ) : (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Architect Dashboard
          </h1>
          <p className="text-slate-500 mt-2">
            Welcome back. Your campaign performance is tracking 12% above
            benchmark.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Spend"
            value={`$${quotes.reduce((acc, q) => acc + (q.budgetEstimate || 0), 0).toLocaleString()}`}
            subtext="Lifetime managed budget"
          />
          <StatCard
            label="Active Runs"
            value={quotes
              .filter((q) => q.status === "approved")
              .length.toString()}
            subtext="Current live campaigns"
          />
          <StatCard
            label="Portfolio Assets"
            value={quotes.length.toString()}
            subtext={`Managing ${quotes.length} total requisitions`}
            accent
          />
        </div>

        {/* Middle Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <VelocityChart />
          <SocialIntegrations />
        </div>

        {/* Bottom Table */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-6">
            Campaign Status Feed
          </h3>
          <QuotesTable data={quotes} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900 border-l border-slate-100">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewCampaign={() => setIsModalOpen(true)}
      />

      <main className="flex-1 bg-[#F9FBFC] min-h-screen">
        <div className="p-8 lg:p-12 max-w-350 mx-auto">
          <DashboardHeader
            userName={profile?.fullName || "Architect"}
            role={isAdmin ? "Platform Lead" : "Marketing Client"}
          />

          {renderContent()}

          <NewQuoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            clients={clients}
            initialClientId={clientFilter || undefined}
            onSuccess={(id) => {
              console.log("Created quote:", id);
              setActiveTab("campaigns");
            }}
          />

          {/* Footer Component */}
          <footer className="mt-32 pt-20 border-t border-slate-800 bg-[#0F172A] -mx-8 lg:-mx-12 px-8 lg:px-16 pb-16 rounded-t-[80px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 text-white max-w-350 mx-auto">
              <div className="lg:col-span-2">
                <h4 className="text-3xl font-extrabold italic mb-8 tracking-tighter">
                  Sentra
                </h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                  Architecting precision in every marketing insight and
                  financial decision across the global enterprise.
                </p>

                <div className="mt-14 p-6 bg-slate-900/50 rounded-3xl border border-white/5 inline-flex flex-col min-w-[320px]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">
                      System Load
                    </span>
                    <span className="text-[11px] font-extrabold text-teal-400 uppercase tracking-widest">
                      2.4%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-400 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                      style={{ width: "2.4%" }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#006677] mb-10">
                  Legal
                </h5>
                <ul className="space-y-5 text-[13px] font-bold text-slate-400">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Privacy Policy
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Terms of Service
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Security
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#006677] mb-10">
                  Support
                </h5>
                <ul className="space-y-5 text-[13px] font-bold text-slate-400">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Status
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Help Center
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    API Docs
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#006677] mb-10">
                  System
                </h5>
                <div className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer transition-colors group">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-bold tracking-tight">
                    All Systems Operational
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-[11px] uppercase font-bold tracking-[0.25em] text-slate-600">
              <p>
                © 2024 Sentra Technologies. All rights reserved. Precision in
                every insight.
              </p>
              <div className="flex gap-10 mt-8 md:mt-0 items-center">
                <Link
                  to="#"
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <Megaphone className="h-5 w-5" />
                </Link>
                <Link
                  to="#"
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <Users className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
