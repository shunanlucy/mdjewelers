import React from "react";
import { ArrowRight, FileCheck, Sparkles } from "lucide-react";
import serviceLockedGold from "../../assets/service-locked-gold.jpg";
import serviceVintageGold from "../../assets/service-vintage-gold.jpg";
import { Reveal } from "../common/Reveal";
import { trackEvent } from "../../analytics";

interface ServicesSectionProps {
  onOpenQuickModal: (type: "gold_loan" | "old_gold") => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenQuickModal,
}) => {
  return (
    <section
      id="services"
      className="scroll-mt-20 sm:scroll-mt-24 py-8 min-[380px]:py-10 sm:py-14 bg-[#0e0e11] border-b border-[rgba(212,175,55,0.18)]"
    >
      <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(212,175,55,0.12)] px-3 py-0.5 text-[10px] min-[360px]:text-[11px] font-extrabold uppercase tracking-widest text-[var(--gold-light)] border border-[rgba(212,175,55,0.3)]">
            <Sparkles size={12} className="text-[var(--gold-primary)]" /> MRAJ JEWELERS Solutions
          </span>
          <h2 className="mt-2 font-serif text-2xl min-[360px]:text-3xl sm:text-4xl font-bold text-white leading-tight">
            Gold Settlement & <span className="gold-gradient-text">Release Solutions</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
            Transparent evaluation, branch loan settlement assistance aur live gold market rates.
          </p>
        </Reveal>

        {/* 2 Interactive Box Cards with Generous Desktop Proportions */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 lg:gap-8 max-w-6xl xl:max-w-7xl mx-auto w-full min-w-0">
          {/* Card 1: Gold Loan Settlement */}
          <div
            onClick={() => {
              trackEvent("card_click", "Service Card: Gold Loan Settlement");
              onOpenQuickModal("gold_loan");
            }}
            className="group flex flex-col rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#181824] shadow-xl hover:border-[var(--gold-primary)] hover:shadow-gold transition-all duration-300 overflow-hidden cursor-pointer active:scale-[0.99]"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#121218]">
              <img
                src={serviceLockedGold}
                alt="Gold Loan Settlement"
                className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181824] via-black/20 to-transparent opacity-90" />
              <span className="absolute top-2.5 right-2.5 rounded-full px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md bg-amber-950/85 text-amber-300 border border-amber-500/40">
                🔒 Locked Gold Release
              </span>
              <div className="absolute bottom-2.5 left-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#181824]/90 text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)] shadow-md">
                <FileCheck size={16} />
              </div>
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#181824]">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[var(--gold-light)] transition leading-tight">
                  Gold Loan Settlement
                </h3>
                <p className="text-[11px] font-semibold text-[var(--gold-primary)] mt-0.5">
                  Girvi Sona Release • ₹0 Advance Fee
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("button_click", "Service Card CTA: Release Sona");
                  onOpenQuickModal("gold_loan");
                }}
                className="btn-gold flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-bold shadow-gold rounded-xl cursor-pointer active:scale-[0.99] shrink-0"
              >
                <span>Release Sona</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Card 2: Sell Old Gold & Silver */}
          <div
            onClick={() => {
              trackEvent("card_click", "Service Card: Sell Old Gold & Silver");
              onOpenQuickModal("old_gold");
            }}
            className="group flex flex-col rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#181824] shadow-xl hover:border-[var(--gold-primary)] hover:shadow-gold transition-all duration-300 overflow-hidden cursor-pointer active:scale-[0.99]"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#121218]">
              <img
                src={serviceVintageGold}
                alt="Sell Old Gold & Silver"
                className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181824] via-black/20 to-transparent opacity-90" />
              <span className="absolute top-2.5 right-2.5 rounded-full px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md bg-[#251e0e]/90 text-[var(--gold-light)] border border-[rgba(212,175,55,0.4)]">
                💎 Live Gold Rate
              </span>
              <div className="absolute bottom-2.5 left-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#181824]/90 text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)] shadow-md">
                <Sparkles size={16} />
              </div>
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#181824]">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[var(--gold-light)] transition leading-tight">
                  Sell Old Gold & Silver
                </h3>
                <p className="text-[11px] font-semibold text-[var(--gold-primary)] mt-0.5">
                  Highest Market Value • Instant Cash / UPI
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("button_click", "Service Card CTA: Check Old Value");
                  onOpenQuickModal("old_gold");
                }}
                className="btn-gold flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-bold shadow-gold rounded-xl cursor-pointer active:scale-[0.99] shrink-0"
              >
                <span>Check Old Value</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
