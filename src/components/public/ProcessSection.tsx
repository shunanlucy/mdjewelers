import React from "react";
import { Banknote, Building2, FileText } from "lucide-react";
import { Reveal } from "../common/Reveal";

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 sm:scroll-mt-24 py-8 min-[380px]:py-10 sm:py-14 bg-[#14141c] border-b border-[rgba(212,175,55,0.15)]"
    >
      <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
        <Reveal className="text-center max-w-xl mx-auto">
          <span className="text-[10px] min-[360px]:text-[11px] font-bold uppercase tracking-widest gold-gradient-text">
            Simple & Transparent
          </span>
          <h2 className="mt-1 font-serif text-2xl min-[360px]:text-3xl font-bold text-white">
            Sona Release Process
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Transparent, secure aur hassle-free process.
          </p>
        </Reveal>

        <div className="mt-5 sm:mt-8 grid gap-3 sm:gap-5 md:gap-6 md:grid-cols-3 max-w-6xl xl:max-w-7xl mx-auto w-full">
          {[
            {
              step: "01",
              icon: FileText,
              title: "Details Share Karein",
              desc: "Loan slip ya gold details WhatsApp par share karein.",
            },
            {
              step: "02",
              icon: Building2,
              title: "Branch Assistance",
              desc: "Executive branch par loan settlement me assist karega.",
            },
            {
              step: "03",
              icon: Banknote,
              title: "Gold & Payout Handover",
              desc: "Sona aapke supurd aur remaining balance instant transfer.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="rounded-xl sm:rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[#181824] p-3.5 sm:p-5 md:p-6 flex md:flex-col items-start gap-3 hover:border-[var(--gold-primary)] hover:shadow-lg transition min-w-0"
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="rounded-md bg-[var(--gold-primary)] px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black text-black">
                    STEP {item.step}
                  </span>
                  <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-[rgba(212,175,55,0.1)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.25)]">
                    <Icon size={14} className="sm:hidden" />
                    <Icon size={18} className="hidden sm:block" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xs sm:text-base md:text-lg font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-[10.5px] sm:text-xs leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
