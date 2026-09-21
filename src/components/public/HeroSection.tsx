import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  Lock,
  MessageCircle,
  Scale,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { trackEvent } from "../../analytics";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

interface HeroSectionProps {
  onOpenForm: (source?: string) => void;
  whatsappUrl: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenForm,
  whatsappUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-4 pb-10 min-[380px]:pt-6 min-[380px]:pb-14 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 bg-gradient-to-b from-[#14141d] via-[#0e0e11] to-[#0e0e11]"
    >
      {/* Ambient radial gold spotlight */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.14),transparent_70%)]" />

      {/* RESPONSIVE HERO CONTAINER: Stacked on Mobile, Majestic 2-Column on Desktop */}
      <div className="relative mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
          
          {/* VIDEO SHOWCASE: Top on mobile (<lg), Right Column on desktop (lg:order-2 lg:col-span-5) */}
          <div className="lg:order-2 lg:col-span-5 w-full">
            <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.3)] shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)] bg-black group">
              <video
                ref={videoRef}
                src="./hero-gold-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[220px] min-[400px]:h-[270px] sm:h-[340px] md:h-[400px] lg:h-[500px] xl:h-[540px] object-cover object-center"
              />
              {/* Cinematic Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/25 to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(14,14,17,0.7)_100%)] pointer-events-none" />

              {/* Floating Status Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/85 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-xs font-bold text-[var(--gold-primary)] border border-[rgba(212,175,55,0.35)] shadow-md">
                  ✨ Certified Jewellery
                </span>
                <span className="rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-xs font-bold shadow-md">
                  ⚡ ₹0 Advance Fee
                </span>
              </div>

              {/* Bottom Video Info */}
              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 z-10">
                <p className="text-[10px] min-[360px]:text-xs font-bold uppercase tracking-widest text-[var(--gold-primary)] mb-0.5 drop-shadow">
                  Kalyani • Bidhannagar • Newtown
                </p>
                <h3 className="font-serif text-sm min-[360px]:text-base sm:text-lg lg:text-xl font-bold text-white leading-snug drop-shadow-lg">
                  MRAJ JEWELERS — Gold Valuation & Settlement
                </h3>
              </div>
            </div>
          </div>

          {/* CONTENT SIDE: Below video on mobile (<lg), Left Column on desktop (lg:order-1 lg:col-span-7) */}
          <div className="lg:order-1 lg:col-span-7 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="w-full flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Pill Badge */}
              <motion.div variants={fadeUp} className="mb-2 sm:mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(212,175,55,0.12)] px-3 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[var(--gold-light)] border border-[rgba(212,175,55,0.3)]">
                  Certified Hallmarked Jewellery Service
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-serif font-bold text-2xl min-[360px]:text-3xl min-[420px]:text-4xl sm:text-5xl lg:text-5xl xl:text-[3.25rem] leading-[1.14] sm:leading-[1.1] tracking-tight text-white break-words w-full"
              >
                Girvi Gold Loan Settlement &{" "}
                <span className="gold-gradient-text">
                  Jewellery Release
                </span>{" "}
                Services.
              </motion.h1>

              {/* Point-based information */}
              <motion.div variants={fadeUp} className="mt-3.5 sm:mt-4 w-full max-w-xl">
                <p className="text-xs min-[360px]:text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                  <strong className="text-[var(--gold-light)] font-semibold">MRAJ JEWELERS</strong> — Bank ya NBFC me girvi sona release karne me sahulat:
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Check size={13} className="text-[var(--gold-primary)] shrink-0" />
                    <span>Live gold market benchmark valuation</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check size={13} className="text-[var(--gold-primary)] shrink-0" />
                    <span>Zero upfront advance fee</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check size={13} className="text-[var(--gold-primary)] shrink-0" />
                    <span>Direct locker handover</span>
                  </span>
                </div>
              </motion.div>

              {/* 4 Sleek Feature Chips */}
              <motion.div
                variants={fadeUp}
                className="mt-4 sm:mt-5 grid grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-xl text-left"
              >
                {[
                  {
                    title: "Zero Advance Fee",
                    desc: "Direct branch settlement",
                    icon: Zap,
                  },
                  {
                    title: "Partial Release",
                    desc: "Retain required jewellery",
                    icon: Scale,
                  },
                  {
                    title: "Instant Payout",
                    desc: "Bank transfer / UPI",
                    icon: Wallet,
                  },
                  {
                    title: "Secure Process",
                    desc: "Complete loan closure NOC",
                    icon: ShieldCheck,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    onClick={() => trackEvent("card_click", `Hero Chip: ${item.title}`)}
                    className="group relative flex items-center sm:items-start gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[#181824]/95 p-2.5 sm:p-3 shadow-sm hover:border-[var(--gold-primary)] transition-all duration-200 min-w-0 cursor-pointer"
                  >
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(212,175,55,0.1)] text-[var(--gold-light)] border border-[rgba(212,175,55,0.2)]">
                      <item.icon size={13} className="sm:hidden" />
                      <item.icon size={16} className="hidden sm:block" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] sm:text-xs md:text-sm font-bold text-white leading-tight truncate">
                        {item.title}
                      </p>
                      <p className="text-[9px] sm:text-[10.5px] text-slate-400 mt-0.5 leading-tight truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons & Micro-Guarantees */}
              <motion.div variants={fadeUp} className="mt-5 sm:mt-6 w-full max-w-xl">
                <div className="flex items-center justify-center lg:justify-start w-full">
                  <button
                    onClick={() => {
                      trackEvent("button_click", "Hero CTA: Get Settlement Quotation");
                      onOpenForm("hero_primary");
                    }}
                    className="btn-gold group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-xs min-[360px]:text-sm sm:text-base font-bold shadow-gold rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer active:scale-[0.99] w-full sm:w-auto"
                  >
                    <Zap size={16} className="text-[#0e0e11] fill-[#0e0e11] shrink-0" />
                    <span>Get Settlement Quotation</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-[10px] min-[360px]:text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1 shrink-0">
                    <Lock size={12} className="text-[var(--gold-primary)] shrink-0" /> Confidential Service
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 shrink-0">
                    <Clock size={12} className="text-[var(--gold-light)] shrink-0" /> Prompt Response
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 shrink-0">
                    <ShieldCheck size={12} className="text-emerald-400 shrink-0" /> Verified Process
                  </span>
                </div>
              </motion.div>

              {/* Metric Highlights */}
              <motion.div
                variants={fadeUp}
                className="mt-5 sm:mt-6 rounded-xl sm:rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#181824]/90 p-3 sm:p-4 shadow-xl backdrop-blur-md w-full max-w-xl"
              >
                <div className="grid grid-cols-2 divide-x divide-[rgba(212,175,55,0.18)] text-center w-full items-center">
                  <div className="px-2 sm:px-4 flex flex-col items-center justify-center">
                    <p className="text-sm min-[360px]:text-base sm:text-2xl font-black tracking-tight text-white whitespace-nowrap">
                      1,000 - 2,500+
                    </p>
                    <p className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs font-semibold text-slate-300 mt-0.5 leading-tight">
                      Families Helped
                    </p>
                  </div>
                  <div className="px-2 sm:px-4 flex flex-col items-center justify-center">
                    <p className="text-sm min-[360px]:text-base sm:text-2xl font-black tracking-tight text-[var(--gold-light)] flex items-center justify-center gap-1 whitespace-nowrap">
                      4.9 <span className="text-[var(--gold-primary)] text-xs sm:text-base">★</span>
                    </p>
                    <p className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs font-semibold text-slate-300 mt-0.5 leading-tight">
                      Google Rating
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
