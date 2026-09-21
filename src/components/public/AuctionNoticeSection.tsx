import React from "react";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { lendersList } from "../../constants/publicData";
import { trackEvent } from "../../analytics";

interface AuctionNoticeSectionProps {
  whatsappUrl: string;
}

export const AuctionNoticeSection: React.FC<AuctionNoticeSectionProps> = () => {
  const hiWhatsappUrl = "https://wa.me/918101121813?text=Hi";

  return (
    <section
      id="auction-alert"
      className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-8 bg-[#0e0e11] border-b border-[rgba(212,175,55,0.18)]"
    >
      <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
        {/* COMPACT & RESPONSIVE VIDEO BUTTON CARD */}
        <div className="w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[660px] mx-auto">
          <div
            onClick={() => {
              trackEvent("card_click", "Auction Alert Video Card");
              window.open(hiWhatsappUrl, "_blank");
            }}
            className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.3)] shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.12)] bg-black cursor-pointer transition-all duration-300 hover:border-[var(--gold-primary)] hover:shadow-[0_12px_45px_rgba(212,175,55,0.22)]"
          >
            <video
              src="./Animate_this_image.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-[16/9] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
            />

            {/* Subtle interactive hover highlight */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-white/[0.03] transition-colors pointer-events-none" />

            {/* Top Info Badge */}
            <div className="absolute top-2 sm:top-3.5 left-2 sm:left-4 z-20">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/85 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8.5px] min-[360px]:text-[9.5px] sm:text-[11px] font-bold text-[var(--gold-light)] border border-[rgba(212,175,55,0.3)] shadow-md">
                <AlertTriangle size={11} className="text-amber-400 shrink-0" /> Auction Notice Assistance
              </span>
            </div>

            {/* Compact WhatsApp Action Button */}
            <div className="absolute bottom-2 right-2 sm:bottom-3.5 sm:right-4 z-20">
              <a
                href={hiWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("button_click", "Auction Alert Consult WhatsApp Button");
                  window.open(hiWhatsappUrl, "_blank");
                }}
                className="btn-whatsapp flex items-center justify-center gap-1.5 py-1.5 sm:py-2.5 px-3 sm:px-4 text-[10.5px] min-[360px]:text-xs sm:text-xs font-bold shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <MessageCircle size={14} className="text-white shrink-0 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">Consult on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Supported Lenders Quick Row */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 mr-1">Supported Lenders:</span>
          {lendersList.slice(0, 8).map((lender) => (
            <span
              key={lender.name}
              onClick={() => trackEvent("card_click", `Supported Lender: ${lender.name}`)}
              className="rounded-lg bg-[#181824] border border-[rgba(212,175,55,0.18)] px-2.5 py-1 text-[11px] font-medium text-slate-300 cursor-pointer hover:border-[var(--gold-primary)] transition"
            >
              {lender.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
