import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Loader2,
  Sparkles,
  Target,
  DollarSign,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { db } from "@/src/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/src/contexts/AuthContext";
import { GoogleGenAI } from "@google/genai";

interface NewQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (quoteId: string) => void;
}

export function NewQuoteModal({
  isOpen,
  onClose,
  onSuccess,
}: NewQuoteModalProps) {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    campaignName: "",
    objective: "Awareness",
    deliverables: "",
    budget: "",
    duration: "30 Days",
    targetAudience: "",
  });

  const generateAIAnalysis = async () => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("Gemini API key missing, skipping analysis");
        return "AI Analysis not available at this time.";
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        As a senior marketing architect at Sentra, provide a professional, concise strategic analysis for the following campaign request:
        
        Campaign Name: ${formData.campaignName}
        Objective: ${formData.objective}
        Target Audience: ${formData.targetAudience}
        Budget (USD): ${formData.budget}
        Duration: ${formData.duration}
        Deliverables: ${formData.deliverables}
        
        Provide a 3-paragraph summary covering:
        1. Market Positioning & Feasibility
        2. Strategic Audience Alignment
        3. Projected Impact & ROI potential
        
        Keep the tone professional, architectural, and data-driven.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      return response.text || "Unable to generate strategic summary.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Strategic analysis generation failed but campaign was recorded.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // First generate the AI Analysis
      const aiAnalysis = await generateAIAnalysis();

      const quoteData = {
        clientId: user.uid,
        clientName: profile?.fullName || "Anonymous",
        companyName: profile?.companyName || "N/A",
        campaignName: formData.campaignName,
        objective: formData.objective,
        deliverables: formData.deliverables,
        budgetEstimate: parseFloat(formData.budget) || 0,
        duration: formData.duration,
        targetAudience: formData.targetAudience,
        aiAnalysis: aiAnalysis,
        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "quotes"), quoteData);
      onSuccess(docRef.id);
      onClose();
      // Reset
      setStep(1);
      setFormData({
        campaignName: "",
        objective: "Awareness",
        deliverables: "",
        budget: "",
        duration: "30 Days",
        targetAudience: "",
      });
    } catch (error) {
      console.error("Error creating quote:", error);
      alert("Failed to generate quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const objectives = [
    "Awareness",
    "Conversion",
    "Engagement",
    "Retention",
    "Rebrand",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-[#F9FBFC]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-50 flex items-center justify-center text-brand-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Campaign Architect
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    Precision Quote Generator
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

            <form onSubmit={handleSubmit} className="p-8">
              {step === 1 ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Campaign Identity
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Q3 Global Expansion"
                      value={formData.campaignName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          campaignName: e.target.value,
                        })
                      }
                      className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Primary Objective
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {objectives.map((obj) => (
                        <button
                          key={obj}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, objective: obj })
                          }
                          className={`
                            py-2 rounded-lg text-xs font-bold transition-all border
                            ${
                              formData.objective === obj
                                ? "bg-brand-primary text-white border-brand-primary shadow-md"
                                : "bg-white text-slate-500 border-slate-100 hover:border-slate-300"
                            }
                          `}
                        >
                          {obj}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Target Audience Description
                    </label>
                    <textarea
                      required
                      placeholder="Describe your ideal demographics, interests, and behavior..."
                      value={formData.targetAudience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAudience: e.target.value,
                        })
                      }
                      className="w-full h-24 bg-slate-50 border border-slate-100 rounded-xl p-4 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none font-medium text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={
                      !formData.campaignName || !formData.targetAudience
                    }
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
                  >
                    Next Phase
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Budget Estimate (USD)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="number"
                          required
                          placeholder="0.00"
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-4 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Projected Duration
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              duration: e.target.value,
                            })
                          }
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-4 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium appearance-none"
                        >
                          <option>7 Days</option>
                          <option>30 Days</option>
                          <option>90 Days</option>
                          <option>6 Months</option>
                          <option>1 Year</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Required Deliverables
                    </label>
                    <textarea
                      required
                      placeholder="List key items (e.g. 5x Video Ads, Social Strategy, Landing Page)..."
                      value={formData.deliverables}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliverables: e.target.value,
                        })
                      }
                      className="w-full h-32 bg-slate-50 border border-slate-100 rounded-xl p-4 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none font-medium text-sm"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-slate-100 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all text-slate-600"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-2 flex items-center justify-center gap-2 bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 transition-all active:scale-95 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Processing Logic...
                        </>
                      ) : (
                        <>
                          Generate Quote Analysis
                          <Sparkles className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
