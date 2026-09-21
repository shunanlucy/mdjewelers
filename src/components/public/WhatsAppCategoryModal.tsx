import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Landmark,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { trackEvent } from "../../analytics";

interface WhatsAppCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber?: string;
  selectedCity?: string;
}

interface CategoryOption {
  id: string;
  title: string;
  sublabel: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  message: string;
}

export const WhatsAppCategoryModal: React.FC<WhatsAppCategoryModalProps> = ({
  isOpen,
  onClose,
  phoneNumber = "918101121813",
  selectedCity = "Kalyani",
}) => {
  const categories: CategoryOption[] = [
    {
      id: "loan_settlement",
      title: "Girvi Sona Chhudwana",
      sublabel: "Bank ya NBFC loan settlement & extra cash",
      icon: <Landmark size={20} className="text-amber-400" />,
      badge: "Most Popular",
      badgeColor: "bg-amber-950/80 text-amber-300 border-amber-500/40",
      message: `Hi MRAJ Jewelers, mujhe bank/lender se apna girvi sona chhudwane aur loan settlement ke baare mein baat karni hai (${selectedCity}).`,
    },
    {
      id: "sell_old_gold",
      title: "Purana Sona Bechna (Sell Old Gold)",
      sublabel: "Jewellery, coins, scrap gold par spot cash (0% deduction)",
      icon: <Sparkles size={20} className="text-[var(--gold-primary)]" />,
      badge: "Spot Cash",
      badgeColor: "bg-[rgba(212,175,55,0.15)] text-[var(--gold-light)] border-[rgba(212,175,55,0.3)]",
      message: `Hi MRAJ Jewelers, mere paas purana sona / jewellery hai aur mujhe best rate par cash mein bechna hai (${selectedCity}).`,
    },
    {
      id: "auction_relief",
      title: "Bank Auction Notice Relief",
      sublabel: "Bank notice, overdue interest ya auction alert par turant madad",
      icon: <AlertTriangle size={20} className="text-rose-400" />,
      badge: "Urgent",
      badgeColor: "bg-rose-950/80 text-rose-300 border-rose-500/40",
      message: `Hi MRAJ Jewelers, mujhe bank se gold loan notice / auction alert aayi hai, mujhe turant guidance aur relief chahiye.`,
    },
    {
      id: "general_inquiry",
      title: "General Inquiry / Other Question",
      sublabel: "Gold rates, branch visit ya koi anya sawal",
      icon: <HelpCircle size={20} className="text-emerald-400" />,
      message: `Hi MRAJ Jewelers, mujhe aapke gold services ke baare mein jaankari chahiye (${selectedCity}).`,
    },
  ];

  const handleSelectCategory = (cat: CategoryOption) => {
    trackEvent("button_click", `WhatsApp Category Selected: ${cat.title}`);

    // Automatically record WhatsApp inquiry into Admin Leads for real-time tracking
    try {
      const existing = JSON.parse(localStorage.getItem("mraj_customer_leads") || "[]");
      const categoryKey: "gold_loan" | "old_gold" | "auction_relief" =
        cat.id === "sell_old_gold"
          ? "old_gold"
          : cat.id === "auction_relief"
          ? "auction_relief"
          : "gold_loan";

      const newLeadEntry = {
        id: "wa-" + Date.now(),
        createdAt: new Date().toISOString(),
        name: `WhatsApp Lead (${cat.title.split("(")[0].trim()})`,
        phone: "In WhatsApp Chat",
        location: selectedCity,
        serviceType: cat.title,
        category: categoryKey,
        lender: "Direct WhatsApp Click",
        status: "New",
        notes: `Customer opened WhatsApp with message: "${cat.message.slice(0, 80)}..."`,
      };
      localStorage.setItem("mraj_customer_leads", JSON.stringify([newLeadEntry, ...existing]));
    } catch (e) {
      console.error(e);
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(cat.message)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-md rounded-2xl sm:rounded-3xl border border-[rgba(37,211,102,0.35)] bg-[#12141a] p-4 sm:p-5 shadow-2xl shadow-black text-slate-200"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Top ambient WhatsApp green accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#25d366] to-transparent rounded-t-2xl" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25d366]/15 text-[#25d366] border border-[#25d366]/35 shadow-md">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                    WhatsApp Par Baat Karein
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Topic select karein, direct WhatsApp khulega
                  </p>
                </div>
              </div>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Category Option Cards */}
            <div className="mt-3.5 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat)}
                  className="w-full text-left group rounded-xl border border-white/10 bg-[#161822] hover:bg-[#1a1e2c] hover:border-[#25d366]/50 p-3 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 group-hover:bg-[#25d366]/15 transition">
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#25d366] transition truncate">
                          {cat.title}
                        </span>
                        {cat.badge && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold border ${cat.badgeColor}`}
                          >
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10.5px] text-slate-400 truncate mt-0.5">
                        {cat.sublabel}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-slate-500 group-hover:text-[#25d366] group-hover:translate-x-0.5 transition shrink-0"
                  />
                </button>
              ))}
            </div>

            {/* Footer Trust Note */}
            <div className="mt-3.5 pt-2.5 border-t border-white/5 text-center">
              <p className="text-[10px] text-slate-400">
                🔒 Direct MRAJ JEWELERS Official WhatsApp (+91 81011 21813)
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
