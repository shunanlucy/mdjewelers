import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Lock,
  Scale,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import photoValuation from "../../assets/photo-valuation.png";
import { GoldRatesConfig } from "../../types/admin";
import { lendersList } from "../../constants/publicData";
import { trackEvent } from "../../analytics";

interface LoanCalculatorSectionProps {
  goldRates: GoldRatesConfig;
  onOpenForm: (source?: string) => void;
  selectedCity: string;
}

export const LoanCalculatorSection: React.FC<LoanCalculatorSectionProps> = ({
  goldRates,
  onOpenForm,
  selectedCity,
}) => {
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [calcMode, setCalcMode] = useState<"cash" | "old_gold">("cash");
  const [goldGrams, setGoldGrams] = useState(48);
  const [goldPurity, setGoldPurity] = useState<"24K" | "22K" | "20K" | "18K">("22K");
  const [customGoldRate, setCustomGoldRate] = useState<number>(goldRates?.["22K"] || 7250);
  const [loanAmount, setLoanAmount] = useState(180000);
  const [selectedLender, setSelectedLender] = useState(lendersList[0].name);
  const [oldGoldItemType, setOldGoldItemType] = useState("Old Gold Jewellery");

  // Dynamic calculations based on user's custom gold rate input
  const ratePerGram = customGoldRate > 0 ? customGoldRate : 0;
  const totalMarketValue = Math.round(goldGrams * ratePerGram);
  const netCashInHand = Math.max(0, totalMarketValue - loanAmount);

  return (
    <>
      {/* Interactive Estimator Trigger Card */}
      <motion.div
        id="calculator"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative scroll-mt-20 sm:scroll-mt-24 mt-8 sm:mt-12 max-w-6xl xl:max-w-7xl mx-auto w-full min-w-0"
      >
        <div
          onClick={() => {
            trackEvent("card_click", "Estimator Preview Card Trigger");
            trackEvent("popup_open", "Settlement Calculator Modal");
            setCalcModalOpen(true);
          }}
          className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-br from-[#161624] via-[#1a1a2e] to-[#12121c] shadow-2xl shadow-black/80 hover:border-[var(--gold-primary)] hover:shadow-[0_10px_35px_rgba(212,175,55,0.22)] transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-stretch"
        >
          {/* Top ambient gold highlight line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent z-10" />

          {/* Left/Top Image Showcase with Generous Aspect Ratio */}
          <div className="relative w-full md:w-5/12 lg:w-4/12 h-[180px] sm:h-[220px] md:h-auto min-h-[200px] md:min-h-[260px] overflow-hidden bg-black/60 shrink-0">
            <img
              src={photoValuation}
              alt="Gold Valuation & Settlement"
              className="w-full h-full object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            {/* Smooth gradient blending */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#161624] via-[#161624]/35 to-transparent" />

            {/* Badges on Top of Image */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 z-10">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/85 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-xs font-bold text-[var(--gold-primary)] border border-[rgba(212,175,55,0.35)] shadow-md">
                <Sparkles size={11} /> Custom Rate Calculator
              </span>
              <span className="rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-xs font-bold shadow-md">
                ⚡ ₹0 Advance Fee
              </span>
            </div>
          </div>

          {/* Right/Bottom Content Side */}
          <div className="p-4 sm:p-6 md:p-7 flex-1 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(212,175,55,0.15)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)] shadow-sm shrink-0">
                  <Scale size={16} />
                </div>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
                  Sone Ka Sahi Value & Instant Settlement Hisaab Dekhein
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Apna custom gold rate aur weight enter karke bank loan settlement ya old gold sale ka exact cash payout turant calculate karein.
              </p>

              {/* Clean Feature Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] sm:text-xs text-slate-300">
                <span className="inline-flex items-center gap-1 bg-[#101018] px-2.5 py-1 rounded-lg border border-[rgba(212,175,55,0.2)]">
                  <Check size={12} className="text-[var(--gold-primary)] shrink-0" />
                  <span>Full Bank Loan Settlement</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-[#101018] px-2.5 py-1 rounded-lg border border-[rgba(212,175,55,0.2)]">
                  <Check size={12} className="text-[var(--gold-primary)] shrink-0" />
                  <span>Old Gold Spot Cash (0% Deduction)</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-[#101018] px-2.5 py-1 rounded-lg border border-[rgba(212,175,55,0.2)]">
                  <Check size={12} className="text-[var(--gold-primary)] shrink-0" />
                  <span>User Custom Rate Input</span>
                </span>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-3.5 border-t border-[rgba(212,175,55,0.18)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("button_click", "Estimator Card Open Calculator Button");
                  trackEvent("popup_open", "Settlement Calculator Modal");
                  setCalcModalOpen(true);
                }}
                className="btn-gold flex items-center justify-center gap-2 py-2.5 px-6 text-xs sm:text-sm font-bold shadow-gold rounded-xl transition cursor-pointer group-hover:brightness-110 active:scale-95"
              >
                <Scale size={16} />
                <span>Open Gold Calculator</span>
                <ArrowRight size={15} />
              </button>

              <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock size={12} className="text-[var(--gold-primary)]" /> 100% Free & Confidential • Locker handover in front of you
              </p>
            </div>
          </div>
        </div>
      </motion.div>


      {/* Settlement & Gold Estimator Pop-Up Modal */}
      <AnimatePresence>
        {calcModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex items-center justify-center bg-black/80 p-2 min-[360px]:p-3 sm:p-4 backdrop-blur-md overflow-y-auto"
            onMouseDown={() => setCalcModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl border border-[rgba(212,175,55,0.35)] bg-[#161622] p-4 sm:p-5 shadow-2xl shadow-black text-slate-200"
              role="dialog"
              aria-modal="true"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Top ambient gold accent bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent" />

              {/* Compact Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(212,175,55,0.2)]">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(212,175,55,0.15)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)]">
                    <Scale size={15} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white">
                    Gold Settlement Calculator
                  </h3>
                </div>
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
                  onClick={() => setCalcModalOpen(false)}
                  aria-label="Close Calculator"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body - Short & Simple */}
              <div className="mt-3 space-y-3">
                {/* 2 Modes Toggle: Full Cash & Sell Old Gold */}
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#101016] border border-[rgba(212,175,55,0.2)] text-center">
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("button_click", "Calculator Tab: Full Cash");
                      setCalcMode("cash");
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                      calcMode === "cash"
                        ? "bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#fef08a] text-black font-black shadow-[0_0_14px_rgba(212,175,55,0.7)]"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Wallet size={13} className={calcMode === "cash" ? "text-black" : "text-amber-400"} />
                    <span>Full Cash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("button_click", "Calculator Tab: Sell Old Gold");
                      setCalcMode("old_gold");
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                      calcMode === "old_gold"
                        ? "bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#fef08a] text-black font-black shadow-[0_0_14px_rgba(212,175,55,0.7)]"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Sparkles size={13} className={calcMode === "old_gold" ? "text-black" : "text-amber-400"} />
                    <span>Sell Old Gold</span>
                  </button>
                </div>

                {/* Gold Karat (Glowing) & Custom Rate in 1 Compact Block */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-300">Purity & Gold Rate</span>
                    <span className="text-[11px] text-[var(--gold-light)] font-bold">
                      {goldPurity} @ ₹{ratePerGram.toLocaleString("en-IN")}/g
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    {/* Glowing Karat Pills */}
                    <div className="grid grid-cols-4 gap-1.5 flex-1">
                      {(["24K", "22K", "20K", "18K"] as const).map((karat) => {
                        const isSelected = goldPurity === karat;
                        return (
                          <button
                            key={karat}
                            type="button"
                            onClick={() => {
                              trackEvent("button_click", `Calculator Purity: ${karat}`);
                              setGoldPurity(karat);
                              if (goldRates?.[karat]) {
                                setCustomGoldRate(goldRates[karat]);
                              }
                            }}
                            className={`py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-r from-[#ffe066] via-[#d4af37] to-[#fef08a] text-black font-black shadow-[0_0_20px_rgba(212,175,55,0.9)] border border-white scale-[1.03]"
                                : "bg-[#12121a] text-slate-300 border border-[rgba(212,175,55,0.2)] hover:text-white"
                            }`}
                          >
                            {karat}
                          </button>
                        );
                      })}
                    </div>

                    {/* Rate Input Field */}
                    <div className="flex items-center gap-1 bg-[#0e0e14] px-2 py-1.5 rounded-lg border border-[rgba(212,175,55,0.4)] focus-within:border-[var(--gold-light)] shrink-0">
                      <span className="text-xs font-bold text-[var(--gold-primary)]">₹</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="100"
                        step="50"
                        value={customGoldRate === 0 ? "" : customGoldRate}
                        onChange={(e) => {
                          const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                          setCustomGoldRate(isNaN(val) ? 0 : val);
                        }}
                        placeholder="7850"
                        className="w-16 bg-transparent text-right text-xs font-extrabold text-[var(--gold-light)] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-[10px] text-slate-400">/g</span>
                    </div>
                  </div>
                </div>

                {/* Lender / Item Type Dropdown */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    {calcMode === "old_gold"
                      ? "Item Type (Kisko Bechna Hai?)"
                      : "Where is gold pledged? (Bank / Lender)"}
                  </label>
                  {calcMode === "old_gold" ? (
                    <select
                      value={oldGoldItemType}
                      onChange={(e) => {
                        trackEvent("card_click", `Calc Item Type: ${e.target.value}`);
                        setOldGoldItemType(e.target.value);
                      }}
                      className="form-input text-xs py-1.5"
                    >
                      <option value="Old Gold Jewellery" className="bg-[#181824] text-white">Old Gold Jewellery</option>
                      <option value="Gold Bullion Coins & Bars" className="bg-[#181824] text-white">Gold Coins & Bars (999/916)</option>
                      <option value="Broken / Scrap Gold" className="bg-[#181824] text-white">Toota Ya Purana Scrap Sona</option>
                      <option value="Silver Items & Utensils" className="bg-[#181824] text-white">Silver Items & Sikke</option>
                    </select>
                  ) : (
                    <select
                      value={selectedLender}
                      onChange={(e) => {
                        trackEvent("card_click", `Calc Lender: ${e.target.value}`);
                        setSelectedLender(e.target.value);
                      }}
                      className="form-input text-xs py-1.5"
                    >
                      {lendersList.map((lender) => (
                        <option key={lender.name} value={lender.name} className="bg-[#181824] text-white">
                          {lender.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Weight Row (Slider + Quick Input) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">
                      {calcMode === "old_gold" ? "Gold Weight" : "Pledged Gold Weight"}
                    </span>
                    <div className="flex items-center gap-1 bg-[#101016] px-2 py-0.5 rounded border border-[rgba(212,175,55,0.3)]">
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={goldGrams === 0 ? "" : goldGrams}
                        onChange={(e) => {
                          const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                          setGoldGrams(isNaN(val) ? 0 : val);
                        }}
                        className="w-12 bg-transparent text-right text-xs font-bold text-[var(--gold-light)] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-[10px] text-slate-400">grams</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="1"
                    value={goldGrams}
                    onChange={(e) => setGoldGrams(Number(e.target.value))}
                    className="gold-range w-full cursor-pointer h-1.5"
                  />
                </div>

                {/* Loan Amount Row (Only for Full Cash) */}
                {calcMode === "cash" && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-semibold">Bank Loan Balance (Due)</span>
                      <div className="flex items-center gap-1 bg-[#101016] px-2 py-0.5 rounded border border-[rgba(212,175,55,0.3)]">
                        <span className="text-[11px] font-bold text-[var(--gold-primary)]">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          value={loanAmount === 0 ? "" : loanAmount}
                          onChange={(e) => {
                            const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                            setLoanAmount(isNaN(val) ? 0 : val);
                          }}
                          className="w-20 bg-transparent text-right text-xs font-bold text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max={Math.max(2500000, Math.ceil(loanAmount))}
                      step="5000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="gold-range w-full cursor-pointer h-1.5"
                    />
                  </div>
                )}

                {/* Short & Clean Calculation Result Box */}
                <div className="rounded-xl border border-[rgba(212,175,55,0.3)] bg-gradient-to-br from-[#121218] to-[#1a1a26] p-3 space-y-1.5 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Market Value ({goldGrams}g):</span>
                    <strong className="text-white font-bold">₹{totalMarketValue.toLocaleString("en-IN")}</strong>
                  </div>

                  {calcMode === "cash" && (
                    <div className="flex items-center justify-between text-xs text-rose-400">
                      <span>Bank Settlement:</span>
                      <strong className="font-bold">- ₹{loanAmount.toLocaleString("en-IN")}</strong>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[rgba(212,175,55,0.2)] flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wide text-[var(--gold-primary)]">
                        {calcMode === "cash" ? "Extra Cash Milega" : "Spot Cash Payout"}
                      </p>
                      <p className="text-[9.5px] text-slate-400">0% fee • Turant transfer</p>
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-[var(--gold-light)] leading-none">
                      ₹{(calcMode === "cash" ? netCashInHand : totalMarketValue).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
