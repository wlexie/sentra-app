import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  FileText,
  Target,
  DollarSign,
  Calendar,
  Sparkles,
  Building2,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Markdown from "react-markdown";
import { db } from "@/src/lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

interface QuoteDetailModalProps {
  quote: any | null;
  onClose: () => void;
}

export function QuoteDetailModal({ quote, onClose }: QuoteDetailModalProps) {
  const [updating, setUpdating] = useState(false);
  if (!quote) return null;

  const handleUpdateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const quoteRef = doc(db, "quotes", quote.id);
      await updateDoc(quoteRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Status update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      {quote && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-[#F9FBFC] shrink-0">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {quote.campaignName}
                    </h3>
                    <span
                      className={`
                      px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight
                      ${quote.status?.toLowerCase() === "approved" ? "bg-[#E8F5E9] text-[#2E7D32]" : "bg-[#E3F2FD] text-[#1565C0]"}
                    `}
                    >
                      {quote.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Quote Reference: {quote.id}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Campaign Specs */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 px-1">
                      Campaign Parameters
                    </h4>

                    <div className="space-y-6">
                      <SpecItem
                        icon={<Building2 className="h-4 w-4" />}
                        label="Client"
                        value={quote.companyName || quote.clientName}
                      />
                      <SpecItem
                        icon={<Target className="h-4 w-4" />}
                        label="Objective"
                        value={quote.objective}
                      />
                      <SpecItem
                        icon={<DollarSign className="h-4 w-4" />}
                        label="Budget Estimate"
                        value={`$${(quote.budgetEstimate || 0).toLocaleString()}`}
                      />
                      <SpecItem
                        icon={<Calendar className="h-4 w-4" />}
                        label="Duration"
                        value={quote.duration}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                      Target Audience
                    </h4>
                    <p className="text-sm bg-white p-4 rounded-xl border border-slate-100 text-slate-600 leading-relaxed shadow-sm">
                      {quote.targetAudience}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                      Core Deliverables
                    </h4>
                    <p className="text-sm bg-white p-4 rounded-xl border border-slate-100 text-slate-600 leading-relaxed shadow-sm whitespace-pre-line">
                      {quote.deliverables}
                    </p>
                  </div>
                </div>

                {/* Right Side: AI Strategic Analysis */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-white p-8 rounded-2xl border border-brand-primary/20 shadow-lg shadow-brand-primary/5">
                      <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="h-5 w-5 text-brand-primary" />
                        <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                          Sentra AI Strategic Summary
                        </h4>
                      </div>

                      <div className="prose prose-slate prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 markdown-body">
                        {quote.aiAnalysis ? (
                          <Markdown>{quote.aiAnalysis}</Markdown>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <Sparkles className="h-8 w-8 mb-4 opacity-20" />
                            <p className="text-sm font-medium">
                              Strategic analysis generating...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {quote.status === "pending" && (
                    <div className="flex gap-4 pt-4">
                      <button
                        disabled={updating}
                        onClick={() => handleUpdateStatus("approved")}
                        className="flex-1 bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {updating ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          "Approve & Activate"
                        )}
                      </button>
                      <button
                        disabled={updating}
                        onClick={() => handleUpdateStatus("modifying")}
                        className="flex-1 bg-white border border-slate-200 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        Request Modifications
                      </button>
                    </div>
                  )}
                  {quote.status === "approved" && (
                    <div className="pt-4">
                      <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl flex items-center gap-3 text-teal-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-bold">
                          This campaign is activated and live.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SpecItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
