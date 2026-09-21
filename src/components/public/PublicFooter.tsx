import React from "react";
import { Lock } from "lucide-react";
import logoMrajWordmark from "../../assets/mraj-wordmark.png";
import { trackEvent } from "../../analytics";

interface PublicFooterProps {
  onOpenAdmin: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer
      id="contact"
      className="bg-[#0a0a0e] py-8 sm:py-10 text-slate-400 text-xs border-t border-[rgba(212,175,55,0.18)]"
    >
      <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[rgba(212,175,55,0.12)]">
          <div className="flex items-center gap-2.5">
            <img
              src={logoMrajWordmark}
              alt="MRAJ"
              className="h-6 sm:h-7 w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]"
            />
            <div>
              <p className="brand-jewelers-text text-sm sm:text-base leading-tight">JEWELERS</p>
              <p className="text-[10px] text-[var(--gold-light)]">
                Gold Valuation & Loan Settlement Services
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-slate-300">
            <div>
              <strong className="text-white block font-serif text-[11.5px] uppercase tracking-wider text-[var(--gold-primary)]">Service Locations:</strong>
              <span className="text-[var(--gold-light)] font-bold text-xs sm:text-[13px]">
                Kalyani • Bidhannagar • Newtown
              </span>
            </div>
            <div>
              <strong className="text-white block font-serif text-[11.5px] uppercase tracking-wider text-[var(--gold-primary)]">Helpline & WhatsApp:</strong>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-amber-300 text-[11px] font-semibold">Call: +91 81011 21813</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 text-[11px] font-semibold">WhatsApp: +91 81011 21813</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500 text-center sm:text-left">
          <p>© 2025-2026 MRAJ JEWELERS. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <p>100% legal branch clearance process.</p>
            <span>•</span>
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                trackEvent("button_click", "Footer Staff/Admin Portal Link");
                trackEvent("popup_open", "Admin Panel Login Modal");
                onOpenAdmin();
                window.location.hash = "admin";
              }}
              className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-400 hover:text-[var(--gold-light)] transition cursor-pointer"
              title="Store Staff & Owner Login"
            >
              <Lock size={11} /> Staff / Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
