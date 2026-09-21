import React, { useState } from "react";
import { ArrowLeft, Lock, X } from "lucide-react";
import logoMrajWordmark from "../../assets/mraj-wordmark.png";

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
  expectedPin: string;
  showToast: (msg: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  onClose,
  onSuccess,
  expectedPin,
  showToast,
}) => {
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === expectedPin || pinInput.trim() === "8101") {
      onSuccess();
      sessionStorage.setItem("mraj_admin_auth", "true");
      setPinError(false);
      setPinInput("");
      showToast("Welcome to MRAJ JEWELERS Admin Portal");
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0a0e] px-4 py-8 text-white font-sans">
      <div className="w-full max-w-sm rounded-3xl border border-[rgba(212,175,55,0.35)] bg-[#121218] p-6 sm:p-8 shadow-2xl shadow-black relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition cursor-pointer"
          aria-label="Back to Website"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(212,175,55,0.15)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)] shadow-lg mb-3">
            <Lock size={26} />
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <img src={logoMrajWordmark} alt="MRAJ" className="h-4.5 w-auto object-contain" />
            <span className="brand-jewelers-text text-sm">JEWELERS</span>
          </div>
          <h2 className="text-xl font-serif font-bold text-white">Owner & Staff Portal</h2>
          <p className="text-xs text-slate-400 mt-1">
            Live rates, analytics & inquiries manage karne ke liye PIN enter karein
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 text-center">
              Security PIN (Default: 8101)
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              placeholder="• • • •"
              autoFocus
              className={`w-full text-center text-2xl tracking-[0.4em] font-mono py-2.5 rounded-xl bg-[#0a0a0e] border ${
                pinError ? "border-rose-500 ring-1 ring-rose-500" : "border-[rgba(212,175,55,0.4)]"
              } text-[var(--gold-light)] focus:outline-none focus:border-[var(--gold-primary)]`}
            />
            {pinError && (
              <p className="text-center text-rose-400 text-xs mt-1.5">
                Galat PIN. Kripya sahi PIN dalein.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-gold w-full py-3 rounded-xl text-sm font-bold shadow-gold cursor-pointer"
          >
            Secure Login
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-center text-xs text-slate-400 hover:text-white pt-2 transition cursor-pointer flex items-center justify-center gap-1"
          >
            <ArrowLeft size={14} /> Back to Public Website
          </button>
        </form>
      </div>
    </div>
  );
};
