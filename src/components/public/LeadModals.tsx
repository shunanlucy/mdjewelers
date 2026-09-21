import React, { useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Check,
  FileText,
  Lock,
  MapPin,
  MessageCircle,
  Send,
  Trash2,
  UploadCloud,
  X,
  Zap,
} from "lucide-react";
import logoMrajWordmark from "../../assets/mraj-wordmark.png";
import {
  lendersList,
  LOCATION_OPTIONS,
  OLD_GOLD_QUERIES,
  GOLD_LOAN_QUERIES,
} from "../../constants/publicData";
import { trackEvent } from "../../analytics";

interface LeadModalsProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  dialogSource: string;
  quickServiceModal: { isOpen: boolean; category: "old_gold" | "gold_loan" };
  setQuickServiceModal: (val: { isOpen: boolean; category: "old_gold" | "gold_loan" }) => void;
  selectedLender: string;
  goldGrams: number;
  whatsappUrl: string;
}

export const LeadModals: React.FC<LeadModalsProps> = ({
  dialogOpen,
  setDialogOpen,
  dialogSource,
  quickServiceModal,
  setQuickServiceModal,
  selectedLender,
  goldGrams,
  whatsappUrl,
}) => {
  // Main Lead Form state
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    previewUrl?: string;
    isImage?: boolean;
    type?: "document" | "photo";
  } | null>(null);

  // Quick Service Modal Form state
  const [quickLeadSubmitted, setQuickLeadSubmitted] = useState(false);
  const [quickUploadedFile, setQuickUploadedFile] = useState<{
    name: string;
    size: string;
    previewUrl?: string;
    isImage?: boolean;
  } | null>(null);
  const [quickLeadForm, setQuickLeadForm] = useState({
    name: "",
    phone: "",
    location: "", // Blank by default so user can input any location
    query: OLD_GOLD_QUERIES[0],
  });

  const handleQuickFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImg = file.type.startsWith("image/");
      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(0)} KB`;

      if (isImg) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setQuickUploadedFile({
            name: file.name,
            size: sizeStr,
            previewUrl: reader.result as string,
            isImage: true,
          });
        };
        reader.readAsDataURL(file);
      } else {
        setQuickUploadedFile({
          name: file.name,
          size: sizeStr,
          isImage: false,
        });
      }
    }
  };

  const handleQuickLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    trackEvent(
      "button_click",
      `Quick Modal Submitted: ${quickServiceModal.category} - ${quickLeadForm.location}`
    );

    try {
      const existing = JSON.parse(localStorage.getItem("mraj_customer_leads") || "[]");
      const newLeadEntry = {
        id: "lead-" + Date.now(),
        createdAt: new Date().toISOString(),
        name: quickLeadForm.name || "Quick Inquiry Lead",
        phone: quickLeadForm.phone || "",
        location: quickLeadForm.location || "Online Visitor",
        lender: quickServiceModal.category === "old_gold" ? "Physical Gold" : "Bank / NBFC",
        goldGrams: quickUploadedFile
          ? `File: ${quickUploadedFile.name} (${quickUploadedFile.size})`
          : quickLeadForm.query,
        serviceType:
          quickServiceModal.category === "old_gold"
            ? "Sell Old Gold & Jewellery"
            : "Gold Loan Settlement",
        category: quickServiceModal.category === "old_gold" ? "old_gold" : "gold_loan",
        status: "New",
        attachment: quickUploadedFile
          ? {
              name: quickUploadedFile.name,
              size: quickUploadedFile.size,
              previewUrl: quickUploadedFile.previewUrl,
              isImage: quickUploadedFile.isImage,
              type: quickServiceModal.category === "old_gold" ? "photo" : "document",
            }
          : undefined,
      };
      localStorage.setItem("mraj_customer_leads", JSON.stringify([newLeadEntry, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setQuickLeadSubmitted(true);
  };

  return (
    <>
      {/* 1. Main Lead Capture Dialog */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-2 min-[360px]:p-3 sm:p-4 backdrop-blur-sm"
            onMouseDown={() => {
              setDialogOpen(false);
              setSubmitted(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative max-h-[94dvh] w-full max-w-lg overflow-y-auto rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.25)] bg-[var(--card-bg)] p-4 min-[360px]:p-5 sm:p-8 shadow-2xl text-slate-200"
              role="dialog"
              aria-modal="true"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
                onClick={() => {
                  setDialogOpen(false);
                  setSubmitted(false);
                }}
                aria-label="Close"
              >
                <X size={17} />
              </button>

              {submitted ? (
                <div className="py-6 sm:py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[rgba(212,175,55,0.15)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)]">
                    <Check size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-3.5 font-serif text-2xl font-bold text-white">Anurodh Prapt Hua!</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                    MRAJ JEWELERS ke gold loan specialist 10 minute ke andar aapse call karenge aur aapke branch settlement ki poori jankari denge.
                  </p>
                  <div className="mt-5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--bg-secondary)] border border-[rgba(212,175,55,0.2)] text-xs text-[var(--gold-primary)] font-semibold">
                    ⚡ Fast response ke liye aap turant WhatsApp par bhi slip share kar sakte hain:
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("button_click", "Lead Form Success WhatsApp Button")}
                      className="btn-whatsapp flex-1 flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl text-xs font-bold py-2.5"
                    >
                      <MessageCircle size={16} /> Open WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setDialogOpen(false);
                        setSubmitted(false);
                      }}
                      className="flex-1 rounded-xl sm:rounded-2xl border border-[rgba(212,175,55,0.2)] bg-white/5 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/10 cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    setSubmitted(true);
                    trackEvent("button_click", `Lead Form Submitted (${dialogSource})`);
                    try {
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get("name") as string;
                      const phone = formData.get("phone") as string;
                      const lender = formData.get("lender") as string;
                      const grams = formData.get("grams") as string;
                      const loanAmount = formData.get("loan_amount") as string;
                      const serviceType = formData.get("service_type") as string;
                      const existing = JSON.parse(localStorage.getItem("mraj_customer_leads") || "[]");
                      const newLeadEntry = {
                        id: "lead-" + Date.now(),
                        createdAt: new Date().toISOString(),
                        name: name || "Website Inquiry",
                        phone: phone || "",
                        location: "Online Visitor",
                        lender: lender || "Not specified",
                        goldGrams: grams,
                        loanAmount: loanAmount ? loanAmount.replace(/[^0-9]/g, "") : undefined,
                        serviceType: dialogSource.includes("old_gold")
                          ? "Sell Old Gold & Jewellery"
                          : dialogSource.includes("auction")
                          ? "Auction Notice Relief"
                          : "Gold Loan Settlement",
                        category: dialogSource.includes("old_gold")
                          ? "old_gold"
                          : dialogSource.includes("auction")
                          ? "auction_relief"
                          : dialogSource.includes("calculator")
                          ? "calculator"
                          : "gold_loan",
                        status: "New",
                        notes: uploadedFile ? `Document Attached: ${uploadedFile.name} (${uploadedFile.size})` : undefined,
                        attachment: uploadedFile
                          ? {
                              name: uploadedFile.name,
                              size: uploadedFile.size,
                              previewUrl: uploadedFile.previewUrl,
                              isImage: uploadedFile.isImage,
                              type:
                                uploadedFile.type ||
                                (dialogSource.includes("old_gold") ? "photo" : "document"),
                            }
                          : undefined,
                      };
                      localStorage.setItem("mraj_customer_leads", JSON.stringify([newLeadEntry, ...existing]));
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={logoMrajWordmark}
                      alt="MRAJ"
                      className="h-4 sm:h-4.5 w-auto object-contain"
                    />
                    <span className="brand-jewelers-text text-xs leading-none pt-0.5">
                      JEWELERS
                    </span>
                    <div className="ml-auto inline-flex items-center gap-1 rounded-full bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.25)] px-2.5 sm:px-3 py-0.5 text-[10px] min-[360px]:text-[11px] font-bold text-[var(--gold-primary)]">
                      <Zap size={11} /> 100% Free Quote
                    </div>
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                    Sona Chhudwane Ke Liye Details Bharein
                  </h3>
                  <p className="mt-1 text-[11px] min-[360px]:text-xs text-slate-400">
                    ₹0 advance charges. Aapka data 100% confidential aur safe rahega.
                  </p>

                  <div className="mt-4 sm:mt-5 space-y-3">
                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                        Aapka Naam (Your Full Name) *
                      </label>
                      <input
                        required
                        name="name"
                        placeholder="e.g. Ramesh Sharma"
                        className="form-input text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                        Mobile Number (WhatsApp) *
                      </label>
                      <input
                        required
                        name="phone"
                        inputMode="tel"
                        placeholder="10-digit mobile number"
                        className="form-input text-xs sm:text-sm"
                      />
                    </div>

                    {/* Lender Selection */}
                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                        Lender (Branch)
                      </label>
                      <select
                        name="lender"
                        defaultValue={selectedLender}
                        className="form-input text-xs sm:text-sm font-semibold"
                      >
                        {lendersList.map((l) => (
                          <option key={l.name} value={l.name} className="bg-[#181824] text-white">
                            {l.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 2-Part Row: Approx Gold (Grams) & Loan Amount (₹) */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                          Approx Gold (Grams)
                        </label>
                        <input
                          name="grams"
                          inputMode="numeric"
                          placeholder="e.g. 50g"
                          defaultValue={`${goldGrams}g`}
                          className="form-input text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                          Loan Amount (₹)
                        </label>
                        <input
                          name="loan_amount"
                          inputMode="numeric"
                          placeholder="e.g. ₹1,50,000"
                          className="form-input text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Document / Loan Slip Upload Option */}
                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 flex items-center justify-between mb-1">
                        <span>Upload Loan Slip / Document</span>
                        <span className="text-[10px] text-[var(--gold-light)] font-normal">Optional (Slip / Bill / Notice)</span>
                      </label>
                      {uploadedFile ? (
                        <div className="flex items-center justify-between gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-2.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {uploadedFile.isImage && uploadedFile.previewUrl ? (
                              <img
                                src={uploadedFile.previewUrl}
                                alt="Upload Preview"
                                className="h-10 w-10 rounded-lg object-cover border border-emerald-500/40 shrink-0"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                                <FileText size={18} />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white truncate">{uploadedFile.name}</p>
                              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                                <Check size={10} /> {uploadedFile.size} • Ready to submit
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setUploadedFile(null)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 transition shrink-0 cursor-pointer"
                            title="Remove document"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ) : (
                        <label className="group relative flex flex-col items-center justify-center rounded-xl border border-dashed border-[rgba(212,175,55,0.35)] bg-[#121218] hover:bg-[#181824] hover:border-[var(--gold-primary)] px-3 py-3 text-center cursor-pointer transition">
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const isImg = file.type.startsWith("image/");
                                const sizeStr =
                                  file.size > 1024 * 1024
                                    ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
                                    : Math.round(file.size / 1024) + " KB";

                                if (isImg) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setUploadedFile({
                                      name: file.name,
                                      size: sizeStr,
                                      previewUrl: reader.result as string,
                                      isImage: true,
                                      type: dialogSource.includes("old_gold") ? "photo" : "document",
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                } else {
                                  setUploadedFile({
                                    name: file.name,
                                    size: sizeStr,
                                    isImage: false,
                                    type: "document",
                                  });
                                }
                                trackEvent("file_upload", `Lead Doc: ${file.name}`);
                              }
                            }}
                            className="hidden"
                          />
                          <div className="flex items-center gap-2">
                            <UploadCloud size={18} className="text-[var(--gold-primary)] group-hover:scale-110 transition shrink-0" />
                            <span className="text-xs font-bold text-slate-200 group-hover:text-[var(--gold-light)] transition">
                              Click or Drag Loan Slip / Photo
                            </span>
                          </div>
                          <p className="text-[9.5px] text-slate-400 mt-0.5">
                            Bank pledge slip, auction notice ya bill (JPG, PNG, PDF up to 10MB)
                          </p>
                        </label>
                      )}
                    </div>

                    <label className="flex items-start gap-2 text-[10px] min-[360px]:text-[11px] text-slate-400 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        required
                        className="mt-0.5 accent-[var(--gold-primary)]"
                      />
                      <span>
                        Main MRAJ JEWELERS se call aur WhatsApp par quotation prapt karne ke liye sehmat hoon.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold mt-4 sm:mt-5 w-full flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl py-3 sm:py-3.5 text-xs min-[360px]:text-sm font-bold shadow-gold cursor-pointer transition active:scale-[0.99]"
                  >
                    <span>
                      {dialogSource.includes("old_gold")
                        ? "Request Valuation Quote"
                        : "Submit Settlement Inquiry"}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DEDICATED QUICK INQUIRY POPUP MODAL */}
      <AnimatePresence>
        {quickServiceModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md"
            onMouseDown={() => {
              setQuickServiceModal({ ...quickServiceModal, isOpen: false });
              setQuickLeadSubmitted(false);
              setQuickUploadedFile(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22 }}
              className="relative max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.3)] bg-[#14141c] p-4.5 sm:p-6 shadow-2xl text-slate-200"
              role="dialog"
              aria-modal="true"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3.5 top-3.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
                onClick={() => {
                  setQuickServiceModal({ ...quickServiceModal, isOpen: false });
                  setQuickLeadSubmitted(false);
                  setQuickUploadedFile(null);
                }}
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {quickLeadSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                    <Check size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Request Sent Successfully!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed px-2">
                    Aapka quotation inquiry MRAJ JEWELERS team ko prapt ho gaya hai. Hamare gold specialist turant aapse WhatsApp aur call par sampark karenge.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setQuickServiceModal({ ...quickServiceModal, isOpen: false });
                        setQuickLeadSubmitted(false);
                        setQuickUploadedFile(null);
                      }}
                      className="btn-gold py-2.5 px-4 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickLeadSubmit} className="space-y-3.5">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <img
                        src={logoMrajWordmark}
                        alt="MRAJ"
                        className="h-3.5 w-auto object-contain"
                      />
                      <span className="brand-jewelers-text text-xs leading-none pt-0.5">
                        JEWELERS
                      </span>
                      <span className="ml-auto rounded-full bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] px-2 py-0.5 text-[9.5px] font-bold text-[var(--gold-light)]">
                        {quickServiceModal.category === "old_gold" ? "💎 Live Gold Rate" : "🔒 Zero Advance Fee"}
                      </span>
                    </div>

                    <h3 className="mt-2 font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                      {quickServiceModal.category === "old_gold"
                        ? "Check Old Gold Value"
                        : "Gold Loan Settlement"}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {quickServiceModal.category === "old_gold"
                        ? "Instant live gold valuation aur direct bank/cash payout"
                        : "Branch counter loan settlement aur direct locker release"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Aapka Naam / Full Name <span className="text-[var(--gold-primary)]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={quickLeadForm.name}
                      onChange={(e) => setQuickLeadForm({ ...quickLeadForm, name: e.target.value })}
                      className="w-full rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#181824] px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[var(--gold-primary)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Phone Number (WhatsApp) <span className="text-[var(--gold-primary)]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--gold-primary)]">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="98XXXXXXXX (10 digits)"
                        value={quickLeadForm.phone}
                        onChange={(e) => setQuickLeadForm({ ...quickLeadForm, phone: e.target.value })}
                        className="w-full rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#181824] pl-11 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[var(--gold-primary)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span>Aapki Location / City</span>
                      <span className="text-[9.5px] text-[var(--gold-light)] font-normal">Type your location</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Apna shahar / area dalein (e.g. Kalyani, Kolkata, etc.)"
                        value={quickLeadForm.location}
                        onChange={(e) => setQuickLeadForm({ ...quickLeadForm, location: e.target.value })}
                        list="quick-location-options"
                        className="w-full rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#181824] px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[var(--gold-primary)] focus:outline-none pr-8"
                      />
                      <datalist id="quick-location-options">
                        {LOCATION_OPTIONS.map((loc) => (
                          <option key={loc} value={loc} />
                        ))}
                      </datalist>
                      <MapPin size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gold-primary)] pointer-events-none" />
                    </div>
                  </div>

                  {/* Upload Document / Jewellery Image Section */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        {quickServiceModal.category === "old_gold" ? (
                          <Camera size={12} className="text-[var(--gold-primary)]" />
                        ) : (
                          <FileText size={12} className="text-[var(--gold-primary)]" />
                        )}
                        <span>
                          {quickServiceModal.category === "old_gold"
                            ? "Upload Jewellery Photo / Bill"
                            : "Upload Loan Slip / Document"}
                        </span>
                      </span>
                      <span className="text-[9.5px] text-[var(--gold-light)] font-normal">
                        Optional ({quickServiceModal.category === "old_gold" ? "Photo / Bill" : "Slip / Notice / PDF"})
                      </span>
                    </label>

                    {quickUploadedFile ? (
                      <div className="flex items-center justify-between gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {quickUploadedFile.isImage && quickUploadedFile.previewUrl ? (
                            <img
                              src={quickUploadedFile.previewUrl}
                              alt="Upload Preview"
                              className="h-10 w-10 rounded-lg object-cover border border-emerald-500/40 shrink-0"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                              <FileText size={18} />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">
                              {quickUploadedFile.name}
                            </p>
                            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                              <Check size={10} /> {quickUploadedFile.size} •{" "}
                              {quickServiceModal.category === "old_gold" ? "Photo Ready" : "Document Ready"}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setQuickUploadedFile(null)}
                          className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 transition shrink-0 cursor-pointer"
                          title="Remove file"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ) : (
                      <label className="group relative flex flex-col items-center justify-center rounded-xl border border-dashed border-[rgba(212,175,55,0.35)] bg-[#121218] hover:bg-[#181824] hover:border-[var(--gold-primary)] px-3 py-3 text-center cursor-pointer transition">
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleQuickFileUpload}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-2 text-slate-300 group-hover:text-[var(--gold-light)] transition">
                          {quickServiceModal.category === "old_gold" ? (
                            <Camera size={16} className="text-[var(--gold-primary)] group-hover:scale-110 transition shrink-0" />
                          ) : (
                            <UploadCloud size={16} className="text-[var(--gold-primary)] group-hover:scale-110 transition shrink-0" />
                          )}
                          <span className="text-xs font-semibold">
                            {quickServiceModal.category === "old_gold"
                              ? "Click to upload Jewellery Photo ya Bill"
                              : "Click to upload Loan Slip ya Notice"}
                          </span>
                        </div>
                        <p className="text-[9.5px] text-slate-400 mt-1">
                          {quickServiceModal.category === "old_gold"
                            ? "Purane sone ke gehne ki photo ya purchase bill (PNG, JPG, PDF max 10MB)"
                            : "Bank / NBFC slip, notice ya sanction letter (PNG, JPG, PDF max 10MB)"}
                        </p>
                      </label>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-gold w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-bold shadow-gold rounded-xl cursor-pointer active:scale-[0.99]"
                    >
                      <Send size={14} />
                      <span>Send Request</span>
                      <ArrowRight size={14} />
                    </button>
                    <p className="text-[9px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                      <Lock size={10} className="text-[var(--gold-primary)]" /> 100% Confidential • Direct Gold Specialist Assistance
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
