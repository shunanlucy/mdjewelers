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
  iconColor: string;
  message: string;
}

export const WhatsAppCategoryModal: React.FC<WhatsAppCategoryModalProps> = ({
  isOpen,
  onClose,
  phoneNumber = "918101121813",
}) => {
  const categories: CategoryOption[] = [
    {
      id: "loan_settlement",
      title: "Girvi Sona Chhudwana",
      sublabel: "Gold loan settlement & extra cash",
      icon: <Landmark size={18} />,
      iconColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      message:
        "Hi MRAJ Jewelers, mujhe bank ya lender se girvi sona chhudwane aur gold loan settlement ke baare mein jaankari chahiye. Please guide me.",
    },
    {
      id: "sell_old_gold",
      title: "Purana Sona Bechna",
      sublabel: "Live rate par spot cash",
      icon: <Sparkles size={18} />,
      iconColor: "text-[var(--gold-primary)] bg-[rgba(212,175,55,0.1)] border-[rgba(212,175,55,0.2)]",
      message:
        "Hi MRAJ Jewelers, mujhe purana sona / jewellery cash mein bechna hai. Please guide me.",
    },
    {
      id: "auction_relief",
      title: "Auction Notice Help",
      sublabel: "Urgent bank loan settlement",
      icon: <AlertTriangle size={18} />,
      iconColor: "text-rose-400 bg-rose-400/10 border-rose-400/20",
      message:
        "Hi MRAJ Jewelers, mujhe gold loan auction notice / overdue loan par urgent settlement assistance chahiye. Please guide me immediately.",
    },
    {
      id: "general_inquiry",
      title: "General Inquiry",
      sublabel: "Gold rates ya anya sawaal",
      icon: <HelpCircle size={18} />,
      iconColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      message:
        "Hi MRAJ Jewelers, mujhe aapke gold valuation aur services ke baare mein poochhna hai. Please guide me.",
    },
  ];

  const handleSelectCategory = (cat: CategoryOption) => {
    trackEvent("button_click", `WhatsApp Category Selected: ${cat.title}`);

    // Automatically record WhatsApp inquiry into Admin Leads
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
        name: `WhatsApp (${cat.title})`,
        phone: "In WhatsApp Chat",
        location: "Online Visitor",
        serviceType: cat.title,
        category: categoryKey,
        lender: "Direct WhatsApp Click",
        status: "New",
        notes: `Customer opened WhatsApp: "${cat.message.slice(0, 70)}..."`,
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
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-3.5 backdrop-blur-md"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-sm rounded-2xl border border-[rgba(37,211,102,0.3)] bg-[#12141a] p-4 shadow-2xl shadow-black text-slate-200"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Top WhatsApp accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#25d366] to-transparent rounded-t-2xl" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25d366]/15 text-[#25d366] border border-[#25d366]/30">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    WhatsApp Par Baat Karein
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Topic select karein, direct chat shuru hogi
                  </p>
                </div>
              </div>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Category Option Cards */}
            <div className="mt-3 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat)}
                  className="w-full text-left group rounded-xl border border-white/10 bg-[#161822] hover:bg-[#1c202d] hover:border-[#25d366]/50 p-2.5 sm:p-3 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${cat.iconColor}`}
                    >
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#25d366] transition leading-snug">
                        {cat.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                        {cat.sublabel}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    size={15}
                    className="text-slate-500 group-hover:text-[#25d366] group-hover:translate-x-0.5 transition shrink-0"
                  />
                </button>
              ))}
            </div>

            {/* Clean Footer */}
            <div className="mt-3 pt-2.5 border-t border-white/5 text-center">
              <p className="text-[10.5px] text-slate-400">
                Official WhatsApp: <span className="text-slate-300 font-semibold">+91 81011 21813</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
