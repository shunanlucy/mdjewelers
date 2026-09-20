import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BadgePercent,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coins,
  FileCheck,
  FileText,
  HelpCircle,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Percent,
  Phone,
  Play,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Volume2,
  VolumeX,
  Wallet,
  X,
  Zap,
} from "lucide-react";

import photoGoldLoan from "./assets/photo-gold-loan.png";
import photoSellJewellery from "./assets/photo-sell-jewellery.png";
import photoInstantCash from "./assets/photo-instant-cash.png";
import photoValuation from "./assets/photo-valuation.png";
import photoSafeProcess from "./assets/photo-safe-process.png";
import logoMrajWordmark from "./assets/mraj-wordmark.png";
import serviceLockedGold from "./assets/service-locked-gold.jpg";
import serviceVintageGold from "./assets/service-vintage-gold.jpg";
import { AdminPanel, GoldRatesConfig } from "./AdminPanel";

// Live gold rates (indicative Indian market rates per gram)
const GOLD_RATES = {
  "24K": 7850,
  "22K": 7210,
  "20K": 6550,
  "18K": 5910,
};

const lendersList = [
  { name: "Muthoot Finance", color: "bg-[#1a171d] text-rose-300 border-rose-500/30" },
  { name: "Manappuram Finance", color: "bg-[#1f1b13] text-amber-300 border-amber-500/30" },
  { name: "SBI Gold Loan", color: "bg-[#131b24] text-blue-300 border-blue-500/30" },
  { name: "HDFC Bank", color: "bg-[#161626] text-indigo-300 border-indigo-500/30" },
  { name: "IIFL Gold Loan", color: "bg-[#211a14] text-orange-300 border-orange-500/30" },
  { name: "ICICI Bank", color: "bg-[#221419] text-rose-300 border-rose-500/30" },
  { name: "Shriram Finance", color: "bg-[#1d1424] text-purple-300 border-purple-500/30" },
  { name: "Muthoot Fincorp", color: "bg-[#131926] text-sky-300 border-sky-500/30" },
  { name: "Federal Bank", color: "bg-[#132219] text-emerald-300 border-emerald-500/30" },
  { name: "Canara Bank", color: "bg-[#122024] text-cyan-300 border-cyan-500/30" },
  { name: "Axis Bank", color: "bg-[#22141d] text-pink-300 border-pink-500/30" },
  { name: "Other Bank / NBFC", color: "bg-[#1a1a24] text-slate-300 border-[rgba(212,175,55,0.2)]" },
];

const citiesList = [
  "Delhi NCR",
  "Mumbai",
  "Pune",
  "Ahmedabad",
  "Bengaluru",
  "Hyderabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kolkata",
];

const liveTickerFeed = [
  "Gold loan settlement & release assistance available across Kolkata, Bowbazar & Greater Bengal",
  "Muthoot, Manappuram & Bank gold loan clearances processed daily",
  "Live 24K / 22K Gold Market Rate valuation with computerized testing",
  "Partial release option available — retain required jewellery safely",
];

const faqs = [
  {
    question: "Kya sona release ke liye pehle koi advance fees deni hoti hai?",
    answer:
      "Nahi, advance fees nahi lagti. Branch counter par loan settlement ke dauran poora hisaab clear hota hai.",
  },
  {
    question: "Kya Partial Gold Release ki suvidha uplabdh hai?",
    answer:
      "Haan, agar aap poora sona nahi bechna chahte to sirf loan amount clear karne bhar ka sona sell karke bachi hui jewellery retain kar sakte hain.",
  },
  {
    question: "Kya bina loan ke physical gold ya coins sell kiye ja sakte hain?",
    answer:
      "Haan, ghar par rakha purana sona, coins ya chandi live gold market rate par direct sell kiye ja sakte hain. Computerized testing ke baad turant payment transfer hoti hai.",
  },
  {
    question: "Bank ya NBFC se notice aane par kya settlement sambhav hai?",
    answer:
      "Haan, scheduled auction se pehle branch me loan account settle karwaya ja sakta hai. WhatsApp par slip share karke quotation prapt kar sakte hain.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={fadeUp}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const highlightedServices = [
  {
    id: "gold-loan-settlement",
    title: "Gold Loan Settlement",
    hindi: "Bank / NBFC Se Sona Release",
    pill: "🔒 Locked Gold Release",
    pillColor: "bg-amber-950/80 text-amber-300 border-amber-500/40",
    image: serviceLockedGold,
    icon: FileCheck,
    desc: "Bank ya NBFC me girvi sona chhudwane me poori sahayata. Counter par loan settlement aur instant payout.",
    bullets: [
      "Branch counter settlement assistance",
      "Direct bank locker handover",
    ],
    actionText: "Calculate Settlement",
    actionType: "calculator",
  },
  {
    id: "sell-old-gold",
    title: "Sell Old Gold & Silver",
    hindi: "Live Gold Market Rate",
    pill: "💎 Live Gold Rate",
    pillColor: "bg-[#251e0e]/90 text-[var(--gold-light)] border-[rgba(212,175,55,0.4)]",
    image: serviceVintageGold,
    icon: Sparkles,
    desc: "Ghar par rakha purana sona aur chandi aaj ke live gold market rate par bechein. Computerized testing aur transparent payout.",
    bullets: [
      "Computerized purity testing",
      "Direct bank/UPI transfer",
    ],
    actionText: "Check Old Gold Value",
    actionType: "old_gold",
  },
];

const LOCATION_OPTIONS = [
  "Bowbazar (B.B. Ganguly St / Central Gold Hub)",
  "Burrabazar / Posta (Bullion Market)",
  "Gariahat / Ballygunge (South Kolkata)",
  "Park Street / Camac Street / Central Kolkata",
  "Salt Lake (Bidhannagar / Sector V)",
  "New Town / Rajarhat",
  "Howrah (Shibpur / Golabari / Salkia)",
  "Behala / Taratala / New Alipore",
  "Dum Dum / Nagerbazar / VIP Road",
  "Shyambazar / Hatibagan (North Kolkata)",
  "Jadavpur / Tollygunge / Garia",
  "Barasat / Madhyamgram (North 24 Pgs)",
  "Other Kolkata / Greater Kolkata Area",
];

const OLD_GOLD_QUERIES = [
  "Physical Old Gold / Jewellery Sale & Valuation",
  "Scrap Gold / Broken Ornaments Valuation",
  "Gold Coins & Bullion Evaluation",
  "Silver Items, Utensils & Coins",
  "Other Physical Precious Metal Query",
];

const GOLD_LOAN_QUERIES = [
  "Bank / NBFC Gold Loan Settlement (Zero Advance)",
  "Partial Gold Release (Retain balance gold)",
  "Auction Notice Relief & Emergency Settlement",
  "High Interest Gold Loan Takeover",
  "Locker Physical Handover Assistance",
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSource, setDialogSource] = useState("general");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [adminOpen, setAdminOpen] = useState(false);

  // Dynamic Gold Rates (managed via Admin Panel)
  const [goldRates, setGoldRates] = useState<GoldRatesConfig>(() => {
    const saved = localStorage.getItem("mraj_gold_rates");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { "24K": 7850, "22K": 7210, "20K": 6550, "18K": 5910, silver: 94 };
      }
    }
    return { "24K": 7850, "22K": 7210, "20K": 6550, "18K": 5910, silver: 94 };
  });

  // Check URL hash for #admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin") {
        setAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Dedicated Quick Inquiry Modal for the 2 Action Cards ('Check Old Value' & 'Gold Loan Settlement')
  const [quickServiceModal, setQuickServiceModal] = useState<{
    isOpen: boolean;
    category: "old_gold" | "gold_loan";
  }>({
    isOpen: false,
    category: "old_gold",
  });

  const [quickLeadForm, setQuickLeadForm] = useState({
    name: "",
    phone: "",
    location: "Bowbazar (B.B. Ganguly St / Central Gold Hub)",
    query: "Physical Old Gold / Jewellery Sale & Valuation",
  });

  const [quickLeadSubmitted, setQuickLeadSubmitted] = useState(false);

  const openQuickModal = (category: "old_gold" | "gold_loan") => {
    setQuickLeadSubmitted(false);
    setQuickServiceModal({ isOpen: true, category });
    setQuickLeadForm((prev) => ({
      ...prev,
      query:
        category === "old_gold"
          ? "Physical Old Gold / Jewellery Sale & Valuation"
          : "Bank / NBFC Gold Loan Settlement (Zero Advance)",
    }));
  };

  const handleQuickLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuickLeadSubmitted(true);

    // Save inquiry to Admin Leads
    try {
      const existing = JSON.parse(localStorage.getItem("mraj_customer_leads") || "[]");
      const newLead = {
        id: "lead-" + Date.now(),
        createdAt: new Date().toISOString(),
        name: quickLeadForm.name || "Website Customer",
        phone: quickLeadForm.phone || "",
        location: quickLeadForm.location,
        serviceType:
          quickServiceModal.category === "old_gold"
            ? "Sell Old Gold & Jewellery"
            : "Gold Loan Settlement",
        status: "New",
        notes: quickLeadForm.query,
      };
      localStorage.setItem("mraj_customer_leads", JSON.stringify([newLead, ...existing]));
    } catch (err) {
      console.error(err);
    }

    const msg = encodeURIComponent(
      `Hello MRAJ JEWELERS, I want to submit a query:\n• Category: ${
        quickServiceModal.category === "old_gold" ? "Sell Old Gold & Silver" : "Gold Loan Settlement"
      }\n• Requirement: ${quickLeadForm.query}\n• Name: ${quickLeadForm.name}\n• Phone: ${
        quickLeadForm.phone
      }\n• Location: ${quickLeadForm.location}\nPlease share valuation & branch settlement guidance.`
    );
    window.open(`https://wa.me/918101121813?text=${msg}`, "_blank");
  };

  // Calculator State: 'cash' = Full Loan Settlement, 'partial' = Partial Release (Save Gold), 'old_gold' = Sell Physical Old Gold (No Loan)
  const [calcMode, setCalcMode] = useState<"cash" | "partial" | "old_gold">("cash");
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [goldGrams, setGoldGrams] = useState(50);
  const [goldPurity, setGoldPurity] = useState<"24K" | "22K" | "20K" | "18K">("22K");
  const [loanAmount, setLoanAmount] = useState(180000);
  const [selectedLender, setSelectedLender] = useState("Muthoot Finance");
  const [oldGoldItemType, setOldGoldItemType] = useState("Old Gold Jewellery");

  // Top Showcase Display Video State
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
      if (window.scrollY > 50) {
        setMoreMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close More Menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#more-menu-container")) {
        setMoreMenuOpen(false);
      }
    };
    if (moreMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [moreMenuOpen]);

  // Rotating Social Proof Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveTickerFeed.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (dialogOpen || mobileOpen || calcModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [dialogOpen, mobileOpen, calcModalOpen]);

  const openForm = (source = "general") => {
    setCalcModalOpen(false);
    setDialogSource(source);
    setSubmitted(false);
    setMobileOpen(false);
    setDialogOpen(true);
  };

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    setMobileOpen(false);
    if (target === "#calculator") {
      setCalcModalOpen(true);
      return;
    }
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleServiceAction = (actionType: string) => {
    if (actionType === "calculator") {
      setCalcMode("cash");
      setCalcModalOpen(true);
    } else if (actionType === "old_gold") {
      setCalcMode("old_gold");
      setCalcModalOpen(true);
    } else if (actionType === "partial_form") {
      setCalcMode("partial");
      setCalcModalOpen(true);
    } else if (actionType === "how_it_works") {
      document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
    } else {
      openForm("service_card_" + actionType);
    }
  };

  // Calculations (Dynamic rates managed by Admin)
  const ratePerGram = goldRates[goldPurity];
  const totalMarketValue = Math.round(goldGrams * ratePerGram);
  const netCashInHand = Math.max(0, totalMarketValue - loanAmount);

  // Partial release calculations: How many grams to sell to clear loan, how many to take home
  const gramsToSellForLoan = Math.min(goldGrams, Math.ceil(loanAmount / ratePerGram));
  const gramsReturnedHome = Math.max(0, goldGrams - gramsToSellForLoan);

  const whatsappUrl = `https://wa.me/918101121813?text=${encodeURIComponent(
    calcMode === "old_gold"
      ? `Hello MRAJ JEWELERS, I want to sell physical old gold (${goldGrams}g, ${goldPurity}, ${oldGoldItemType}) in ${selectedCity}. Please share live valuation & nearest branch address.`
      : `Hello MRAJ JEWELERS, I want to inquire about gold loan release from ${selectedLender} in ${selectedCity}. Approx Gold: ${goldGrams}g, Loan: ₹${loanAmount.toLocaleString(
          "en-IN"
        )}. Mode: ${calcMode === "partial" ? "Partial Gold Release (Keep Gold)" : "Full Settlement (Extra Cash)"}. Please share quotation.`
  )}`;

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0e0e11] text-[#f8f8f8] pb-28 sm:pb-24 lg:pb-0 font-sans selection:bg-[rgba(212,175,55,0.3)]">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa820a]"
        style={{ scaleX: scrollYProgress }}
      />


      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-[rgba(212,175,55,0.22)] bg-[#0e0e11]/95 shadow-xl shadow-black/50 backdrop-blur-md"
            : "border-b border-[rgba(212,175,55,0.15)] bg-[#0e0e11]/85 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex h-[44px] min-[360px]:h-[48px] sm:h-[54px] lg:h-[58px] max-w-[1440px] items-center justify-between px-2.5 sm:px-6 lg:px-10 gap-2 sm:gap-3">
          {/* MRAJ JEWELERS Brand Logo (Small & Sleek with Professional White JEWELERS Text) */}
          <a
            href="#top"
            onClick={(event) => scrollTo(event, "#top")}
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

          {/* Desktop Navigation Links (OSonare Luxury Styling) */}
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
                onClick={(event) => scrollTo(event, href)}
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
                          label: "Frequently Asked Questions",
                          href: "#faq",
                          icon: <HelpCircle size={16} className="text-emerald-400" />,
                          desc: "Clear answers to your questions",
                        },
                        {
                          label: "Contact & Branch Hubs",
                          href: "#contact",
                          icon: <Building2 size={16} className="text-amber-400" />,
                          desc: "Zaveri Bazaar & Karol Bagh",
                        },
                      ].map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(event) => {
                            scrollTo(event, item.href);
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

          {/* Desktop CTAs (Streamlined & Clean with Luxury Gold) */}
          <div className="relative z-10 hidden items-center gap-2.5 lg:flex shrink-0">
            <a
              href="tel:+918101121813"
              className="hidden xl:flex items-center gap-1.5 rounded-xl border border-[rgba(212,175,55,0.3)] bg-white/5 px-3.5 py-1.5 text-xs font-bold text-[var(--gold-light)] hover:border-[var(--gold-primary)] hover:bg-[rgba(212,175,55,0.12)] transition duration-150"
              title="Call: +91 81011 21813"
            >
              <Phone size={13} className="text-[var(--gold-primary)]" />
              <span>+91 81011 21813</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold whitespace-nowrap"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => openForm("header")}
              className="btn-gold flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold whitespace-nowrap"
            >
              <span>Get Free Quote</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <a
              href="tel:+918101121813"
              className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#181824] text-[var(--gold-light)] border border-[rgba(212,175,55,0.25)] hover:bg-[rgba(212,175,55,0.15)] transition shrink-0"
              aria-label="Call MRAJ JEWELERS"
            >
              <Phone size={12} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-emerald-950/60 text-[#25d366] border border-emerald-500/40 hover:bg-emerald-900/60 transition shrink-0"
              aria-label="WhatsApp MRAJ JEWELERS"
            >
              <MessageCircle size={13} />
            </a>
            <button
              className="flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.25)] bg-[#181824] text-slate-200 hover:text-[var(--gold-light)] transition shrink-0 cursor-pointer"
              onClick={() => setMobileOpen((value) => !value)}
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
                    ["Frequently Asked Questions", "#faq"],
                    ["Contact & Hubs", "#contact"],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={(event) => {
                        scrollTo(event, href);
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
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="btn-whatsapp flex w-full items-center justify-center gap-1.5 py-2 text-xs font-bold"
                  >
                    <MessageCircle size={14} /> WhatsApp Chat
                  </a>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openForm("mobile_drawer");
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

      {/* Hero Section */}
      <section
        id="top"
        className="relative overflow-hidden pt-4 pb-10 min-[380px]:pt-6 min-[380px]:pb-14 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 bg-gradient-to-b from-[#14141d] via-[#0e0e11] to-[#0e0e11]"
      >
        {/* Ambient radial gold spotlight */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.14),transparent_70%)]" />

        {/* TOP CINEMATIC DISPLAY VIDEO SHOWCASE */}
        <div className="relative mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12 w-full min-w-0 mb-6 sm:mb-10">
          <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.3)] shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)] bg-black group">
            <video
              ref={videoRef}
              src="./hero-gold-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[220px] min-[400px]:h-[270px] sm:h-[380px] md:h-[460px] lg:h-[500px] object-cover object-center"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/25 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(14,14,17,0.7)_100%)] pointer-events-none" />


            {/* Bottom Content (Clean & Dignified, No Sound / Controls) */}
            <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
              <div className="max-w-2xl">
                <p className="text-[10px] min-[360px]:text-xs font-bold uppercase tracking-widest text-[var(--gold-primary)] mb-1 drop-shadow">
                  Certified Hallmarked Jewellery
                </p>
                <h2 className="font-serif text-base min-[360px]:text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                  MRAJ JEWELERS — Gold Valuation & Settlement Services
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl px-3 min-[360px]:px-4 sm:px-8 lg:px-12 w-full min-w-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="w-full min-w-0 flex flex-col items-center text-center"
          >

            {/* Main Headline (Neutral, Professional, Straight-Cut) */}
            <motion.h1
              variants={fadeUp}
              className="font-serif font-bold text-2xl min-[360px]:text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] leading-[1.14] sm:leading-[1.08] tracking-tight text-white break-words w-full"
            >
              Girvi Gold Loan Settlement &{" "}
              <span className="gold-gradient-text">
                Jewellery Release
              </span>{" "}
              Services.
            </motion.h1>

            {/* Point-based information instead of long paragraph */}
            <motion.div variants={fadeUp} className="mt-3.5 sm:mt-4 w-full max-w-xl">
              <p className="text-xs min-[360px]:text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                <strong className="text-[var(--gold-light)] font-semibold">MRAJ JEWELERS</strong> — Bank ya NBFC me girvi sona release karne me sahulat:
              </p>
              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
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

            {/* 4 Sleek Feature Chips (Compact, Neutral & Dignified) */}
            <motion.div
              variants={fadeUp}
              className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-2xl min-w-0 mx-auto text-left"
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
                  className="group relative flex items-center sm:items-start gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-[rgba(212,175,55,0.16)] bg-[#181824]/95 p-2 sm:p-3 shadow-sm hover:border-[var(--gold-primary)] transition-all duration-200 min-w-0"
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
            <motion.div variants={fadeUp} className="mt-5 sm:mt-7 w-full max-w-xl min-w-0 mx-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full min-w-0">
                <button
                  onClick={() => openForm("hero_primary")}
                  className="btn-gold group flex items-center justify-center gap-2 px-4 min-[360px]:px-5 sm:px-7 py-3 sm:py-3.5 text-xs min-[360px]:text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer active:scale-[0.99] w-full min-w-0"
                >
                  <Zap size={16} className="text-[#0e0e11] fill-[#0e0e11] shrink-0" />
                  <span className="truncate">Get Settlement Quotation</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex items-center justify-center gap-2 px-4 min-[360px]:px-5 sm:px-6 py-3 sm:py-3.5 text-xs min-[360px]:text-sm sm:text-base font-bold transition-all duration-200 w-full min-w-0"
                >
                  <MessageCircle size={17} className="text-white shrink-0" />
                  <span className="truncate">WhatsApp Loan Slip</span>
                </a>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] min-[360px]:text-[11px] font-medium text-slate-400 w-full min-w-0">
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

            {/* Professional Frosted Metric Card (2 Key Highlights: Families Helped & Rating) */}
            <motion.div
              variants={fadeUp}
              className="mt-5 sm:mt-7 rounded-xl sm:rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#181824]/90 p-3 sm:p-4 shadow-xl backdrop-blur-md w-full max-w-md min-w-0 mx-auto"
            >
              <div className="grid grid-cols-2 divide-x divide-[rgba(212,175,55,0.18)] text-center w-full min-w-0 items-center">
                <div className="px-2 sm:px-4 min-w-0 flex flex-col items-center justify-center">
                  <p className="text-sm min-[360px]:text-base sm:text-2xl font-black tracking-tight text-white whitespace-nowrap">
                    1,000 - 2,500+
                  </p>
                  <p className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs font-semibold text-slate-300 mt-0.5 leading-tight">
                    Families Helped
                  </p>
                </div>
                <div className="px-2 sm:px-4 min-w-0 flex flex-col items-center justify-center">
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
      </section>

      {/* 2ND SCREEN / PAGE 2: CORE SERVICES (2 COMPACT BOX BUTTON CARDS ON TOP, CALCULATOR BELOW) */}
      <section id="services" className="scroll-mt-20 sm:scroll-mt-24 py-8 min-[380px]:py-10 sm:py-14 bg-[#0e0e11] border-b border-[rgba(212,175,55,0.18)]">
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

          {/* 2 Interactive Box Buttons (Now on TOP: Gold Loan Settlement & Sell Old Gold) */}
          {/* 2 Clean Image Action Cards (Image, Heading & Clickable Button with Quick Popup) */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto w-full min-w-0">
            {/* Card 1: Gold Loan Settlement */}
            <div
              onClick={() => openQuickModal("gold_loan")}
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
                    openQuickModal("gold_loan");
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
              onClick={() => openQuickModal("old_gold")}
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
                    openQuickModal("old_gold");
                  }}
                  className="btn-gold flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-bold shadow-gold rounded-xl cursor-pointer active:scale-[0.99] shrink-0"
                >
                  <span>Check Old Value</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* 1 Luxury Interactive Estimator Trigger Card (Now MOVED DOWN Below The 2 Service Cards) */}
          <motion.div
            id="calculator"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative scroll-mt-20 sm:scroll-mt-24 mt-8 sm:mt-10 max-w-4xl mx-auto w-full min-w-0"
          >
            <div
              onClick={() => setCalcModalOpen(true)}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.28)] bg-[#181824] shadow-2xl shadow-black/80 hover:border-[var(--gold-primary)] hover:shadow-gold transition-all duration-300 cursor-pointer flex flex-col md:flex-row justify-between"
            >
              {/* Top ambient gold highlight */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent z-10" />

              {/* Card Image Showcase with Gold Valuation */}
              <div className="relative w-full md:w-5/12 h-[110px] min-[380px]:h-[125px] sm:h-[180px] md:h-auto overflow-hidden bg-black/60 shrink-0">
                <img
                  src={photoValuation}
                  alt="Gold Valuation & Settlement"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#181824] via-[#181824]/50 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2 sm:top-3 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0e0e11]/90 backdrop-blur-md px-2 sm:px-2.5 py-0.5 text-[9.5px] sm:text-xs font-bold text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)] shadow-sm">
                    <Sparkles size={11} /> Live Rate: ₹{goldRates["22K"].toLocaleString("en-IN")}/g
                  </span>
                  <span className="rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 backdrop-blur-md px-2 py-0.5 text-[9.5px] sm:text-xs font-bold shadow-sm">
                    ⚡ ₹0 Advance Fee
                  </span>
                </div>

                {/* Image Overlay Title */}
                <div className="absolute bottom-2 left-2.5 sm:left-4 right-2.5 sm:right-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md bg-[rgba(212,175,55,0.2)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)]">
                      <Scale size={13} />
                    </div>
                    <h3 className="font-serif text-xs min-[380px]:text-sm sm:text-lg font-bold text-white leading-tight drop-shadow-md truncate">
                      Gold Settlement Estimator
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Body with Key Features (Short, Simple & Professional) */}
              <div className="p-3 sm:p-5 md:p-6 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                <div>
                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 leading-snug">
                    Estimated gold value aur settlement hisaab calculate karein:
                  </p>

                  <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-1.5 text-[10px] min-[380px]:text-[11px] sm:text-xs text-slate-300 font-medium">
                    <div className="flex items-center gap-1.5 bg-[#121218] px-2 py-1.5 rounded-lg border border-[rgba(212,175,55,0.15)]">
                      <Check size={11} className="text-[var(--gold-primary)] shrink-0" />
                      <span className="truncate">Loan Settlement</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#121218] px-2 py-1.5 rounded-lg border border-[rgba(212,175,55,0.15)]">
                      <Check size={11} className="text-[var(--gold-primary)] shrink-0" />
                      <span className="truncate">Partial Release</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#121218] px-2 py-1.5 rounded-lg border border-[rgba(212,175,55,0.15)]">
                      <Check size={11} className="text-[var(--gold-primary)] shrink-0" />
                      <span className="truncate">Sell Old Gold</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#121218] px-2 py-1.5 rounded-lg border border-[rgba(212,175,55,0.15)]">
                      <Check size={11} className="text-[var(--gold-primary)] shrink-0" />
                      <span className="truncate">Live Gold Rates</span>
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  {/* Primary Trigger Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCalcModalOpen(true);
                    }}
                    className="btn-gold w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 text-xs min-[360px]:text-sm sm:text-base font-bold shadow-gold rounded-xl sm:rounded-2xl transition cursor-pointer active:scale-[0.99] group-hover:brightness-110"
                  >
                    <Scale size={16} className="shrink-0" />
                    <span>Open Calculator</span>
                    <ArrowRight size={15} className="shrink-0" />
                  </button>

                  <p className="mt-2 text-[9px] min-[360px]:text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                    <Lock size={10} className="text-[var(--gold-primary)]" /> Confidential & instant valuation
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3-STEP EASY PROCESS (HOW IT WORKS) */}
      <section id="how-it-works" className="scroll-mt-20 sm:scroll-mt-24 py-8 min-[380px]:py-10 sm:py-14 bg-[#14141c] border-b border-[rgba(212,175,55,0.15)]">
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

          <div className="mt-4 sm:mt-8 grid gap-2 sm:gap-4 md:grid-cols-3">
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
                  className="rounded-xl sm:rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[#181824] p-2.5 sm:p-5 flex md:flex-col items-start gap-2.5 sm:gap-3 hover:border-[var(--gold-primary)] transition min-w-0"
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

      {/* COMBINED URGENT AUCTION RELIEF & SUPPORTED LENDERS STRIP */}
      <section id="auction-alert" className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-8 bg-[#0e0e11] border-b border-[rgba(212,175,55,0.18)]">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          {/* COMPACT & RESPONSIVE VIDEO BUTTON CARD (NO GEMINI LOGO, BALANCED ON ALL SCREENS) */}
          <div className="w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[660px] mx-auto">
            <div
              onClick={() => window.open(whatsappUrl, "_blank")}
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
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(whatsappUrl, "_blank");
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
                className="rounded-lg bg-[#181824] border border-[rgba(212,175,55,0.18)] px-2.5 py-1 text-[11px] font-medium text-slate-300"
              >
                {lender.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK FAQS (4 ESSENTIAL QUESTIONS ONLY) */}
      <section id="faq" className="scroll-mt-20 sm:scroll-mt-24 py-8 min-[380px]:py-10 sm:py-12 bg-[#14141c] border-b border-[rgba(212,175,55,0.15)]">
        <div className="mx-auto max-w-3xl px-3 min-[360px]:px-4 sm:px-8">
          <Reveal className="text-center">
            <span className="text-[10px] min-[360px]:text-[11px] font-bold uppercase tracking-widest gold-gradient-text">
              Clear Answers
            </span>
            <h2 className="mt-1 font-serif text-xl min-[360px]:text-2xl sm:text-3xl font-bold text-white">
              Aapke Sawaal, Hamare Jawab (FAQ)
            </h2>
          </Reveal>

          <div className="mt-5 space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-[rgba(212,175,55,0.18)] bg-[#181824] overflow-hidden"
                >
                  <button
                    className="flex w-full items-center justify-between gap-3 p-3 text-left cursor-pointer transition hover:bg-[rgba(212,175,55,0.05)]"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-xs min-[360px]:text-sm font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={15}
                      className={`shrink-0 text-[var(--gold-primary)] transition duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-3 pb-3 text-xs leading-relaxed text-slate-300 border-t border-[rgba(212,175,55,0.1)] pt-2">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPACT LUXURY FOOTER */}
      <footer id="contact" className="bg-[#0a0a0e] py-8 sm:py-10 text-slate-400 text-xs border-t border-[rgba(212,175,55,0.18)]">
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
                <p className="text-[10px] text-[var(--gold-light)]">Gold Valuation & Loan Settlement Services</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs text-slate-300">
              <div>
                <strong className="text-white block font-serif">Kolkata Central Hub:</strong>
                <span className="text-slate-400 text-[11px]">Bowbazar / B.B. Ganguly St, Kolkata 700012</span>
              </div>
              <div>
                <strong className="text-white block font-serif">Kolkata South Hub:</strong>
                <span className="text-slate-400 text-[11px]">Gariahat Road, Kolkata 700019</span>
              </div>
              <div>
                <strong className="text-white block font-serif">Helpline & WhatsApp:</strong>
                <span className="text-amber-300 text-[11px] block">Call: +91 81011 21813</span>
                <span className="text-emerald-400 text-[11px]">WhatsApp: +91 81011 21813</span>
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
                  setAdminOpen(true);
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

      {/* Desktop Floating WhatsApp Quick Trigger (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex items-center gap-2 rounded-2xl px-5 py-3 shadow-2xl hover:scale-105 transition duration-200 group"
        >
          <MessageCircle size={22} className="group-hover:rotate-12 transition" />
          <span className="text-xs font-extrabold tracking-wide">WhatsApp Loan Slip</span>
        </a>
      </div>

      {/* Mobile Sticky Quick Action Bar (Ultra-responsive on 320px-360px Android devices) */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-[rgba(212,175,55,0.25)] bg-[#0e0e11]/95 backdrop-blur-md px-2 min-[360px]:px-3 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center gap-1.5 min-[360px]:gap-2">
        <a
          href="tel:+918101121813"
          className="flex flex-col items-center justify-center rounded-xl bg-[#181824] px-2 min-[360px]:px-2.5 py-1.5 min-[360px]:py-2 text-slate-200 border border-[rgba(212,175,55,0.25)] min-w-[48px] min-[360px]:min-w-[52px] shrink-0 hover:border-[var(--gold-primary)] transition"
        >
          <Phone size={15} className="text-[var(--gold-primary)]" />
          <span className="text-[9px] min-[360px]:text-[10px] font-bold mt-0.5">Call</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp btn-mobile-sticky flex-1 flex items-center justify-center gap-1.5 rounded-xl text-[11px] min-[360px]:text-xs font-bold text-white whitespace-nowrap"
        >
          <MessageCircle size={15} className="shrink-0" />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => openForm("sticky_mobile")}
          className="btn-gold btn-mobile-sticky flex-1 flex items-center justify-center gap-1.5 rounded-xl text-[11px] min-[360px]:text-xs font-bold cursor-pointer active:scale-[0.99] whitespace-nowrap"
        >
          <span>Release Sona</span>
          <ArrowRight size={13} className="shrink-0" />
        </button>
      </div>

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
              className="relative max-h-[94dvh] w-full max-w-xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.32)] bg-[#181824] p-4 min-[360px]:p-5 sm:p-7 shadow-2xl shadow-black text-slate-200"
              role="dialog"
              aria-modal="true"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Top ambient gold accent bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent" />

              {/* Close Button */}
              <button
                className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer z-10"
                onClick={() => setCalcModalOpen(false)}
                aria-label="Close Calculator"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2.5 sm:gap-3 pr-8 pb-2.5 border-b border-[rgba(212,175,55,0.18)]">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.14)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)] shadow-md shrink-0">
                  <Scale size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base min-[360px]:text-lg sm:text-xl font-bold text-white leading-tight">
                      Settlement Estimator
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 px-2 py-0.5 text-[9.5px] font-extrabold text-emerald-400 border border-emerald-500/40">
                      ⚡ 0% Fee
                    </span>
                  </div>
                  <p className="text-[10.5px] sm:text-xs text-slate-400">
                    Live market rate par instant valuation & hisaab
                  </p>
                </div>
              </div>

              {/* 3 Calculator Modes (Tabs) */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#121218] border border-[rgba(212,175,55,0.15)] text-center">
                <button
                  type="button"
                  onClick={() => setCalcMode("cash")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    calcMode === "cash"
                      ? "bg-[rgba(212,175,55,0.2)] text-[var(--gold-light)] border border-[rgba(212,175,55,0.35)] shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Wallet size={13} className={calcMode === "cash" ? "text-[var(--gold-primary)]" : ""} />
                  <span>Full Cash</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("partial")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    calcMode === "partial"
                      ? "bg-[rgba(212,175,55,0.2)] text-[var(--gold-light)] border border-[rgba(212,175,55,0.35)] shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Scale size={13} className={calcMode === "partial" ? "text-[var(--gold-primary)]" : ""} />
                  <span>Keep Gold</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("old_gold")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    calcMode === "old_gold"
                      ? "bg-[rgba(212,175,55,0.2)] text-[var(--gold-light)] border border-[rgba(212,175,55,0.35)] shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Sparkles size={13} className={calcMode === "old_gold" ? "text-[var(--gold-primary)]" : ""} />
                  <span>Sell Old Gold</span>
                </button>
              </div>

              {/* Gold Karat Purity Selector with Rate */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-bold text-slate-300">Gold Karat Purity</label>
                  <span className="font-bold text-[var(--gold-primary)] text-xs">
                    Live Rate: ₹{ratePerGram.toLocaleString("en-IN")}/g
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["24K", "22K", "20K", "18K"] as const).map((karat) => (
                    <button
                      key={karat}
                      type="button"
                      onClick={() => setGoldPurity(karat)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        goldPurity === karat
                          ? "bg-[var(--gold-gradient)] text-black font-extrabold shadow-md scale-[1.01]"
                          : "bg-[#121218] text-slate-300 border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.3)]"
                      }`}
                    >
                      {karat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lender / Item Type Selector */}
              <div className="mt-2.5">
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  {calcMode === "old_gold"
                    ? "Item Type (Kisko Bechna Hai?)"
                    : "Where is gold pledged? (Bank / Lender)"}
                </label>
                {calcMode === "old_gold" ? (
                  <select
                    value={oldGoldItemType}
                    onChange={(e) => setOldGoldItemType(e.target.value)}
                    className="form-input text-xs py-1.5"
                  >
                    <option value="Old Gold Jewellery" className="bg-[#181824] text-white">Old Gold Jewellery (Chain, Bangles, Rings, Necklace)</option>
                    <option value="Gold Bullion Coins & Bars" className="bg-[#181824] text-white">Gold Bullion Coins & Bars (999 / 916)</option>
                    <option value="Broken / Scrap Gold" className="bg-[#181824] text-white">Toota Ya Purana Scrap Sona (0% Deduction)</option>
                    <option value="Silver Items & Utensils" className="bg-[#181824] text-white">Silver Items, Sikke & Chandi Ke Bartan</option>
                  </select>
                ) : (
                  <select
                    value={selectedLender}
                    onChange={(e) => setSelectedLender(e.target.value)}
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

              {/* Gold Weight Card */}
              <div className="mt-2.5 rounded-xl bg-[#121218] border border-[rgba(212,175,55,0.2)] p-2.5 sm:p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-300">
                    {calcMode === "old_gold" ? "Gold Weight" : "Total Pledged Gold Weight"}
                  </label>
                  <div className="flex items-center gap-1 bg-[#0a0a0e] px-2.5 py-1 rounded-lg border border-[rgba(212,175,55,0.4)] focus-within:border-[var(--gold-light)] focus-within:ring-1 focus-within:ring-[var(--gold-light)] shrink-0 transition">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0.1"
                      step="any"
                      value={goldGrams === 0 ? "" : goldGrams}
                      onChange={(e) => {
                        const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                        setGoldGrams(isNaN(val) ? 0 : val);
                      }}
                      placeholder="0"
                      className="w-16 bg-transparent text-right text-xs sm:text-sm font-extrabold text-[var(--gold-light)] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-[11px] font-bold text-slate-400">grams</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="5"
                  max={Math.max(500, Math.ceil(goldGrams))}
                  step="1"
                  value={goldGrams}
                  onChange={(e) => setGoldGrams(Number(e.target.value))}
                  className="gold-range w-full cursor-pointer"
                />
              </div>

              {/* Current Loan Balance Card */}
              {calcMode !== "old_gold" && (
                <div className="mt-2.5 rounded-xl bg-[#121218] border border-[rgba(212,175,55,0.2)] p-2.5 sm:p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-300">
                      Bank Loan Balance (Due Amount)
                    </label>
                    <div className="flex items-center gap-1 bg-[#0a0a0e] px-2.5 py-1 rounded-lg border border-[rgba(212,175,55,0.4)] focus-within:border-[var(--gold-light)] focus-within:ring-1 focus-within:ring-[var(--gold-light)] shrink-0 transition">
                      <span className="text-xs font-bold text-[var(--gold-primary)]">₹</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="1000"
                        value={loanAmount === 0 ? "" : loanAmount}
                        onChange={(e) => {
                          const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                          setLoanAmount(isNaN(val) ? 0 : val);
                        }}
                        placeholder="0"
                        className="w-24 bg-transparent text-right text-xs sm:text-sm font-extrabold text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                    className="gold-range w-full cursor-pointer"
                  />
                </div>
              )}

              {/* Valuation Result Box */}
              <div className="mt-3 rounded-xl border border-[rgba(212,175,55,0.25)] bg-gradient-to-br from-[#121218] to-[#1a1a26] p-3 sm:p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Sona Ki Market Value ({goldGrams}g @ {goldPurity}):</span>
                  <strong className="text-white font-bold">₹{totalMarketValue.toLocaleString("en-IN")}</strong>
                </div>

                {calcMode !== "old_gold" && (
                  <div className="flex items-center justify-between text-xs text-rose-400">
                    <span>Bank Loan Settlement:</span>
                    <strong className="font-bold">- ₹{loanAmount.toLocaleString("en-IN")}</strong>
                  </div>
                )}

                <div className="pt-2 border-t border-[rgba(212,175,55,0.2)]">
                  {calcMode === "cash" && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-wide text-[var(--gold-primary)]">
                          Aapko Extra Cash Milega
                        </p>
                        <p className="text-[9.5px] text-slate-400">Turant Google Pay / Bank Transfer</p>
                      </div>
                      <p className="text-xl sm:text-2xl font-black text-[var(--gold-light)]">
                        ₹{netCashInHand.toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}

                  {calcMode === "partial" && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Loan Ke Liye Bikega:</span>
                        <span className="font-bold text-amber-300">{gramsToSellForLoan}g Sona</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-extrabold uppercase tracking-wide text-emerald-400">
                            Sona Jo Wapas Ghar Jayega
                          </p>
                          <p className="text-[9.5px] text-slate-400">Pure baaki gehne aapke hawale</p>
                        </div>
                        <p className="text-xl sm:text-2xl font-black text-emerald-400">
                          {gramsReturnedHome} grams
                        </p>
                      </div>
                    </div>
                  )}

                  {calcMode === "old_gold" && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-wide text-[var(--gold-primary)]">
                          Spot Cash Payment
                        </p>
                        <p className="text-[9.5px] text-slate-400">0% Deduction • Instant Payout</p>
                      </div>
                      <p className="text-xl sm:text-2xl font-black text-[var(--gold-light)]">
                        ₹{totalMarketValue.toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex items-center justify-center gap-1.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Slip</span>
                </a>
                <button
                  type="button"
                  onClick={() => openForm(calcMode === "old_gold" ? "sell_old_gold" : "calculator_modal")}
                  className="btn-gold flex items-center justify-center gap-1.5 py-2.5 text-xs sm:text-sm font-bold shadow-gold rounded-xl cursor-pointer"
                >
                  <span>{calcMode === "old_gold" ? "Sell Sona" : "Release Sona"}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <p className="mt-2 text-center text-[9.5px] text-slate-400">
                ⚡ 100% Free calculation • ₹0 Advance Fee • Locker handover in front of you
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Capture Dialog */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-2 min-[360px]:p-3 sm:p-4 backdrop-blur-sm"
            onMouseDown={() => setDialogOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative max-h-[94dvh] w-full max-w-lg overflow-y-auto rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.25)] bg-[var(--card-bg)] p-4 min-[360px]:p-5 sm:p-8 shadow-2xl text-slate-200"
              role="dialog"
              aria-modal="true"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
                onClick={() => setDialogOpen(false)}
                aria-label="Close"
              >
                <X size={17} />
              </button>

              {submitted ? (
                <div className="py-6 sm:py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[rgba(212,175,55,0.15)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)]">
                    <Check size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-3.5 font-serif text-2xl font-bold text-white">Anurodh Prapt Hua!</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                    MRAJ JEWELERS ke gold loan specialist 10 minute ke andar aapse call karenge aur aapke branch settlement ki poori jankari denge.
                  </p>
                  <div className="mt-5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--bg-secondary)] border border-[rgba(212,175,55,0.2)] text-xs text-[var(--gold-primary)] font-semibold">
                    ⚡ Fast response ke liye aap turant WhatsApp par bhi slip share kar sakte hain:
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp flex-1 flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl text-xs font-bold py-2.5"
                    >
                      <MessageCircle size={16} /> Open WhatsApp
                    </a>
                    <button
                      onClick={() => setDialogOpen(false)}
                      className="flex-1 rounded-xl sm:rounded-2xl border border-[rgba(212,175,55,0.2)] bg-white/5 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/10 cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    setSubmitted(true);
                    try {
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get("name") as string;
                      const phone = formData.get("phone") as string;
                      const lender = formData.get("lender") as string;
                      const grams = formData.get("grams") as string;
                      const serviceType = formData.get("service_type") as string;
                      const existing = JSON.parse(localStorage.getItem("mraj_customer_leads") || "[]");
                      const newLeadEntry = {
                        id: "lead-" + Date.now(),
                        createdAt: new Date().toISOString(),
                        name: name || "Website Inquiry",
                        phone: phone || "",
                        lender: lender || "Not specified",
                        goldGrams: grams,
                        serviceType:
                          serviceType === "sell_old_gold"
                            ? "Sell Old Gold"
                            : serviceType === "partial_release"
                            ? "Partial Gold Release"
                            : "Gold Loan Settlement",
                        status: "New",
                      };
                      localStorage.setItem("mraj_customer_leads", JSON.stringify([newLeadEntry, ...existing]));
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={logoMrajWordmark}
                      alt="MRAJ"
                      className="h-4 sm:h-4.5 w-auto object-contain"
                    />
                    <span className="brand-jewelers-text text-xs leading-none pt-0.5">
                      JEWELERS
                    </span>
                    <div className="ml-auto inline-flex items-center gap-1 rounded-full bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.25)] px-2.5 sm:px-3 py-0.5 text-[10px] min-[360px]:text-[11px] font-bold text-[var(--gold-primary)]">
                      <Zap size={11} /> 100% Free Quote
                    </div>
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                    Sona Chhudwane Ke Liye Details Bharein
                  </h3>
                  <p className="mt-1 text-[11px] min-[360px]:text-xs text-slate-400">
                    ₹0 advance charges. Aapka data 100% confidential aur safe rahega.
                  </p>

                  <div className="mt-4 sm:mt-5 space-y-3">
                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                        Aapka Naam (Your Full Name) *
                      </label>
                      <input
                        required
                        name="name"
                        placeholder="e.g. Ramesh Sharma"
                        className="form-input text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                        Mobile Number (WhatsApp) *
                      </label>
                      <input
                        required
                        name="phone"
                        inputMode="tel"
                        placeholder="10-digit mobile number"
                        className="form-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                          Lender (Branch)
                        </label>
                        <select
                          name="lender"
                          defaultValue={selectedLender}
                          className="form-input text-xs font-semibold"
                        >
                          {lendersList.map((l) => (
                            <option key={l.name} value={l.name} className="bg-[#181824] text-white">
                              {l.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                          Approx Gold (Grams)
                        </label>
                        <input
                          name="grams"
                          inputMode="numeric"
                          placeholder="e.g. 50g"
                          defaultValue={`${goldGrams}g`}
                          className="form-input text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-300 block mb-1">
                        Preferred Service Type
                      </label>
                      <select
                        name="service_type"
                        defaultValue={
                          dialogSource.includes("old_gold")
                            ? "sell_old_gold"
                            : calcMode === "partial"
                            ? "partial_release"
                            : "full_settlement"
                        }
                        className="form-input text-xs font-semibold"
                      >
                        <option value="sell_old_gold" className="bg-[#181824] text-white">Sell Old Gold (Ghar ka purana / toota sona bechna)</option>
                        <option value="sell_coins" className="bg-[#181824] text-white">Sell Gold Coins & Bullion Bars (Instant Cash)</option>
                        <option value="sell_silver" className="bg-[#181824] text-white">Sell Silver Items (Chandi ke bartan / payal / sikke)</option>
                        <option value="partial_release" className="bg-[#181824] text-white">Partial Gold Release (Aadha sona becho, bacha sona ghar le jao)</option>
                        <option value="full_settlement" className="bg-[#181824] text-white">Full Loan Settlement (Bank se poora sona chhudwana)</option>
                        <option value="auction_help" className="bg-[#181824] text-white">Auction Notice / Bank Settlement</option>
                      </select>
                    </div>

                    <label className="flex items-start gap-2 text-[10px] min-[360px]:text-[11px] text-slate-400 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        required
                        className="mt-0.5 accent-[var(--gold-primary)]"
                      />
                      <span>
                        Main MRAJ JEWELERS se call aur WhatsApp par quotation prapt karne ke liye sehmat hoon.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold mt-4 sm:mt-5 w-full flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl py-3 sm:py-3.5 text-xs min-[360px]:text-sm font-bold shadow-gold cursor-pointer transition active:scale-[0.99]"
                  >
                    <span>
                      {dialogSource.includes("old_gold")
                        ? "Request Valuation Quote"
                        : "Submit Settlement Inquiry"}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEDICATED QUICK INQUIRY POPUP MODAL (For 'Check Old Value' & 'Gold Loan Settlement') */}
      <AnimatePresence>
        {quickServiceModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md"
            onMouseDown={() => setQuickServiceModal({ ...quickServiceModal, isOpen: false })}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22 }}
              className="relative max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.3)] bg-[#14141c] p-4.5 sm:p-6 shadow-2xl text-slate-200"
              role="dialog"
              aria-modal="true"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3.5 top-3.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
                onClick={() => setQuickServiceModal({ ...quickServiceModal, isOpen: false })}
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {quickLeadSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                    <Check size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Request Sent Successfully!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed px-2">
                    Aapka quotation inquiry MRAJ JEWELERS team ko prapt ho gaya hai. Hamare gold specialist turant aapse WhatsApp aur call par sampark karenge.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => setQuickServiceModal({ ...quickServiceModal, isOpen: false })}
                      className="btn-gold py-2.5 px-4 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickLeadSubmit} className="space-y-3.5">
                  {/* Modal Header */}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <img
                        src={logoMrajWordmark}
                        alt="MRAJ"
                        className="h-3.5 w-auto object-contain"
                      />
                      <span className="brand-jewelers-text text-xs leading-none pt-0.5">
                        JEWELERS
                      </span>
                      <span className="ml-auto rounded-full bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] px-2 py-0.5 text-[9.5px] font-bold text-[var(--gold-light)]">
                        {quickServiceModal.category === "old_gold" ? "💎 Live Gold Rate" : "🔒 Zero Advance Fee"}
                      </span>
                    </div>

                    <h3 className="mt-2 font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                      {quickServiceModal.category === "old_gold"
                        ? "Check Old Gold Value"
                        : "Gold Loan Settlement"}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {quickServiceModal.category === "old_gold"
                        ? "Instant live gold valuation aur direct bank/cash payout"
                        : "Branch counter loan settlement aur direct locker release"}
                    </p>
                  </div>

                  {/* Field 1: Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Aapka Naam / Full Name <span className="text-[var(--gold-primary)]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={quickLeadForm.name}
                      onChange={(e) => setQuickLeadForm({ ...quickLeadForm, name: e.target.value })}
                      className="w-full rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#181824] px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[var(--gold-primary)] focus:outline-none"
                    />
                  </div>

                  {/* Field 2: Phone Number */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Phone Number (WhatsApp) <span className="text-[var(--gold-primary)]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--gold-primary)]">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="98XXXXXXXX (10 digits)"
                        value={quickLeadForm.phone}
                        onChange={(e) => setQuickLeadForm({ ...quickLeadForm, phone: e.target.value })}
                        className="w-full rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#181824] pl-11 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[var(--gold-primary)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Field 3: Location with scroll to choose option */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span>Aapki Location / City</span>
                      <span className="text-[9.5px] text-[var(--gold-light)] font-normal">Scroll to choose</span>
                    </label>
                    <div className="relative">
                      <select
                        value={quickLeadForm.location}
                        onChange={(e) => setQuickLeadForm({ ...quickLeadForm, location: e.target.value })}
                        className="w-full rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#181824] px-3 py-2 text-xs sm:text-sm text-white focus:border-[var(--gold-primary)] focus:outline-none appearance-none cursor-pointer pr-8"
                      >
                        {LOCATION_OPTIONS.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#181824] text-white">
                            {loc}
                          </option>
                        ))}
                      </select>
                      <MapPin size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gold-primary)] pointer-events-none" />
                    </div>
                  </div>

                  {/* Field 4: Category Wise Query (automatically selected with scroll to choose option) */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span>Category Query Type</span>
                      <span className="text-[9.5px] text-emerald-400 font-normal">Auto-selected</span>
                    </label>
                    <div className="relative">
                      <select
                        value={quickLeadForm.query}
                        onChange={(e) => setQuickLeadForm({ ...quickLeadForm, query: e.target.value })}
                        className="w-full rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#181824] px-3 py-2 text-xs sm:text-sm text-white focus:border-[var(--gold-primary)] focus:outline-none appearance-none cursor-pointer pr-8"
                      >
                        {(quickServiceModal.category === "old_gold" ? OLD_GOLD_QUERIES : GOLD_LOAN_QUERIES).map((q) => (
                          <option key={q} value={q} className="bg-[#181824] text-white">
                            {q}
                          </option>
                        ))}
                      </select>
                      <ArrowRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gold-primary)] pointer-events-none rotate-90" />
                    </div>
                  </div>

                  {/* Send Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-gold w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-bold shadow-gold rounded-xl cursor-pointer active:scale-[0.99]"
                    >
                      <Send size={14} />
                      <span>Send Request</span>
                      <ArrowRight size={14} />
                    </button>
                    <p className="text-[9px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                      <Lock size={10} className="text-[var(--gold-primary)]" /> 100% Confidential • Direct Gold Specialist Assistance
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Owner & Staff Admin Portal Dashboard */}
      {adminOpen && (
        <AdminPanel
          onClose={() => {
            setAdminOpen(false);
            if (window.location.hash === "#admin") {
              history.pushState("", document.title, window.location.pathname + window.location.search);
            }
          }}
          rates={goldRates}
          onUpdateRates={(newRates) => setGoldRates(newRates)}
        />
      )}
    </main>
  );
}

export default App;
