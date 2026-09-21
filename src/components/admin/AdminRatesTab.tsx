import React, { useEffect, useState } from "react";
import { Save, TrendingUp } from "lucide-react";
import { GoldRatesConfig } from "../../types/admin";

interface AdminRatesTabProps {
  rates: GoldRatesConfig;
  onSaveRates: (newRates: GoldRatesConfig) => void;
  onResetRates: () => void;
}

export const AdminRatesTab: React.FC<AdminRatesTabProps> = ({
  rates,
  onSaveRates,
  onResetRates,
}) => {
  const [editedRates, setEditedRates] = useState<GoldRatesConfig>(rates);

  useEffect(() => {
    setEditedRates(rates);
  }, [rates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveRates(editedRates);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(212,175,55,0.2)] pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-[var(--gold-primary)]" size={20} />
            Live Gold & Silver Rates Manager
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Roz subah yahan se naye rates update karein. "Save" karte hi poori website aur calculator par live ho jayenge.
          </p>
        </div>
        <button
          type="button"
          onClick={onResetRates}
          className="self-start sm:self-auto text-[11px] font-bold text-slate-400 hover:text-[var(--gold-light)] transition cursor-pointer"
        >
          Reset to Standard Defaults
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* 24K Gold */}
          <div className="rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#121218] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-[var(--gold-light)] uppercase tracking-wider block">
                  24K Pure Gold (99.9%)
                </span>
                <span className="text-[10px] text-slate-400">Standard Indian Bullion Benchmark</span>
              </div>
              <span className="rounded-md bg-amber-950/80 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/40">
                999 Purity
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-[rgba(212,175,55,0.4)] focus-within:border-[var(--gold-light)]">
              <span className="text-sm font-bold text-[var(--gold-primary)]">₹</span>
              <input
                type="number"
                value={editedRates["24K"]}
                onChange={(e) =>
                  setEditedRates({ ...editedRates, "24K": Number(e.target.value) })
                }
                className="w-full bg-transparent text-lg font-black text-white outline-none"
              />
              <span className="text-xs text-slate-400 font-semibold shrink-0">/ gram</span>
            </div>
          </div>

          {/* 22K Gold */}
          <div className="rounded-2xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-br from-[#181824] to-[#121218] p-4 space-y-2 ring-1 ring-[rgba(212,175,55,0.3)]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-[var(--gold-primary)] uppercase tracking-wider block">
                  22K Standard Gold (91.6%) ⭐ Primary
                </span>
                <span className="text-[10px] text-slate-400">Sabse zyada jewellery rate yahi hota hai</span>
              </div>
              <span className="rounded-md bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/40">
                916 BIS Hallmark
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-[rgba(212,175,55,0.5)] focus-within:border-[var(--gold-light)]">
              <span className="text-sm font-bold text-[var(--gold-primary)]">₹</span>
              <input
                type="number"
                value={editedRates["22K"]}
                onChange={(e) =>
                  setEditedRates({ ...editedRates, "22K": Number(e.target.value) })
                }
                className="w-full bg-transparent text-lg font-black text-[var(--gold-light)] outline-none"
              />
              <span className="text-xs text-slate-400 font-semibold shrink-0">/ gram</span>
            </div>
          </div>

          {/* 20K Gold */}
          <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider block">
                  20K Gold (83.3%)
                </span>
                <span className="text-[10px] text-slate-400">Traditional / Village Jewellery</span>
              </div>
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                833 Purity
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-[rgba(212,175,55,0.3)] focus-within:border-[var(--gold-light)]">
              <span className="text-sm font-bold text-[var(--gold-primary)]">₹</span>
              <input
                type="number"
                value={editedRates["20K"]}
                onChange={(e) =>
                  setEditedRates({ ...editedRates, "20K": Number(e.target.value) })
                }
                className="w-full bg-transparent text-lg font-black text-white outline-none"
              />
              <span className="text-xs text-slate-400 font-semibold shrink-0">/ gram</span>
            </div>
          </div>

          {/* 18K Gold */}
          <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider block">
                  18K Gold (75.0%)
                </span>
                <span className="text-[10px] text-slate-400">Diamond & Stone Studded Jewellery</span>
              </div>
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                750 Purity
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-[rgba(212,175,55,0.3)] focus-within:border-[var(--gold-light)]">
              <span className="text-sm font-bold text-[var(--gold-primary)]">₹</span>
              <input
                type="number"
                value={editedRates["18K"]}
                onChange={(e) =>
                  setEditedRates({ ...editedRates, "18K": Number(e.target.value) })
                }
                className="w-full bg-transparent text-lg font-black text-white outline-none"
              />
              <span className="text-xs text-slate-400 font-semibold shrink-0">/ gram</span>
            </div>
          </div>

          {/* Silver Rate */}
          <div className="rounded-2xl border border-slate-700 bg-[#121218] p-4 space-y-2 sm:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider block">
                  Silver (Chandi) Rate
                </span>
                <span className="text-[10px] text-slate-400">Chandi ke bartan, sikke & payal</span>
              </div>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                Silver 999
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-slate-600 focus-within:border-slate-300">
              <span className="text-sm font-bold text-slate-300">₹</span>
              <input
                type="number"
                value={editedRates.silver}
                onChange={(e) =>
                  setEditedRates({ ...editedRates, silver: Number(e.target.value) })
                }
                className="w-full bg-transparent text-lg font-black text-white outline-none"
              />
              <span className="text-xs text-slate-400 font-semibold shrink-0">
                / gram (₹{(editedRates.silver * 1000).toLocaleString("en-IN")}/kg)
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-sm sm:text-base font-bold shadow-gold rounded-xl cursor-pointer active:scale-[0.99]"
          >
            <Save size={18} />
            <span>Save & Publish Live Rates</span>
          </button>
        </div>
      </form>
    </div>
  );
};
