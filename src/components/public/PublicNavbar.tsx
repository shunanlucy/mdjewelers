import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  ChevronDown,
  HelpCircle,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Star,
  X,
} from "lucide-react";
import logoMrajWordmark from "../../assets/mraj-wordmark.png";
import { trackEvent } from "../../analytics";

interface PublicNavbarProps {
  isScrolled: boolean;
  onOpenForm: (source?: string) => void;
  onOpenAdmin: () => void;
  onScrollTo: (event: React.MouseEvent<HTMLAnchorElement>, target: string) => void;
  whatsappUrl: string;
  onOpenWhatsApp?: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  isScrolled,
  onOpenForm,
  onOpenAdmin,
  onScrollTo,
  whatsappUrl,
  onOpenWhatsApp,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[rgba(212,175,55,0.22)] bg-[#0e0e11]/95 shadow-xl shadow-black/50 backdrop-blur-md"
          : "border-b border-[rgba(212,175,55,0.15)] bg-[#0e0e11]/85 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-[44px] min-[360px]:h-[48px] sm:h-[54px] lg:h-[58px] max-w-[1440px] items-center justify-between px-2.5 sm:px-6 lg:px-10 gap-2 sm:gap-3">
        {/* MRAJ JEWELERS Brand Logo */}
        <a
          href="#top"
          onClick={(event) => onScrollTo(event, "#top")}
          className="group relative z-10 flex items-center gap-1.5 min-[360px]:gap-2 shrink-0"
          aria-label="MRAJ JEWELERS"
        >
          <img
            src={logoMrajWordmark}
            alt="MRAJ"
            className="h-3.5 min-[360px]:h-4 sm:h-5 lg:h-5.5 w-auto object-contain transition duration-300 group-hover:scale-105 shrink-0 drop-shadow-[0_1px_4px_rgba(212,175,55,0.25)]"
          />
          <span className="brand-jewelers-text text-[11px] min-[360px]:text-[12px] sm:text-[13.5px] lg:text-[14.5px] leading-none whitespace-nowrap pt-0.5">
            JEWELERS
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {[
            ["Services", "#services"],
            ["How It Works", "#how-it-works"],
            ["Partial Release", "#partial-release"],
            ["Calculator", "#calculator"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(event) => onScrollTo(event, href)}
              className="relative rounded-xl px-3.5 py-1.5 text-[13px] font-semibold text-slate-300 hover:text-[var(--gold-light)] hover:bg-white/5 transition-all duration-150 whitespace-nowrap"
            >
              {label}
            </a>
          ))}

          {/* Smooth 'More' Dropdown */}
          <div className="relative" id="more-menu-container">
            <button
              onClick={() => setMoreMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1 rounded-xl px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
                moreMenuOpen
                  ? "bg-[rgba(212,175,55,0.15)] text-[var(--gold-light)]"
                  : "text-slate-300 hover:text-[var(--gold-light)] hover:bg-white/5"
              }`}
              aria-expanded={moreMenuOpen}
            >
              <span>More</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  moreMenuOpen ? "rotate-180 text-[var(--gold-primary)]" : "text-slate-400"
                }`}
              />
            </button>

            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-64 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#181824] p-2 shadow-2xl backdrop-blur-md z-50"
                >
                  <div className="flex flex-col gap-0.5">
                    {[
                      {
                        label: "Auction Notice Relief",
                        href: "#auction-alert",
                        icon: <AlertTriangle size={16} className="text-rose-400" />,
                        desc: "Urgent bank auction prevention help",
                      },
                      {
                        label: "Customer Feedback & Reviews",
                        href: "#reviews",
                        icon: <Star size={16} className="text-[var(--gold-primary)]" />,
                        desc: "Verified 4.9★ client experiences",
                      },
                      {
                        label: "Frequently Asked Questions",
                        href: "#faq",
                        icon: <HelpCircle size={16} className="text-emerald-400" />,
                        desc: "Clear answers to your questions",
                      },
                      {
                        label: "Service Locations & Contact",
                        href: "#contact",
                        icon: <Building2 size={16} className="text-amber-400" />,
                        desc: "Kalyani, Bidhannagar & Newtown",
                      },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(event) => {
                          onScrollTo(event, item.href);
                          setMoreMenuOpen(false);
                        }}
                        className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-white/5 transition duration-150"
                      >
                        <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-[#21212e] group-hover:bg-[rgba(212,175,55,0.15)] transition shrink-0">
                          {item.icon}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-200 group-hover:text-[var(--gold-light)] transition">
                            {item.label}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop CTAs */}
        <div className="relative z-10 hidden items-center gap-2.5 lg:flex shrink-0">
          <button
            onClick={() => {
              trackEvent("button_click", "Admin Portal Trigger Header");
              onOpenAdmin();
            }}
            className="flex items-center gap-1 rounded-xl border border-[rgba(212,175,55,0.25)] bg-[#14141e] hover:bg-[rgba(212,175,55,0.15)] px-2.5 py-1.5 text-xs font-bold text-[var(--gold-light)] transition cursor-pointer"
            title="Owner & Staff Portal"
          >
            <Shield size={12} className="text-[var(--gold-primary)]" />
            <span>Admin</span>
          </button>

          <a
            href="tel:+918101121813"
            onClick={() => trackEvent("button_click", "Header Call Button (+91 81011 21813)")}
            className="hidden xl:flex items-center gap-1.5 rounded-xl border border-[rgba(212,175,55,0.3)] bg-white/5 px-3.5 py-1.5 text-xs font-bold text-[var(--gold-light)] hover:border-[var(--gold-primary)] hover:bg-[rgba(212,175,55,0.12)] transition duration-150"
            title="Call: +91 81011 21813"
          >
            <Phone size={13} className="text-[var(--gold-primary)]" />
            <span>+91 81011 21813</span>
          </a>
          <button
            type="button"
            onClick={() => {
              trackEvent("button_click", "Header WhatsApp Button");
              if (onOpenWhatsApp) onOpenWhatsApp();
              else window.open(whatsappUrl, "_blank");
            }}
            className="btn-whatsapp flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => {
              trackEvent("button_click", "Header Get Free Quote Button");
              onOpenForm("header");
            }}
            className="btn-gold flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            <span>Get Free Quote</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Mobile Quick Action Buttons */}
        <div className="flex items-center gap-1.5 lg:hidden shrink-0">
          <button
            onClick={onOpenAdmin}
            className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#14141e] text-[var(--gold-light)] border border-[rgba(212,175,55,0.25)] hover:bg-[rgba(212,175,55,0.15)] transition shrink-0 cursor-pointer"
            aria-label="Admin Portal"
            title="Admin"
          >
            <Shield size={13} />
          </button>
          <a
            href="tel:+918101121813"
            onClick={() => trackEvent("button_click", "Mobile Header Call Button")}
            className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#181824] text-[var(--gold-light)] border border-[rgba(212,175,55,0.25)] hover:bg-[rgba(212,175,55,0.15)] transition shrink-0"
            aria-label="Call MRAJ JEWELERS"
          >
            <Phone size={12} />
          </a>
          <button
            type="button"
            onClick={() => {
              trackEvent("button_click", "Mobile Header WhatsApp Button");
              if (onOpenWhatsApp) onOpenWhatsApp();
              else window.open(whatsappUrl, "_blank");
            }}
            className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-emerald-950/60 text-[#25d366] border border-emerald-500/40 hover:bg-emerald-900/60 transition shrink-0 cursor-pointer"
            aria-label="WhatsApp MRAJ JEWELERS"
          >
            <MessageCircle size={13} />
          </button>
          <button
            className="flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.25)] bg-[#181824] text-slate-200 hover:text-[var(--gold-light)] transition shrink-0 cursor-pointer"
            onClick={() => {
              const next = !mobileOpen;
              if (next) trackEvent("popup_open", "Mobile Navigation Drawer");
              setMobileOpen(next);
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </nav>

      {/* Compact Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-2.5 sm:right-6 top-[calc(100%+6px)] z-50 w-56 min-[360px]:w-60 rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#181824]/98 p-2 shadow-2xl backdrop-blur-xl lg:hidden text-white"
            >
              <div className="flex flex-col gap-0.5">
                {[
                  ["Key Services", "#services"],
                  ["How It Works (3 Steps)", "#how-it-works"],
                  ["Settlement Calculator", "#calculator"],
                  ["Auction Notice Relief", "#auction-alert"],
                  ["Customer Feedback", "#reviews"],
                  ["Frequently Asked Questions", "#faq"],
                  ["Locations & Contact", "#contact"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={(event) => {
                      trackEvent("button_click", `Mobile Nav Link: ${label}`);
                      onScrollTo(event, href);
                      setMobileOpen(false);
                    }}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-[rgba(212,175,55,0.12)] hover:text-[var(--gold-light)] transition"
                  >
                    <span>{label}</span>
                    <ChevronDown size={12} className="text-slate-500 -rotate-90" />
                  </a>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-[rgba(212,175,55,0.18)] flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("button_click", "Mobile Drawer WhatsApp Button");
                    setMobileOpen(false);
                    if (onOpenWhatsApp) onOpenWhatsApp();
                    else window.open(whatsappUrl, "_blank");
                  }}
                  className="btn-whatsapp flex w-full items-center justify-center gap-1.5 py-2 text-xs font-bold cursor-pointer"
                >
                  <MessageCircle size={14} /> WhatsApp Chat
                </button>
                <button
                  onClick={() => {
                    trackEvent("button_click", "Mobile Drawer Settlement Call Button");
                    setMobileOpen(false);
                    onOpenForm("mobile_drawer");
                  }}
                  className="btn-gold flex w-full items-center justify-center gap-1.5 py-2 text-xs font-bold cursor-pointer"
                >
                  Free Settlement Call <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
