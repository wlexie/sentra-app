import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Sidebar, DashboardHeader } from "@/src/components/dashboard/Layout";
import {
  StatCard,
  VelocityChart,
  SocialIntegrations,
  QuotesTable,
} from "@/src/components/dashboard/Widgets";
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
} from "firebase/firestore";

export default function Dashboard() {
  const { profile, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quotes, setQuotes] = useState<any[]>([]);
  const isClient = profile?.role === "client";

  useEffect(() => {
    if (!user) return;

    // Fetch user's quotes
    const q = query(
      collection(db, "quotes"),
      where("clientId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const quotesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuotes(quotesData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900 border-l border-slate-100">
      <Sidebar
        activeTab="overview"
        onNewCampaign={() => setIsModalOpen(true)}
      />

      <main className="flex-1 bg-[#F9FBFC] min-h-screen">
        <div className="p-8 lg:p-12 max-w-350 mx-auto">
          <DashboardHeader
            userName={profile?.fullName?.split(" ")[0] || "Architect"}
            onNewCampaign={() => setIsModalOpen(true)}
          />

          {isClient ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                  label="Total Spend"
                  value="$42,850.00"
                  subtext="+8.4% vs last mo"
                />
                <StatCard label="ROAS" value="4.82x" subtext="Optimal Range" />
                <StatCard
                  label="Portfolio Value"
                  value="$1.2M Insights"
                  subtext="Global reach expanded by {quotes.length || 2}.4M unique impressions this cycle."
                  accent
                />
              </div>

              {/* Middle Section */}
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                <VelocityChart />
                <SocialIntegrations />
              </div>

              {/* Bottom Table */}
              <QuotesTable data={quotes} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-20 text-center"
            >
              <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                  Admin Dashboard Under Construction
                </h2>
                <p className="text-slate-500 mb-8">
                  Welcome, {profile?.fullName}. You are authorized as an Admin.
                  We are currently finalizing the Command Center for
                  administrative operations.
                </p>
                <div className="flex justify-center gap-4">
                  <button className="bg-brand-primary text-white px-6 py-2 rounded-lg font-bold">
                    User Management
                  </button>
                  <button className="border border-slate-200 px-6 py-2 rounded-lg font-bold">
                    Review Quotes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <NewQuoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={(id) => console.log("Created quote:", id)}
          />

          {/* Footer */}
          <footer className="mt-20 pt-12 border-t border-slate-200 bg-[#0D1B2A] -mx-8 lg:-mx-12 px-8 lg:px-12 pb-12 rounded-t-[40px]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white">
              <div className="col-span-1 md:col-span-1">
                <h4 className="text-xl font-bold italic mb-6">Sentra</h4>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                  Precision in every insight. We provide the architectural
                  foundation for marketing intelligence and financial growth.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest text-[#006677] mb-6">
                  Product
                </h5>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Solutions
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Platform
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Pricing
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest text-[#006677] mb-6">
                  Company
                </h5>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    About Us
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Careers
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Contact
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest text-[#006677] mb-6">
                  Support
                </h5>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Help Center
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    API Docs
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Status
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest text-slate-500">
              <p>
                © 2026 Sentra Technologies. All rights reserved. Precision in
                every insight.
              </p>
              <div className="flex gap-8 mt-4 md:mt-0">
                <Link to="#" className="hover:text-white">
                  Privacy Policy
                </Link>
                <Link to="#" className="hover:text-white">
                  Terms of Service
                </Link>
                <Link to="#" className="hover:text-white">
                  Security
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
