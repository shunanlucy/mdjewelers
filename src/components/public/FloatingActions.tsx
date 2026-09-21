import React from "react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "../../analytics";

interface FloatingActionsProps {
  whatsappUrl: string;
  onOpenForm: (source?: string) => void;
  onOpenWhatsApp?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  whatsappUrl,
  onOpenForm,
  onOpenWhatsApp,
}) => {
  const handleWhatsAppClick = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <>
      {/* Desktop Floating WhatsApp Quick Trigger (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <button
          type="button"
          onClick={() => {
            trackEvent("button_click", "Floating Desktop WhatsApp Button");
            handleWhatsAppClick();
          }}
          className="btn-whatsapp flex items-center gap-2 rounded-2xl px-5 py-3 shadow-2xl hover:scale-105 transition duration-200 group cursor-pointer"
        >
          <MessageCircle size={22} className="group-hover:rotate-12 transition" />
          <span className="text-xs font-extrabold tracking-wide">WhatsApp Chat</span>
        </button>
      </div>

      {/* Mobile Sticky Quick Action Bar (Ultra-responsive on 320px-360px Android devices) */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-[rgba(212,175,55,0.25)] bg-[#0e0e11]/95 backdrop-blur-md px-2 min-[360px]:px-3 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center gap-1.5 min-[360px]:gap-2">
        <a
          href="tel:+918101121813"
          onClick={() => trackEvent("button_click", "Sticky Mobile Bar Call Button")}
          className="flex flex-col items-center justify-center rounded-xl bg-[#181824] px-2 min-[360px]:px-2.5 py-1.5 min-[360px]:py-2 text-slate-200 border border-[rgba(212,175,55,0.25)] min-w-[48px] min-[360px]:min-w-[52px] shrink-0 hover:border-[var(--gold-primary)] transition"
        >
          <Phone size={15} className="text-[var(--gold-primary)]" />
          <span className="text-[9px] min-[360px]:text-[10px] font-bold mt-0.5">Call</span>
        </a>
        <button
          type="button"
          onClick={() => {
            trackEvent("button_click", "Sticky Mobile Bar WhatsApp Button");
            handleWhatsAppClick();
          }}
          className="btn-whatsapp btn-mobile-sticky flex-1 flex items-center justify-center gap-1.5 rounded-xl text-[11px] min-[360px]:text-xs font-bold text-white whitespace-nowrap cursor-pointer"
        >
          <MessageCircle size={15} className="shrink-0" />
          <span>WhatsApp</span>
        </button>
        <button
          onClick={() => {
            trackEvent("button_click", "Sticky Mobile Bar Release Sona Button");
            onOpenForm("sticky_mobile");
          }}
          className="btn-gold btn-mobile-sticky flex-1 flex items-center justify-center gap-1.5 rounded-xl text-[11px] min-[360px]:text-xs font-bold cursor-pointer active:scale-[0.99] whitespace-nowrap"
        >
          <span>Release Sona</span>
          <ArrowRight size={13} className="shrink-0" />
        </button>
      </div>
    </>
  );
};
