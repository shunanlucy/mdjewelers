import { FormEvent, useEffect, useState } from "react";
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
  Percent,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

import photoGoldLoan from "./assets/photo-gold-loan.png";
import photoSellJewellery from "./assets/photo-sell-jewellery.png";
import photoInstantCash from "./assets/photo-instant-cash.png";
import photoValuation from "./assets/photo-valuation.png";
import photoSafeProcess from "./assets/photo-safe-process.png";
import emblemMdJewelers from "./assets/emblem-md-jewelers.png";
import logoMdJewelers from "./assets/logo-md-jewelers.png";

// Live gold rates (indicative Indian market rates per gram)
const GOLD_RATES = {
  "24K": 7850,
  "22K": 7210,
  "20K": 6550,
  "18K": 5910,
};

const lendersList = [
  { name: "Muthoot Finance", color: "bg-red-50 text-red-700 border-red-200" },
  { name: "Manappuram Finance", color: "bg-amber-50 text-amber-800 border-amber-200" },
  { name: "SBI Gold Loan", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "HDFC Bank", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { name: "IIFL Gold Loan", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { name: "ICICI Bank", color: "bg-rose-50 text-rose-700 border-rose-200" },
  { name: "Shriram Finance", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "Muthoot Fincorp", color: "bg-blue-50 text-blue-800 border-blue-200" },
  { name: "Federal Bank", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  { name: "Canara Bank", color: "bg-cyan-50 text-cyan-800 border-cyan-200" },
  { name: "Axis Bank", color: "bg-pink-50 text-pink-800 border-pink-200" },
  { name: "Other Bank / NBFC", color: "bg-slate-50 text-slate-700 border-slate-200" },
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
  "Rahul S. from Pune received ₹1,14,000 cash after Muthoot settlement with MD JEWELERS",
  "Priya M. from Mumbai cleared ₹3,20,000 SBI Gold Loan in 40 mins with MD JEWELERS",
  "Suresh P. from Ahmedabad stopped auction & safely released ancestral gold jewellery",
  "Vikram K. from Bengaluru released 85g gold from Manappuram with ₹0 advance fees",
];

const faqs = [
  {
    question: "Kya main ghar par rakha purana ya toota sona bhi bech sakta hoon bina kisi loan ke?",
    answer:
      "Haan! MD JEWELERS me aap ghar par rakha purana, toota ya unused sona, gold jewellery, gold coins aur bullion bars bhi live IBJA market rate par direct sell kar sakte hain. German XRF testing se live digital purity check hoti hai aur bina kisi melting loss ke turant spot par Google Pay / PhonePe UPI ya instant bank transfer se payment milta hai.",
  },
  {
    question: "Kya aap Chandi (Silver Items, Sikke & Bartan) bhi khareedte hain?",
    answer:
      "Haan! Gold ke sath-sath hum silver jewellery, silver coins, chandi ke bartan aur silverware bhi 100% transparent live market rate par khareedte hain aur spot par instant cash/UPI payment dete hain.",
  },
  {
    question: "Kya 'Partial Gold Release' possible hai? Kya main aadha sona bechkar bacha hua sona ghar le ja sakta hoon?",
    answer:
      "Haan! Bilkul possible hai. Agar aapke paas 50 gram sona girvi hai aur loan amount ₹1.5 Lakh hai, to aap sirf utna hi sona (approx 21-22 gram) sell kar sakte hain jisse loan clear ho jaye, aur bacha hua 28 gram sona (jaise Mangalsutra ya Kangan) bina kisi loan ke apne ghar le ja sakte hain! Aapko poora sona bechne ki bilkul zaroorat nahi hai.",
  },
  {
    question: "Kya mujhe sona chhudwane ke liye pehle koi advance fees deni hogi?",
    answer:
      "Bilkul nahi! MD JEWELERS me ₹0 Advance Fee policy hai. Hamare authorized executive aapke sath lender branch aayenge aur poora loan amount hamari taraf se counter par pehle clear kiya jayega. Aapko apni pocket se ek rupya bhi pehle nahi dena hota.",
  },
  {
    question: "Mera sona kaise safe rahega? Kya sona kahin bahar le jaya jata hai?",
    answer:
      "Aapka sona 100% safe hai. Poora process aapke samne lender ki official branch (jaise Muthoot, Manappuram ya Bank) ke andar hota hai. Sona bank locker se nikal kar directly aapke hath me diya jata hai. Koi third-party involvement nahi hota.",
  },
  {
    question: "Mujhe Bank/Muthoot se Auction Notice (Nilaami) aa chuka hai, kya abhi bhi sona bach sakta hai?",
    answer:
      "Haan! Agar auction date abhi baaki hai, to hum same day branch jakar account settle karwa sakte hain aur auction immediately cancel ho jata hai. Kripya bina deri kiye turant hamare helpline ya WhatsApp par slip bhejein.",
  },
  {
    question: "Sone ki purity kaise check hoti hai? Kya sona pighlaya jayega?",
    answer:
      "Nahi! MD JEWELERS me non-destructive German Computerized Karatmeter (XRF Spectrometer) use hota hai. Isme sone ko bina kisi melting ya chemical damage ke, aapke samne 100% accurate digital purity test kiya jata hai. Ek milligram ka bhi melting loss nahi hota.",
  },
  {
    question: "Loan clear hone ke baad bacha hua cash mujhe kaise milega?",
    answer:
      "Branch me loan close hone ke baad, bacha hua poora extra cash turant aapke samne Google Pay / PhonePe UPI, Instant IMPS ya direct Bank Transfer se aapke account me transfer kar diya jata hai.",
  },
  {
    question: "Process ke liye mujhe kon-kon se documents sath lane honge?",
    answer:
      "Aapko sirf 4 basic documents chahiye: 1. Original Gold Loan Pledge Slip (Lender pauti) ya Gold purchase bill (agar available ho), 2. Original Aadhaar Card ya Voter ID, 3. PAN Card (KYC ke liye), aur 4. Bank account details / UPI QR code (extra cash lene ke liye).",
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

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const serviceCardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const highlightedServices = [
  {
    id: "gold-loan-settlement",
    title: "Gold Loan Settlement",
    hindi: "Bank / NBFC Se Sona Chhudwayein",
    pill: "⚡ ₹0 Advance Fee",
    pillColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    image: photoGoldLoan,
    icon: FileCheck,
    desc: "Muthoot, Manappuram, SBI ya kisi bhi bank me girvi rakha sona MD JEWELERS ke sath safely release karein. Hum pehle counter par poora loan clear karte hain aur bacha extra cash spot par dete hain.",
    bullets: [
      "100% Loan paid by us first (₹0 Advance Fee)",
      "Direct bank locker handover in front of you",
      "Partial release option available (keep gold)",
    ],
    actionText: "Calculate Settlement",
    actionType: "calculator",
  },
  {
    id: "sell-old-gold",
    title: "Sell Old Gold Jewellery",
    hindi: "Ghar Ka Purana, Toota Ya Unused Sona Bechein",
    pill: "💎 100% Live IBJA Rate",
    pillColor: "bg-amber-50 text-amber-800 border-amber-200",
    image: photoSellJewellery,
    icon: Sparkles,
    desc: "Ghar ya locker me rakhi purani jewellery, toote gehne, unhallmarked sona ya bullion coins ko highest national rate par bechein. German XRF Karatmeter se computerized digital testing hoti hai.",
    bullets: [
      "0% Melting Loss — Computerized testing",
      "No deductions on unhallmarked items",
      "Spot Google Pay / PhonePe UPI payment",
    ],
    actionText: "Check Old Gold Value",
    actionType: "old_gold",
  },
  {
    id: "instant-cash-payment",
    title: "Instant Cash Payment",
    hindi: "Walk Out With Your Money The Same Day",
    pill: "⚡ Spot UPI / IMPS",
    pillColor: "bg-blue-50 text-[#1a73e8] border-blue-200",
    image: photoInstantCash,
    icon: Banknote,
    desc: "Branch me loan close hote hi ya gold sell hote hi, bacha hua extra balance turant aapke Google Pay, PhonePe, UPI ya Bank account me 10 minute ke andar transfer ho jata hai bina kisi delay ke.",
    bullets: [
      "Immediate digital payment confirmation",
      "Zero hidden cuts or delayed cheques",
      "Digital transaction receipt on the spot",
    ],
    actionText: "Get Cash In Hand",
    actionType: "form_cash",
  },
  {
    id: "free-gold-valuation",
    title: "Free Gold Valuation & Consultancy",
    hindi: "Bina Kisi Kharch Ke Sahi Paramarsh Payein",
    pill: "📞 100% Free Advice",
    pillColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    image: photoValuation,
    icon: Users,
    desc: "Kitna byaaj bachega, kitna sona ghar la sakte hain, ya aaj ka accurate rate kya hai — hamare certified gold loan specialists se call, WhatsApp ya nearest hub me muft advice lein.",
    bullets: [
      "Exact calculation of loan interest & deductions",
      "Auction notice relief guidance before deadline",
      "Doorstep specialist visit in 10+ cities",
    ],
    actionText: "Book Free Consultation",
    actionType: "form_valuation",
  },
  {
    id: "safe-transparent-process",
    title: "100% Safe & Transparent Process",
    hindi: "Every Step Done In Front Of You",
    pill: "🔒 100% Legal & Safe",
    pillColor: "bg-slate-100 text-slate-800 border-slate-200",
    image: photoSafeProcess,
    icon: ShieldCheck,
    desc: "Poora transaction lender (Muthoot, Manappuram ya Bank) ki official branch ke andar aapke samne hota hai. Sona branch locker se nikal kar directly customer ke haath me diya jata hai.",
    bullets: [
      "Official bank closure receipt & customer NOC",
      "Zero third-party involvement or hidden terms",
      "Strict data privacy & customer dignity",
    ],
    actionText: "View 3-Step Process",
    actionType: "how_it_works",
  },
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
  const [selectedCity, setSelectedCity] = useState("Mumbai");

  // Calculator State: 'cash' = Full Loan Settlement, 'partial' = Partial Release (Save Gold), 'old_gold' = Sell Physical Old Gold (No Loan)
  const [calcMode, setCalcMode] = useState<"cash" | "partial" | "old_gold">("cash");
  const [goldGrams, setGoldGrams] = useState(50);
  const [goldPurity, setGoldPurity] = useState<"24K" | "22K" | "20K" | "18K">("22K");
  const [loanAmount, setLoanAmount] = useState(180000);
  const [selectedLender, setSelectedLender] = useState("Muthoot Finance");
  const [oldGoldItemType, setOldGoldItemType] = useState("Old Gold Jewellery");

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
    if (dialogOpen || mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [dialogOpen, mobileOpen]);

  const openForm = (source = "general") => {
    setDialogSource(source);
    setSubmitted(false);
    setMobileOpen(false);
    setDialogOpen(true);
  };

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    setMobileOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleServiceAction = (actionType: string) => {
    if (actionType === "calculator") {
      setCalcMode("cash");
      document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" });
    } else if (actionType === "old_gold") {
      setCalcMode("old_gold");
      document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" });
    } else if (actionType === "how_it_works") {
      document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
    } else if (actionType === "form_cash") {
      openForm("service_card_cash");
    } else if (actionType === "form_valuation") {
      openForm("service_card_valuation");
    }
  };

  // Calculations
  const ratePerGram = GOLD_RATES[goldPurity];
  const totalMarketValue = Math.round(goldGrams * ratePerGram);
  const netCashInHand = Math.max(0, totalMarketValue - loanAmount);

  // Partial release calculations: How many grams to sell to clear loan, how many to take home
  const gramsToSellForLoan = Math.min(goldGrams, Math.ceil(loanAmount / ratePerGram));
  const gramsReturnedHome = Math.max(0, goldGrams - gramsToSellForLoan);

  const whatsappUrl = `https://wa.me/919880011225?text=${encodeURIComponent(
    calcMode === "old_gold"
      ? `Hello MD JEWELERS, I want to sell physical old gold (${goldGrams}g, ${goldPurity}, ${oldGoldItemType}) in ${selectedCity}. Please share live valuation & nearest branch address.`
      : `Hello MD JEWELERS, I want to inquire about gold loan release from ${selectedLender} in ${selectedCity}. Approx Gold: ${goldGrams}g, Loan: ₹${loanAmount.toLocaleString(
          "en-IN"
        )}. Mode: ${calcMode === "partial" ? "Partial Gold Release (Keep Gold)" : "Full Settlement (Extra Cash)"}. Please share quotation.`
  )}`;

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8f9fd] text-slate-800 pb-28 sm:pb-24 lg:pb-0 font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Top PhonePe/GPay Live Rate Strip */}
      <div className="relative z-50 bg-[#1a73e8] text-white text-[10px] min-[360px]:text-[11px] sm:text-xs py-1.5 px-2.5 sm:px-6 shadow-xs">
        <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-0.5 no-scrollbar whitespace-nowrap w-full sm:w-auto">
            <span className="flex items-center gap-1.5 font-bold text-amber-300 shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE 24K: ₹7,850/g
            </span>
            <span className="text-blue-200 shrink-0">|</span>
            <span className="text-blue-100 font-medium shrink-0">
              22K: <strong className="text-amber-300">₹7,210/g</strong>
            </span>
            <span className="text-blue-200 shrink-0">|</span>
            <span className="text-blue-100 font-medium shrink-0">
              20K: <strong className="text-amber-300">₹6,550/g</strong>
            </span>
            <span className="text-blue-200 shrink-0">|</span>
            <span className="text-blue-100 font-medium shrink-0">
              Silver: <strong className="text-amber-200">₹94/g</strong>
            </span>
            <span className="hidden md:inline text-blue-300 shrink-0">|</span>
            <span className="hidden md:flex items-center gap-1 text-blue-100 font-medium shrink-0">
              <ShieldCheck size={13} className="text-amber-300" /> 100% Legal Bank Branch Settlement & Old Gold Purchase
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-blue-100">
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-amber-300" /> ₹0 Advance Fee Policy
            </span>
            <a
              href="tel:+919880011225"
              className="font-bold text-white hover:text-amber-300 transition flex items-center gap-1"
            >
              <Phone size={12} /> 1800 120 1225
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
            : "border-b border-slate-200/80 bg-white/90 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex h-[54px] min-[360px]:h-[58px] sm:h-[66px] lg:h-[72px] max-w-[1440px] items-center justify-between px-2.5 sm:px-6 lg:px-10 gap-2 sm:gap-3">
          {/* MD JEWELERS Brand Logo (Never Truncated) */}
          <a
            href="#top"
            onClick={(event) => scrollTo(event, "#top")}
            className="group relative z-10 flex items-center gap-2 shrink-0"
            aria-label="MD JEWELERS"
          >
            <img
              src={emblemMdJewelers}
              alt="MD JEWELERS"
              className="h-7.5 min-[360px]:h-8.5 sm:h-10 w-auto object-contain transition duration-300 group-hover:scale-105 shrink-0"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base min-[360px]:text-lg sm:text-xl md:text-2xl tracking-tight text-slate-900 leading-none whitespace-nowrap">
                  MD JEWELERS
                </span>
                <span className="hidden xl:inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 border border-emerald-200">
                  Verified
                </span>
              </div>
              <p className="hidden sm:block text-[9px] sm:text-[11px] text-slate-500 font-medium leading-tight whitespace-nowrap mt-0.5">
                Gold Loan Release & Old Gold
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links (Short, Simple, Google Pay Pill Style) */}
          <div className="hidden items-center gap-1 lg:flex">
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
                className="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-slate-700 hover:text-[#1a73e8] hover:bg-blue-50 transition-all duration-150 whitespace-nowrap"
              >
                {label}
              </a>
            ))}

            {/* Smooth 'More' Dropdown */}
            <div className="relative" id="more-menu-container">
              <button
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
                  moreMenuOpen
                    ? "bg-blue-50 text-[#1a73e8]"
                    : "text-slate-700 hover:text-[#1a73e8] hover:bg-blue-50"
                }`}
                aria-expanded={moreMenuOpen}
              >
                <span>More</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    moreMenuOpen ? "rotate-180 text-[#1a73e8]" : "text-slate-400"
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
                    className="absolute left-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50"
                  >
                    <div className="flex flex-col gap-0.5">
                      {[
                        {
                          label: "Sell Old Gold & Coins",
                          href: "#sell-old-gold",
                          icon: <Sparkles size={16} className="text-amber-500" />,
                          desc: "Live IBJA rate & zero melting loss",
                        },
                        {
                          label: "Auction Notice Relief",
                          href: "#auction-alert",
                          icon: <AlertTriangle size={16} className="text-red-500" />,
                          desc: "Urgent bank auction prevention help",
                        },
                        {
                          label: "Documents Checklist",
                          href: "#documents",
                          icon: <FileCheck size={16} className="text-blue-500" />,
                          desc: "Simple paperwork checklist",
                        },
                        {
                          label: "Supported Lenders",
                          href: "#lenders",
                          icon: <Building2 size={16} className="text-indigo-500" />,
                          desc: "Muthoot, Manappuram, SBI & Banks",
                        },
                        {
                          label: "Frequently Asked Questions",
                          href: "#faq",
                          icon: <HelpCircle size={16} className="text-emerald-500" />,
                          desc: "Clear answers to your questions",
                        },
                      ].map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(event) => {
                            scrollTo(event, item.href);
                            setMoreMenuOpen(false);
                          }}
                          className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition duration-150"
                        >
                          <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-blue-50 transition shrink-0">
                            {item.icon}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-slate-800 group-hover:text-[#1a73e8] transition">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-slate-500 leading-tight">
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

          {/* Desktop CTAs (Streamlined & Clean) */}
          <div className="relative z-10 hidden items-center gap-2 lg:flex shrink-0">
            <a
              href="tel:+919880011225"
              className="hidden xl:flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-[#1a73e8] hover:text-[#1a73e8] hover:bg-blue-50 transition duration-150"
              title="Call Toll-Free: 1800 120 1225"
            >
              <Phone size={13} className="text-[#1a73e8]" />
              <span>1800 120 1225</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#25d366] hover:bg-[#20bd5a] text-white px-3.5 py-2 text-xs font-bold shadow-xs hover:shadow-sm transition duration-150 whitespace-nowrap"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => openForm("header")}
              className="flex items-center gap-1.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white px-4 py-2 text-xs font-bold shadow-sm shadow-blue-500/20 hover:shadow-md transition duration-150 cursor-pointer whitespace-nowrap"
            >
              <span>Get Free Quote</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Quick Action Buttons (Call, WhatsApp, Menu) */}
          <div className="flex items-center gap-1 min-[360px]:gap-1.5 lg:hidden shrink-0">
            <a
              href="tel:+919880011225"
              className="flex h-8 w-8 min-[360px]:h-8.5 min-[360px]:w-8.5 items-center justify-center rounded-full bg-blue-50 text-[#1a73e8] border border-blue-200/80 hover:bg-blue-100 transition shrink-0"
              aria-label="Call MD JEWELERS"
            >
              <Phone size={13} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 min-[360px]:h-8.5 min-[360px]:w-8.5 items-center justify-center rounded-full bg-emerald-50 text-[#25d366] border border-emerald-200/80 hover:bg-emerald-100 transition shrink-0"
              aria-label="WhatsApp MD JEWELERS"
            >
              <MessageCircle size={14} />
            </a>
            <button
              className="flex h-8 w-8 min-[360px]:h-8.5 min-[360px]:w-8.5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-slate-50 transition shrink-0 cursor-pointer"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 top-[88px] sm:top-[108px] z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative z-50 mx-3 mt-1 max-h-[calc(100dvh-120px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl lg:hidden"
              >
                {/* Mobile Drawer Brand Header */}
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={emblemMdJewelers}
                      alt="MD JEWELERS"
                      className="h-8 w-auto object-contain"
                    />
                    <div>
                      <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                        MD JEWELERS
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Gold Loan Release & Buyback
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    Verified
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {[
                    ["Key Services & Highlights", "#services"],
                    ["How It Works (3 Steps)", "#how-it-works"],
                    ["Partial Gold Release (Keep Gold)", "#partial-release"],
                    ["Sell Old Gold & Coins (Instant Cash)", "#sell-old-gold"],
                    ["Settlement & Gold Calculator", "#calculator"],
                    ["Auction Notice Relief", "#auction-alert"],
                    ["Documents Required", "#documents"],
                    ["Supported Lenders", "#lenders"],
                    ["Frequently Asked Questions", "#faq"],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={(event) => {
                        scrollTo(event, href);
                        setMobileOpen(false);
                      }}
                      className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#1a73e8] transition"
                    >
                      {label}
                    </a>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] px-4 py-3 text-sm font-bold text-white shadow-sm"
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp Now
                  </a>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openForm("mobile_drawer");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a73e8] text-white py-3 text-sm font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    Request Free Settlement Call <ArrowRight size={16} />
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
        className="relative overflow-hidden pt-4 pb-10 min-[380px]:pt-6 min-[380px]:pb-14 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 bg-gradient-to-b from-[#eef4ff] via-[#f7f9fe] to-[#f8f9fd]"
      >
        <div className="relative mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12 w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 sm:gap-10 lg:items-center w-full min-w-0">
            {/* Left Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="w-full min-w-0 flex flex-col"
            >
              {/* Rotating Social Proof Pill */}
              {/* Live Settlement Proof Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-1.5 min-[360px]:gap-2 rounded-full bg-white/90 border border-blue-200/80 px-2.5 py-1 min-[360px]:px-3 min-[360px]:py-1.5 shadow-xs mb-4 min-[380px]:mb-5 backdrop-blur-xs max-w-full overflow-hidden"
              >
                <span className="flex items-center gap-1 text-[9px] min-[360px]:text-[10px] font-extrabold uppercase tracking-wider text-[#1a73e8] bg-blue-50 px-1.5 py-0.5 min-[360px]:px-2 rounded-full border border-blue-200/60 shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Live
                </span>
                <span className="truncate min-w-0 text-[10.5px] min-[360px]:text-xs font-semibold text-slate-700">
                  {liveTickerFeed[tickerIndex]}
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-black text-xl min-[360px]:text-2xl min-[420px]:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.18] sm:leading-[1.12] tracking-tight text-slate-950 break-words w-full"
              >
                Girvi Rakha Sona Chhudwayein,{" "}
                <span className="bg-gradient-to-r from-[#1a73e8] via-[#1557b0] to-blue-700 bg-clip-text text-transparent">
                  High Interest & Auction
                </span>{" "}
                Se Aazadi Payein.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-3 sm:mt-4 w-full max-w-xl text-xs min-[360px]:text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 break-words"
              >
                <strong className="text-slate-900 font-bold">MD JEWELERS</strong> ke sath Muthoot, Manappuram ya kisi bhi Bank se apna gold loan release karwayein bina kisi advance fees ke.
                Hum lender branch me jakar counter par poora loan clear karenge aur bacha hua sona ya extra cash spot par aapko saumpenge!
              </motion.p>

              {/* 4 Professional Fintech Feature Cards (2x2 Grid) */}
              <motion.div
                variants={fadeUp}
                className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-xl min-w-0"
              >
                {[
                  {
                    title: "₹0 Advance Fees",
                    desc: "Pehle ek rupya bhi nahi dena, payment hamari taraf se",
                    icon: Zap,
                    bg: "bg-blue-50",
                    text: "text-[#1a73e8]",
                    border: "border-blue-200/60",
                  },
                  {
                    title: "Partial Release Allowed",
                    desc: "Aadha sona becho, baaki zaroori sona safe ghar le jao",
                    icon: Scale,
                    bg: "bg-amber-50",
                    text: "text-amber-700",
                    border: "border-amber-200/60",
                  },
                  {
                    title: "Instant UPI / IMPS Payout",
                    desc: "Bacha cash 10 minute me spot par aapke account me",
                    icon: Wallet,
                    bg: "bg-emerald-50",
                    text: "text-emerald-700",
                    border: "border-emerald-200/60",
                  },
                  {
                    title: "100% Legal & Safe Process",
                    desc: "Branch locker me aapke samne legal loan closure NOC",
                    icon: ShieldCheck,
                    bg: "bg-indigo-50",
                    text: "text-indigo-700",
                    border: "border-indigo-200/60",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group relative flex items-start gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 min-[360px]:p-3 sm:p-3.5 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 w-full min-w-0"
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 min-[360px]:h-9 min-[360px]:w-9 shrink-0 items-center justify-center rounded-lg min-[360px]:rounded-xl ${item.bg} ${item.text} border ${item.border} group-hover:scale-105 transition-transform`}
                    >
                      <item.icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[10px] min-[360px]:text-[11px] text-slate-500 mt-0.5 min-[360px]:mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons & Micro-Guarantees */}
              <motion.div variants={fadeUp} className="mt-5 sm:mt-7 w-full max-w-xl min-w-0">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full min-w-0">
                  <button
                    onClick={() => openForm("hero_primary")}
                    className="group flex items-center justify-center gap-2 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white px-4 min-[360px]:px-5 sm:px-7 py-3 sm:py-3.5 text-xs min-[360px]:text-sm sm:text-base font-bold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 cursor-pointer active:scale-[0.99] w-full min-w-0"
                  >
                    <Zap size={16} className="text-amber-300 fill-amber-300 shrink-0" />
                    <span className="truncate">Release My Gold with ₹0 Advance</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 px-4 min-[360px]:px-5 sm:px-6 py-3 sm:py-3.5 text-xs min-[360px]:text-sm sm:text-base font-bold transition-all duration-200 w-full min-w-0"
                  >
                    <MessageCircle size={17} className="text-[#25d366] shrink-0" />
                    <span className="truncate">Send Loan Slip on WhatsApp</span>
                  </a>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] min-[360px]:text-[11px] font-medium text-slate-500 w-full min-w-0">
                  <span className="flex items-center gap-1 shrink-0">
                    <Lock size={12} className="text-emerald-600 shrink-0" /> 100% Confidential
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 shrink-0">
                    <Clock size={12} className="text-[#1a73e8] shrink-0" /> 10-Min Response
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 shrink-0">
                    <ShieldCheck size={12} className="text-amber-600 shrink-0" /> ₹0 Advance Policy
                  </span>
                </div>
              </motion.div>

              {/* Professional Frosted Metric Card */}
              <motion.div
                variants={fadeUp}
                className="mt-5 sm:mt-7 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/90 p-2.5 min-[360px]:p-3 sm:p-4 shadow-sm backdrop-blur-xs w-full max-w-xl min-w-0"
              >
                <div className="grid grid-cols-3 divide-x divide-slate-100 text-center w-full min-w-0">
                  <div className="px-1 min-[360px]:px-2 sm:px-4 min-w-0">
                    <p className="text-sm min-[360px]:text-base sm:text-2xl font-extrabold tracking-tight text-[#1a73e8] truncate">
                      ₹85 Cr+
                    </p>
                    <p className="text-[8.5px] min-[360px]:text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
                      Loans Settled
                    </p>
                  </div>
                  <div className="px-1 min-[360px]:px-2 sm:px-4 min-w-0">
                    <p className="text-sm min-[360px]:text-base sm:text-2xl font-extrabold tracking-tight text-slate-900 truncate">
                      18,500+
                    </p>
                    <p className="text-[8.5px] min-[360px]:text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
                      Families
                    </p>
                  </div>
                  <div className="px-1 min-[360px]:px-2 sm:px-4 min-w-0">
                    <p className="text-sm min-[360px]:text-base sm:text-2xl font-extrabold tracking-tight text-amber-600 flex items-center justify-center gap-0.5 sm:gap-1">
                      4.9 <span className="text-amber-500 text-xs sm:text-sm">★</span>
                    </p>
                    <p className="text-[8.5px] min-[360px]:text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
                      Rating
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Hero Card: Google Pay Style Calculator with Partial Mode Toggle */}
            <motion.div
              id="calculator"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative scroll-mt-20 sm:scroll-mt-24 mt-4 lg:mt-0 w-full min-w-0"
            >
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3 min-[360px]:p-4 sm:p-7 shadow-xl shadow-blue-900/5 relative overflow-hidden w-full min-w-0">
                {/* Top Header of Card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 sm:pb-3 gap-1 min-[360px]:gap-2">
                  <div className="flex items-center gap-1.5 min-[360px]:gap-2 sm:gap-2.5 min-w-0">
                    <span className="flex h-7 w-7 min-[360px]:h-8 min-[360px]:w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg min-[360px]:rounded-xl sm:rounded-2xl bg-blue-50 text-[#1a73e8]">
                      <Scale size={15} className="sm:w-[18px] sm:h-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-xs min-[360px]:text-sm sm:text-base font-extrabold text-slate-900 truncate">
                        Settlement Estimator
                      </h2>
                      <p className="text-[9px] min-[360px]:text-[10px] text-slate-500 truncate">Free valuation & calculation</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-1.5 py-0.5 min-[360px]:px-2.5 min-[360px]:py-1 text-[9px] min-[360px]:text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    ⚡ Zero Advance Fee
                  </span>
                </div>

                {/* Mode Selector Toggle: Cash vs Partial Release vs Sell Old Gold */}
                <div className="mt-3 grid grid-cols-3 gap-1 p-0.5 min-[360px]:p-1 bg-slate-100 rounded-xl sm:rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setCalcMode("cash")}
                    className={`py-1.5 min-[360px]:py-2 px-1 text-[9.5px] min-[360px]:text-[11px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 text-center ${
                      calcMode === "cash"
                        ? "bg-white text-[#1a73e8] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Wallet size={12} className="shrink-0" /> <span className="leading-tight">Full Cash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMode("partial")}
                    className={`py-1.5 min-[360px]:py-2 px-1 text-[9.5px] min-[360px]:text-[11px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 text-center ${
                      calcMode === "partial"
                        ? "bg-[#1a73e8] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Coins size={12} className="shrink-0" /> <span className="leading-tight">Keep Gold</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMode("old_gold")}
                    className={`py-1.5 min-[360px]:py-2 px-1 text-[9.5px] min-[360px]:text-[11px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 text-center ${
                      calcMode === "old_gold"
                        ? "bg-amber-500 text-slate-950 shadow-xs font-extrabold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Sparkles size={12} className="shrink-0" /> <span className="leading-tight">Sell Old Gold</span>
                  </button>
                </div>

                {/* Form Controls */}
                <div className="mt-3.5 space-y-3">
                  {/* Purity Selector with Live Rate */}
                  <div>
                    <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700 mb-1 flex justify-between items-center">
                      <span>Gold Karat Purity</span>
                      <span className="text-[10px] min-[360px]:text-[11px] text-[#1a73e8] font-extrabold">Rate: ₹{ratePerGram}/g</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full min-w-0">
                      {(["24K", "22K", "20K", "18K"] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setGoldPurity(p)}
                          className={`py-1.5 text-[11px] min-[360px]:text-xs font-bold rounded-lg sm:rounded-xl border transition cursor-pointer min-w-0 truncate ${
                            goldPurity === p
                              ? "bg-[#1a73e8] text-white border-[#1a73e8]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {calcMode === "old_gold" ? (
                    /* Old Gold Item Type */
                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700 mb-1 block">
                        What would you like to sell? (Item Type)
                      </label>
                      <select
                        value={oldGoldItemType}
                        onChange={(e) => setOldGoldItemType(e.target.value)}
                        className="form-input text-xs sm:text-sm font-semibold text-slate-800"
                      >
                        <option value="Old Gold Jewellery">Old Gold Jewellery (Chains, Bangles, Rings)</option>
                        <option value="Broken / Scrap Gold">Broken / Scrap Gold (Toota hua sona)</option>
                        <option value="Gold Coins & Bars">Gold Coins & Bullion Bars (999/995)</option>
                        <option value="Silver Items & Silverware">Silver Items / Chandi ke bartan & sikke</option>
                      </select>
                    </div>
                  ) : (
                    /* Select Lender for Loan Release */
                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700 mb-1 block">
                        Where is your gold pledged? (Lender)
                      </label>
                      <select
                        value={selectedLender}
                        onChange={(e) => setSelectedLender(e.target.value)}
                        className="form-input text-xs sm:text-sm font-semibold text-slate-800"
                      >
                        {lendersList.map((l) => (
                          <option key={l.name} value={l.name}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Gold Weight with Quick Preset Chips */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700">
                        {calcMode === "old_gold" ? "Physical Gold Weight" : "Total Pledged Gold Weight"}
                      </label>
                      <span className="text-xs min-[360px]:text-sm font-extrabold text-[#1a73e8] bg-blue-50 px-2 py-0.5 rounded-md">
                        {goldGrams} grams
                      </span>
                    </div>

                    {/* Quick Gram Chips */}
                    <div className="grid grid-cols-4 gap-1 sm:gap-1.5 mb-2 w-full min-w-0">
                      {[15, 45, 100, 200].map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => setGoldGrams(chip)}
                          className={`py-1 text-[10px] min-[360px]:text-[11px] font-bold rounded-lg sm:rounded-xl border transition cursor-pointer min-w-0 truncate ${
                            goldGrams === chip
                              ? "bg-[#1a73e8] text-white border-[#1a73e8]"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          {chip}g
                        </button>
                      ))}
                    </div>

                    <input
                      type="range"
                      min={5}
                      max={250}
                      step={5}
                      value={goldGrams}
                      onChange={(e) => setGoldGrams(Number(e.target.value))}
                      className="gold-range w-full"
                    />
                  </div>

                  {calcMode !== "old_gold" ? (
                    /* Loan Amount with Quick Chips (Only for loan settlement) */
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700">
                          Current Loan Balance (Bank Due)
                        </label>
                        <span className="text-xs min-[360px]:text-sm font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                          ₹{loanAmount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Quick Loan Amount Chips */}
                      <div className="grid grid-cols-4 gap-1 sm:gap-1.5 mb-2 w-full min-w-0">
                        {[50000, 150000, 300000, 500000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setLoanAmount(amt)}
                            className={`py-1 text-[10px] min-[360px]:text-[11px] font-bold rounded-lg sm:rounded-xl border transition cursor-pointer min-w-0 truncate ${
                              loanAmount === amt
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            ₹{amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}K`}
                          </button>
                        ))}
                      </div>

                      <input
                        type="range"
                        min={25000}
                        max={1500000}
                        step={25000}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="gold-range w-full"
                      />
                    </div>
                  ) : (
                    /* Zero Loan Assurance Banner for Old Gold */
                    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-2 min-[360px]:p-2.5 text-[10px] min-[360px]:text-[11px] text-amber-900 flex items-center gap-2">
                      <Sparkles size={15} className="text-amber-600 shrink-0" />
                      <span><strong>No Loan Deduction:</strong> Sell direct from home/locker & get 100% full market value instantly!</span>
                    </div>
                  )}

                  {/* Result Box: Changes based on Cash vs Partial vs Old Gold Mode */}
                  {calcMode === "old_gold" ? (
                    <div className="rounded-xl sm:rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/90 via-amber-50/30 to-emerald-50/40 p-3 min-[360px]:p-3.5 sm:p-4">
                      <div className="flex items-center justify-between text-[11px] min-[360px]:text-xs text-slate-600 pb-2 border-b border-amber-100">
                        <span>Live IBJA Value ({goldGrams}g @ {goldPurity})</span>
                        <span className="font-bold text-slate-900">
                          ₹{totalMarketValue.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] min-[360px]:text-xs text-slate-600 py-2 border-b border-amber-100">
                        <span>Melting / Testing Deduction</span>
                        <span className="font-bold text-emerald-700">
                          ₹0 (Zero Melting Loss)
                        </span>
                      </div>
                      <div className="pt-2.5 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] min-[360px]:text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                            <Sparkles size={13} className="text-amber-600 shrink-0" /> Instant Cash In Hand:
                          </p>
                          <p className="text-[9px] min-[360px]:text-[10px] text-slate-500">Google Pay / PhonePe UPI</p>
                        </div>
                        <p className="font-black text-xl min-[360px]:text-2xl sm:text-3xl text-emerald-700">
                          ₹{totalMarketValue.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ) : calcMode === "cash" ? (
                    <div className="rounded-xl sm:rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/90 via-emerald-50/30 to-blue-50/40 p-3 min-[360px]:p-3.5 sm:p-4">
                      <div className="flex items-center justify-between text-[11px] min-[360px]:text-xs text-slate-600 pb-2 border-b border-emerald-100">
                        <span>Est. Market Value ({goldGrams}g @ {goldPurity})</span>
                        <span className="font-bold text-slate-900">
                          ₹{totalMarketValue.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] min-[360px]:text-xs text-slate-600 py-2 border-b border-emerald-100">
                        <span>Loan Settled by MD JEWELERS</span>
                        <span className="font-bold text-rose-600">
                          - ₹{loanAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="pt-2.5 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] min-[360px]:text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                            <Check size={13} className="text-emerald-600 stroke-[3] shrink-0" /> Extra Cash In Your Hand:
                          </p>
                          <p className="text-[9px] min-[360px]:text-[10px] text-slate-500">Direct transfer via Google Pay / UPI</p>
                        </div>
                        <p className="font-black text-xl min-[360px]:text-2xl sm:text-3xl text-emerald-700">
                          ₹{netCashInHand.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl sm:rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/90 via-indigo-50/30 to-amber-50/40 p-3 min-[360px]:p-3.5 sm:p-4">
                      <div className="flex items-center justify-between text-[11px] min-[360px]:text-xs text-slate-600 pb-2 border-b border-blue-100">
                        <span>Total Gold Pledged:</span>
                        <span className="font-bold text-slate-900">{goldGrams} grams</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] min-[360px]:text-xs text-slate-600 py-2 border-b border-blue-100">
                        <span>Gold Sold to Pay ₹{loanAmount.toLocaleString("en-IN")} Loan:</span>
                        <span className="font-bold text-rose-600">
                          approx {gramsToSellForLoan} grams
                        </span>
                      </div>
                      <div className="pt-2.5 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] min-[360px]:text-[11px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
                            <Coins size={14} className="text-[#1a73e8] shrink-0" /> Gold You Take Back Home:
                          </p>
                          <p className="text-[9px] min-[360px]:text-[10px] text-slate-500">100% Debt-Free ancestral jewellery</p>
                        </div>
                        <p className="font-black text-xl min-[360px]:text-2xl sm:text-3xl text-[#1a73e8]">
                          {gramsReturnedHome} grams
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={() => openForm(calcMode === "old_gold" ? "sell_old_gold" : "quick_card")}
                    className="w-full flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-[#1a73e8] hover:bg-[#1557b0] text-white py-3 sm:py-3.5 text-xs min-[360px]:text-sm font-bold shadow-md shadow-blue-500/20 transition cursor-pointer active:scale-[0.99]"
                  >
                    <span>
                      {calcMode === "old_gold"
                        ? "Get Instant Cash For Old Gold"
                        : "Get Guaranteed Settlement Call"}
                    </span>
                    <ArrowRight size={15} />
                  </button>

                  <p className="text-[9px] min-[360px]:text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
                    <Lock size={11} className="text-slate-400" /> 100% confidential. No spam or marketing calls.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5 CORE HIGHLIGHTED SERVICES CARDS (With Scroll Animations & Visual Style matching user reference) */}
      <section id="services" className="scroll-mt-20 sm:scroll-mt-24 py-10 min-[380px]:py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          {/* Section Header with badge */}
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 min-[360px]:px-3.5 py-1 text-[11px] min-[360px]:text-xs font-extrabold uppercase tracking-widest text-amber-900 border border-amber-300">
              <Sparkles size={13} className="text-amber-600" /> MD JEWELERS Core Services
            </span>
            <h2 className="mt-2.5 text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              Aapke Sone Ki Poori Suraksha & <span className="text-amber-600">Spot Cash Ki Guarantee</span>
            </h2>
            <p className="mt-2.5 text-xs min-[360px]:text-sm sm:text-base text-slate-600 leading-relaxed">
              Bank loan release karwana ho ya purana sona bechna ho — MD JEWELERS par har step 100% transparent, legal aur aapke samne counter par hota hai.
            </p>
          </Reveal>

          {/* Row 1: 3 Cards (Gold Loan Settlement, Sell Old Gold Jewellery, Instant Cash Payment) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardStagger}
            className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0"
          >
            {highlightedServices.slice(0, 3).map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={serviceCardVariant}
                  className="group flex flex-col rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-xs hover:border-amber-300 hover:shadow-xl transition-all duration-300 overflow-hidden w-full min-w-0"
                >
                  {/* Photo container matching exact 1024/571 image ratio with zoom effect */}
                  <div className="relative aspect-[1024/571] w-full overflow-hidden bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70" />
                    <span className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] min-[360px]:text-[10px] font-extrabold uppercase tracking-wider shadow-xs border bg-white/95 backdrop-blur-xs ${card.pillColor}`}>
                      {card.pill}
                    </span>
                  </div>

                  {/* Floating circular icon badge overlapping the boundary (outside overflow-hidden so NEVER clipped) */}
                  <div className="-mt-5 sm:-mt-6 ml-4 min-[360px]:ml-6 sm:ml-7 relative z-10 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-amber-500 shadow-md border border-amber-200 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
                    <Icon size={18} className="sm:w-5 sm:h-5" strokeWidth={2.2} />
                  </div>

                  {/* Content */}
                  <div className="pt-2.5 min-[360px]:pt-3 pb-5 min-[360px]:pb-6 px-3.5 min-[360px]:px-5 sm:px-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base min-[360px]:text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#1a73e8] transition">
                          {card.title}
                        </h3>
                        <ArrowRight size={15} className="text-slate-400 group-hover:text-[#1a73e8] group-hover:translate-x-1 transition shrink-0" />
                      </div>
                      <p className="text-[11px] min-[360px]:text-xs font-bold text-amber-600 mt-0.5 min-[360px]:mt-1">
                        {card.hindi}
                      </p>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {card.desc}
                      </p>

                      <div className="mt-3.5 sm:mt-4 space-y-1.5 sm:space-y-2 pt-3 border-t border-slate-100">
                        {card.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-1.5 sm:gap-2 text-[11px] min-[360px]:text-xs font-semibold text-slate-800">
                            <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} strokeWidth={3} />
                            </div>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => handleServiceAction(card.actionType)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white py-2.5 px-3 min-[360px]:px-4 text-xs font-bold shadow-xs transition cursor-pointer active:scale-[0.99]"
                      >
                        <span>{card.actionText}</span>
                        <ArrowRight size={13} />
                      </button>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition shrink-0"
                        title="WhatsApp Enquiry"
                      >
                        <MessageCircle size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Row 2: 2 Cards Centered (Free Gold Valuation & Consultancy, 100% Safe & Transparent Process) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardStagger}
            className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto w-full min-w-0"
          >
            {highlightedServices.slice(3, 5).map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={serviceCardVariant}
                  className="group flex flex-col rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-xs hover:border-amber-300 hover:shadow-xl transition-all duration-300 overflow-hidden w-full min-w-0"
                >
                  {/* Photo container matching exact 1024/571 image ratio with zoom effect */}
                  <div className="relative aspect-[1024/571] w-full overflow-hidden bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70" />
                    <span className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] min-[360px]:text-[10px] font-extrabold uppercase tracking-wider shadow-xs border bg-white/95 backdrop-blur-xs ${card.pillColor}`}>
                      {card.pill}
                    </span>
                  </div>

                  {/* Floating circular icon badge overlapping the boundary (outside overflow-hidden so NEVER clipped) */}
                  <div className="-mt-5 sm:-mt-6 ml-4 min-[360px]:ml-6 sm:ml-7 relative z-10 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-amber-500 shadow-md border border-amber-200 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
                    <Icon size={18} className="sm:w-5 sm:h-5" strokeWidth={2.2} />
                  </div>

                  {/* Content */}
                  <div className="pt-2.5 min-[360px]:pt-3 pb-5 min-[360px]:pb-6 px-3.5 min-[360px]:px-5 sm:px-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base min-[360px]:text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#1a73e8] transition">
                          {card.title}
                        </h3>
                        <ArrowRight size={15} className="text-slate-400 group-hover:text-[#1a73e8] group-hover:translate-x-1 transition shrink-0" />
                      </div>
                      <p className="text-[11px] min-[360px]:text-xs font-bold text-amber-600 mt-0.5 min-[360px]:mt-1">
                        {card.hindi}
                      </p>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {card.desc}
                      </p>

                      <div className="mt-3.5 sm:mt-4 space-y-1.5 sm:space-y-2 pt-3 border-t border-slate-100">
                        {card.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-1.5 sm:gap-2 text-[11px] min-[360px]:text-xs font-semibold text-slate-800">
                            <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} strokeWidth={3} />
                            </div>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => handleServiceAction(card.actionType)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white py-2.5 px-3 min-[360px]:px-4 text-xs font-bold shadow-xs transition cursor-pointer active:scale-[0.99]"
                      >
                        <span>{card.actionText}</span>
                        <ArrowRight size={13} />
                      </button>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition shrink-0"
                        title="WhatsApp Enquiry"
                      >
                        <MessageCircle size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* PARTIAL GOLD RELEASE FEATURE HIGHLIGHT (Unique Competitive Advantage) */}
      <section id="partial-release" className="scroll-mt-20 sm:scroll-mt-24 py-10 min-[380px]:py-12 sm:py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <div className="rounded-2xl sm:rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 p-3.5 min-[360px]:p-5 sm:p-8 lg:p-10">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[#1a73e8] mb-2.5 sm:mb-3">
                  <Sparkles size={14} /> MD JEWELERS Special Service
                </div>
                <h2 className="text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  Poora Sona Bechna Zaroori Nahi!{" "}
                  <span className="text-[#1a73e8]">Aadha Sona Chhudwayein, Aadha Ghar Le Jayein.</span>
                </h2>
                <p className="mt-2.5 text-xs min-[360px]:text-sm sm:text-base text-slate-600 leading-relaxed">
                  Indian families ke liye sona sirf property nahi, aashirwaad hota hai (jaise Mangalsutra, Maa ke kangan).
                  Local sunar aapse poora sona bechne ka pressure banate hain. <strong>MD JEWELERS me aisa bilkul nahi hai!</strong>
                </p>

                <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3">
                  {[
                    "Sirf utna hi sona bechein jitne se bank ka loan clear ho sake.",
                    "Bacha hua ancestral/emotional jewellery bina kisi loan ke apne ghar le jayein.",
                    "Loan close hote hi lender branch me turant physical gold handover.",
                    "₹0 Advance Fees — MD JEWELERS pehle pura loan pay karega.",
                  ].map((pt) => (
                    <div key={pt} className="flex items-start sm:items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="h-4.5 w-4.5 sm:h-5 sm:w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 sm:mt-7 flex flex-col min-[480px]:flex-row gap-2.5 sm:gap-3">
                  <button
                    onClick={() => openForm("partial_release_section")}
                    className="flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-[#1a73e8] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 cursor-pointer hover:bg-[#1557b0] transition active:scale-[0.99]"
                  >
                    <span>Inquire for Partial Release</span> <ArrowRight size={14} />
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp flex items-center justify-center gap-1.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold py-2.5 sm:py-3 px-4 sm:px-5 shadow-xs"
                  >
                    <MessageCircle size={16} /> <span>WhatsApp Par Samjhein</span>
                  </a>
                </div>
              </div>

              {/* Graphic Representation of Partial Release */}
              <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 min-[360px]:p-5 sm:p-6 shadow-sm">
                <p className="text-[10px] min-[360px]:text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 sm:mb-4">
                  Example: 50g Gold Pledged Loan of ₹1,80,000
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[11px] sm:text-xs text-slate-500">1. Total Gold in Bank Locker</p>
                    <p className="text-base sm:text-lg font-extrabold text-slate-900">50 Grams Jewellery</p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-rose-50 border border-rose-200">
                    <p className="text-[11px] sm:text-xs text-rose-700 font-semibold">2. Sold to Clear ₹1.8L Bank Loan</p>
                    <p className="text-base sm:text-lg font-extrabold text-rose-700">approx 25 Grams Gold</p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-300 shadow-xs">
                    <p className="text-[11px] sm:text-xs text-emerald-800 font-bold">3. Gold Handed Over To Your Home (Debt Free!)</p>
                    <p className="text-xl sm:text-2xl font-black text-emerald-700">25 Grams Pure Gold</p>
                    <p className="text-[9px] min-[360px]:text-[10px] text-emerald-600 mt-0.5">✓ Mangalsutra & ancestral items safe in your family locker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELL OLD GOLD & SILVER SECTION (Physical Gold / Direct Spot Cash) */}
      <section id="sell-old-gold" className="scroll-mt-20 sm:scroll-mt-24 py-10 min-[380px]:py-14 sm:py-20 bg-[#f8f9fd] border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] min-[360px]:text-xs font-extrabold uppercase tracking-widest text-amber-900 border border-amber-300">
              <Sparkles size={13} className="text-amber-600" /> Direct Cash For Gold & Silver
            </span>
            <h2 className="mt-2.5 text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              Ghar Ka Purana, Toota Ya Unused Sona Bechein —{" "}
              <span className="text-amber-600">Spot Cash & Live IBJA Rate</span>
            </h2>
            <p className="mt-2 text-xs min-[360px]:text-sm sm:text-base text-slate-600 leading-relaxed">
              Agar aapke paas girvi sona nahi hai, balki ghar ya locker me purani jewellery, toota sona ya coins hain,
              to MD JEWELERS par paayein <strong>0% Melting Loss</strong> aur turant 10 minute me Google Pay / PhonePe UPI se cash.
            </p>
          </Reveal>

          {/* 4 Cards: What Old Gold We Buy */}
          <div className="mt-8 sm:mt-10 grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Old & Broken Jewellery",
                hindi: "Toota ya Puraana Sona",
                desc: "Tooti hui chain, purani anguthi, toote kangan ya unhallmarked ancestral gehne.",
                badge: "Any Condition Accepted",
                icon: Coins,
              },
              {
                title: "Gold Coins & Biscuits",
                hindi: "Gold Coins & 24K Bullion",
                desc: "Bank coins, MMTC, Tanishq ya local sunar ke 24K/22K hallmark coins & bars.",
                badge: "Highest Rate Guarantee",
                icon: Award,
              },
              {
                title: "Silver Items & Coins",
                hindi: "Chandi Ke Bartan & Sikke",
                desc: "Chandi ke glass, thali, murtis, silver payal, aur 999 fine silver coins.",
                badge: "Live Rate: ₹94/g",
                icon: Scale,
              },
              {
                title: "Ancestral Locker Gold",
                hindi: "Tijori Ka Puraana Sona",
                desc: "Saalon se locker me band bina istemaal ki jewellery bina kisi katauti ke sell karein.",
                badge: "Zero Wastage Cut",
                icon: ShieldCheck,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  delay={idx * 0.08}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 min-[360px]:p-5 sm:p-6 shadow-xs hover:border-amber-300 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                        <Icon size={20} />
                      </div>
                      <span className="text-[9px] min-[360px]:text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-slate-200">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{item.title}</h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-amber-700 mt-0.5">{item.hindi}</p>
                    <p className="mt-1.5 sm:mt-2 text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>

                  <button
                    onClick={() => {
                      setCalcMode("old_gold");
                      openForm("sell_old_gold_card");
                    }}
                    className="mt-4 sm:mt-5 w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 py-2 text-xs font-bold text-slate-800 transition cursor-pointer active:scale-[0.99]"
                  >
                    <span>Get Valuation</span>
                    <ArrowRight size={13} />
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Local Sunar vs MD JEWELERS Transparency Comparison */}
          <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 min-[360px]:p-6 sm:p-8 shadow-xs">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1a73e8]">
                  Why Sell to MD JEWELERS?
                </span>
                <h3 className="mt-1 text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900">
                  Local Dukaan vs MD JEWELERS: Farak Samjhein
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Aam sunar purana sona bechne par 15% se 25% tak kaat lete hain (Melting loss aur Dhaad ke naam par).
                  MD JEWELERS me computerized XRF machine se bina pighlaye 100% genuine digital rate milta hai.
                </p>

                <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5">
                  {[
                    "Zero Melting Loss: Sona bina pighlaye, live X-Ray Karatmeter se test hota hai.",
                    "No Deduction on Stones: Nagina ya pathar alag nikal kar wajan kiya jata hai.",
                    "Live IBJA Rate: Aaj ka official national bullion rate bina kisi fake cut ke.",
                    "Instant GPay / Bank Transfer: Payment 10 minute me counter par aapke samne.",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start sm:items-center gap-2 text-xs font-semibold text-slate-800">
                      <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Box */}
              <div className="rounded-xl sm:rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-blue-50/50 p-4 min-[360px]:p-5 sm:p-6 text-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white border border-amber-300 text-[11px] sm:text-xs font-bold text-amber-900 mb-2.5 sm:mb-3 shadow-xs">
                  <Sparkles size={14} className="text-amber-600" /> Free Doorstep & Branch Valuation
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">Apne Purane Sone Ki Keemat Janiye</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Apne gehne ya coins ki photo WhatsApp karein ya live calculator se turant quotation dekhein.
                </p>
                <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-2.5 justify-center">
                  <button
                    onClick={() => {
                      setCalcMode("old_gold");
                      document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 sm:px-5 py-2.5 text-xs font-bold shadow-xs transition cursor-pointer active:scale-[0.99]"
                  >
                    <Scale size={15} />
                    <span>Open Old Gold Calculator</span>
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp flex items-center justify-center gap-1.5 rounded-xl text-xs font-bold py-2.5 px-4 sm:px-5 shadow-xs"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Jewellery Photo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Auction Relief Card */}
      <section id="auction-alert" className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-10 lg:py-12 bg-[#f8f9fd]">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <div className="rounded-2xl sm:rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50/80 to-amber-50 p-4 min-[360px]:p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 mb-2 border border-amber-300">
                  <AlertTriangle size={14} className="text-amber-700" /> Urgent Nilaami / Auction Relief
                </div>
                <h2 className="text-xl min-[360px]:text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Bank ya Muthoot se <span className="text-rose-600">Auction Notice</span> aaya hai?
                </h2>
                <p className="mt-2 text-xs min-[360px]:text-sm sm:text-base text-slate-700 leading-relaxed">
                  Bank sona auction (nilaam) me aamtaur par 25-30% kam dam me bech deta hai aur bhari penalty fees kaat leta hai.
                  MD JEWELERS ki team same-day branch jakar poora loan close karegi aur aapka sona safe release karwayegi!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl text-xs min-[360px]:text-sm font-bold shadow-xs py-2.5 sm:py-3 px-4 sm:px-5"
                >
                  <MessageCircle size={17} /> <span>Stop My Auction Now</span>
                </a>
                <a
                  href="tel:+919880011225"
                  className="flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-slate-300 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs min-[360px]:text-sm font-bold text-slate-800 hover:bg-slate-50 transition shadow-xs"
                >
                  <Phone size={15} className="text-[#1a73e8]" /> <span>Urgent Helpline</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS REQUIRED CHECKLIST SECTION (Customer Clarity) */}
      <section id="documents" className="scroll-mt-20 sm:scroll-mt-24 py-10 min-[380px]:py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1a73e8]">
              Ready Checklist
            </span>
            <h2 className="mt-2 text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Branch Jane Se Pehle Kya Sath Lana Hai?
            </h2>
            <p className="mt-2 text-xs min-[360px]:text-sm sm:text-base text-slate-600">
              Sona release karwane ke liye customer ko sirf ye 4 aasan dastavez sath lane hote hain:
            </p>
          </Reveal>

          <div className="mt-8 sm:mt-10 grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                icon: FileCheck,
                title: "Original Loan Slip",
                desc: "Muthoot, Manappuram ya Bank ki original pledge receipt jisme packet number aur weight likha ho.",
              },
              {
                num: "02",
                icon: ShieldCheck,
                title: "Aadhaar Card / ID",
                desc: "Original Aadhaar Card, Voter ID ya Driving License (Bank me customer verification ke liye zaroori).",
              },
              {
                num: "03",
                icon: FileText,
                title: "PAN Card",
                desc: "RBI guidelines ke mutabik bank transactions ke clearance aur KYC formalities ke liye.",
              },
              {
                num: "04",
                icon: Banknote,
                title: "Bank Details / UPI",
                desc: "Aapka UPI ID (Google Pay / PhonePe) ya Bank passbook extra cash turant transfer karwane ke liye.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  delay={idx * 0.08}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50/60 p-4 min-[360px]:p-5 sm:p-6 relative hover:bg-white hover:border-blue-200 hover:shadow-sm transition"
                >
                  <span className="text-2xl sm:text-3xl font-black text-slate-200 absolute top-3 sm:top-4 right-4 sm:right-5">
                    {item.num}
                  </span>
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-50 text-[#1a73e8] mb-2.5 sm:mb-3">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* GERMAN KARATMETER TESTING & 0% MELTING LOSS GUARANTEE */}
      <section className="py-10 min-[380px]:py-12 sm:py-20 bg-[#f8f9fd] border-y border-slate-200">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 min-[360px]:p-6 sm:p-10 shadow-xs">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 mb-2.5 sm:mb-3">
                  <Award size={14} /> Zero Melting Loss Guarantee
                </div>
                <h2 className="text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  German Computerized Karatmeter Se Purity Testing
                </h2>
                <p className="mt-2.5 text-xs min-[360px]:text-sm sm:text-base text-slate-600 leading-relaxed">
                  Local sunaron ke yahan sona pighla kar ya tezaab (acid) me ghis kar 15-20% ka katauti laga di jaati hai.
                  <strong> MD JEWELERS me XRF Karatmeter testing hoti hai</strong> — bina sone ko touch kiye ya damage kiye exact digital purity aati hai.
                </p>

                <div className="mt-5 sm:mt-6 grid grid-cols-1 min-[360px]:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    ["0% Melting Loss", "Sona bilkul pighlaya nahi jata"],
                    ["100% Digital Report", "XRF X-Ray purity analysis"],
                    ["Stone Weight Deduction", "Nagina/Stone ka alag wajan"],
                    ["Customer Ke Samne", "Live testing in front of you"],
                  ].map(([title, desc]) => (
                    <div key={title} className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50">
                      <p className="text-xs font-bold text-slate-900">{title}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-[#f7f9fe] p-4 min-[360px]:p-6 text-center">
                <div className="h-14 w-14 sm:h-16 sm:w-16 mx-auto rounded-full bg-blue-100 text-[#1a73e8] flex items-center justify-center mb-2.5 sm:mb-3">
                  <Scale size={28} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Highest Live Market Rate Guarantee</h3>
                <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
                  MD JEWELERS Indian Bullion & Jewellers Association (IBJA) ke live market rate par poora paisa pay karta hai.
                </p>
                <div className="mt-3.5 sm:mt-4 inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold text-slate-800">
                  <span>Today's 22K Hallmarked Rate:</span>
                  <span className="text-emerald-700 font-black">₹7,210 / gram</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITY & BRANCH AVAILABILITY SELECTOR */}
      <section className="py-10 min-[380px]:py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1a73e8]">
            Nationwide Presence
          </span>
          <h2 className="mt-1 text-lg min-[360px]:text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">
            Aapke Shehar Me MD JEWELERS Branch Specialist Available
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Select your city to check live executive availability:
          </p>

          <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto">
            {citiesList.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold border transition cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                  selectedCity === city
                    ? "bg-[#1a73e8] text-white border-[#1a73e8] shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300"
                }`}
              >
                <MapPin size={12} />
                <span>{city}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </button>
            ))}
          </div>

          <p className="mt-3.5 sm:mt-4 text-xs text-emerald-700 font-semibold">
            ✓ <strong>{selectedCity}</strong> me hamara finance executive 30-45 minute me aapke lender branch pahunch sakta hai.
          </p>
        </div>
      </section>

      {/* 3-Step Simple Process */}
      <section id="how-it-works" className="scroll-mt-20 sm:scroll-mt-24 py-10 min-[380px]:py-14 sm:py-22 bg-[#f8f9fd] border-t border-slate-200">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1a73e8]">
              Transparent & Simple
            </span>
            <h2 className="mt-1.5 text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Sona Chhudwane Ka 3-Step Asaan Tarika
            </h2>
            <p className="mt-2 text-xs min-[360px]:text-sm sm:text-base text-slate-600">
              Aapko ek rupya bhi pehle nahi dena hota. Saari formality aur payment MD JEWELERS ki team branch me karti hai.
            </p>
          </Reveal>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: FileText,
                title: "Loan Slip Share Karein",
                desc: "Apne Muthoot, Manappuram ya Bank loan ki receipt/slip WhatsApp par bhejein. Hum 10 minute me exact settlement amount calculate karke denge.",
              },
              {
                step: "02",
                icon: Building2,
                title: "Branch Clearance With Executive",
                desc: "MD JEWELERS ka finance specialist aapke sath lender branch chalega aur poora loan balance counter par pay karke account officially close karwayega.",
              },
              {
                step: "03",
                icon: Banknote,
                title: "Sona Release & Instant UPI Cash",
                desc: "Sona bank locker se nikal kar directly aapke hath me aayega. Agar aap sona bechna chahte hain to bacha hua extra cash turant UPI/Bank account me paayein.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.step}
                  delay={idx * 0.1}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 min-[360px]:p-6 sm:p-8 relative group hover:border-blue-300 transition shadow-xs"
                >
                  <span className="inline-block rounded-lg sm:rounded-xl bg-[#1a73e8] px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-black text-white shadow-xs mb-2.5 sm:mb-3">
                    STEP {item.step}
                  </span>
                  <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-50 text-[#1a73e8] mb-2">
                    <Icon size={22} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#1a73e8] transition">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <button
              onClick={() => openForm("process_bottom")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 cursor-pointer active:scale-[0.99]"
            >
              <span>Start My 3-Step Release</span> <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Supported Lenders (GPay Bubbles) */}
      <section id="lenders" className="scroll-mt-20 sm:scroll-mt-24 py-10 min-[380px]:py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#1a73e8]">
              Broad Lender Coverage
            </p>
            <h2 className="mt-1 text-lg min-[360px]:text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">
              In Sabhi Banks & NBFCs Se Sona Release Karwayein
            </h2>
          </div>

          <div className="mt-7 sm:mt-9 grid grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {lendersList.map((lender) => (
              <div
                key={lender.name}
                className="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 text-center hover:border-[#1a73e8] hover:shadow-md transition group cursor-pointer"
              >
                <div className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl border ${lender.color} mb-1.5 sm:mb-2 group-hover:scale-110 transition font-black text-sm`}>
                  {lender.name[0]}
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#1a73e8] leading-tight">
                  {lender.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-5 sm:mt-6">
            Aapka loan kisi local cooperative bank ya kisi anya sanstha me bhi ho, MD JEWELERS poori sahayata karta hai.
          </p>
        </div>
      </section>

      {/* Comparison Section: Mobile Native Cards + Desktop Table */}
      <section className="py-10 min-[380px]:py-14 sm:py-22 bg-[#f8f9fd]">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1a73e8]">
              Fair Comparison
            </span>
            <h2 className="mt-1.5 text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Bank Auction vs Local Jeweller vs MD JEWELERS
            </h2>
            <p className="mt-2 text-xs min-[360px]:text-sm sm:text-base text-slate-600">
              Kyun hazaron parivar apne gold loan ke liye MD JEWELERS par bharosa karte hain:
            </p>
          </Reveal>

          {/* MOBILE VIEW (sm:hidden): Native Comparison Card Stack (No Horizontal Scroll Needed) */}
          <div className="mt-7 space-y-3 sm:hidden">
            {[
              {
                feature: "Gold Valuation",
                mdj: "100% Full Live Market Rate",
                auction: "25-30% Below Market",
                jeweller: "Under-weighing & Cuts",
              },
              {
                feature: "Partial Release",
                mdj: "Allowed (Take Gold Back Home)",
                auction: "Not Allowed (Full Loss)",
                jeweller: "Forces 100% Sale",
              },
              {
                feature: "Advance Charges",
                mdj: "₹0 Advance Fees (100% Free)",
                auction: "Heavy Penalty & Fees",
                jeweller: "High Cut Commission",
              },
              {
                feature: "Testing Accuracy",
                mdj: "German Computerized Karatmeter",
                auction: "Assumed Melting Loss",
                jeweller: "Acid/Scratch Rubbing",
              },
              {
                feature: "Extra Balance Cash",
                mdj: "Instant UPI / IMPS on Spot",
                auction: "Rarely Any Cash Left",
                jeweller: "Delayed / High Deductions",
              },
            ].map((item) => (
              <div
                key={item.feature}
                className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs"
              >
                <p className="text-xs font-extrabold text-slate-900 mb-2">
                  {item.feature}
                </p>

                {/* MD JEWELERS Top Advantage Pill */}
                <div className="rounded-xl border border-emerald-300 bg-emerald-50/80 p-2.5 mb-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="h-4 w-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-900 truncate">
                      MD JEWELERS:
                    </span>
                  </div>
                  <span className="text-[11px] font-black text-emerald-800 shrink-0 text-right">
                    {item.mdj}
                  </span>
                </div>

                {/* Bank Auction vs Local Jeweller Side-by-Side */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="rounded-lg bg-rose-50/80 border border-rose-100 p-2">
                    <p className="font-bold text-rose-700">Bank Auction:</p>
                    <p className="text-slate-600 mt-0.5">{item.auction}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-200 p-2">
                    <p className="font-bold text-slate-700">Local Jeweller:</p>
                    <p className="text-slate-600 mt-0.5">{item.jeweller}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP / TABLET VIEW (hidden sm:block): Full Table */}
          <div className="mt-10 overflow-x-auto hidden sm:block">
            <table className="w-full min-w-[620px] rounded-2xl border border-slate-200 bg-white text-left text-sm shadow-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <th className="p-4 sm:p-5">Feature</th>
                  <th className="p-4 sm:p-5 text-rose-600">Bank Auction</th>
                  <th className="p-4 sm:p-5 text-slate-600">Local Jeweller</th>
                  <th className="p-4 sm:p-5 text-[#1a73e8] bg-blue-50/80">MD JEWELERS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {[
                  ["Gold Valuation", "25-30% Below Market", "Under-weighing & Cuts", "100% Full Live Market Rate"],
                  ["Partial Release", "Not Allowed (Full Loss)", "Forces 100% Sale", "Allowed (Take Gold Back Home)"],
                  ["Advance Charges", "Heavy Penalty & Notice Fees", "High Commission", "₹0 Advance Fees (Completely Free)"],
                  ["Testing Accuracy", "Assumed Loss", "Acid/Scratch Rubbing", "German Computerized Karatmeter"],
                  ["Extra Balance Cash", "Rarely Any Cash Left", "Delayed / Deducted", "Instant UPI/IMPS on Spot"],
                ].map(([feature, auction, jeweller, mdj]) => (
                  <tr key={feature} className="hover:bg-slate-50/60">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{feature}</td>
                    <td className="p-4 sm:p-5 text-slate-500">{auction}</td>
                    <td className="p-4 sm:p-5 text-slate-500">{jeweller}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-blue-50/40">
                      ✓ {mdj}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Real Stories */}
      <section id="reviews" className="scroll-mt-20 sm:scroll-mt-24 py-10 min-[380px]:py-14 sm:py-22 bg-white">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1a73e8]">
              Real Customer Stories
            </span>
            <h2 className="mt-1.5 text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Log MD JEWELERS Par Kyun Bharosa Karte Hain
            </h2>
            <p className="mt-2 text-xs min-[360px]:text-sm sm:text-base text-slate-600">
              India bhar ke parivaron ne apne sone ko auction hone se bachaya aur nayi shuruat ki.
            </p>
          </Reveal>

          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Suresh Patel",
                city: "Ahmedabad, Gujarat",
                amount: "Muthoot Loan Cleared: ₹3,80,000",
                quote:
                  "Mujhe Muthoot se final auction notice aa chuka tha. MD JEWELERS ki team ne 24 ghante ke andar branch jakar poora loan settle karwaya aur meri patni ke mangalsutra ko bachaya. Mujhe ₹1,15,000 extra cash bhi mila!",
              },
              {
                name: "Smt. Sunita Patil",
                city: "Pune, Maharashtra",
                amount: "Manappuram Loan Cleared: ₹2,45,000",
                quote:
                  "Har mahine high compound interest bhar-bhar kar pareshan ho chuki thi. MD JEWELERS ne partial release karwake chain bechwayi aur mangalsutra mujhe safe de diya. Bahut hi sammanjanak aur transparent service thi.",
              },
              {
                name: "Imran Khan",
                city: "Hyderabad, Telangana",
                amount: "SBI Gold Loan Cleared: ₹5,20,000",
                quote:
                  "Mujhe darr tha ki koi fraud na ho, lekin MD JEWELERS ke executive ne SBI branch ke andar mere samne bank counter par payment ki. Poora sona mere hath me aaya aur bacha hua paisa turant UPI par mila.",
              },
            ].map((story, idx) => (
              <Reveal
                key={story.name}
                delay={idx * 0.1}
                className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50/50 p-4 min-[360px]:p-5 sm:p-7 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-2 text-xs sm:text-sm">
                    {"★".repeat(5)}
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 min-[360px]:py-1 text-[10px] min-[360px]:text-[11px] font-bold text-emerald-800 border border-emerald-200">
                    {story.amount}
                  </span>
                  <p className="mt-3 text-xs min-[360px]:text-sm leading-relaxed text-slate-700 italic">
                    "{story.quote}"
                  </p>
                </div>
                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-200/80 flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-50 text-[#1a73e8] font-extrabold text-xs sm:text-sm shrink-0">
                    {story.name[0]}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">{story.name}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500">{story.city}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-20 sm:scroll-mt-24 py-10 min-[380px]:py-14 sm:py-22 bg-[#f8f9fd]">
        <div className="mx-auto max-w-4xl px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <Reveal className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1a73e8]">
              Clear Answers
            </span>
            <h2 className="mt-1.5 text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Aapke Sawaal, Hamare Jawab (FAQ)
            </h2>
            <p className="mt-2 text-xs min-[360px]:text-sm text-slate-600">
              Sone ki settlement se judi har jankari bina kisi chhupaaw ke:
            </p>
          </Reveal>

          <div className="mt-7 sm:mt-10 space-y-2.5 sm:space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
                >
                  <button
                    className="flex w-full items-center justify-between gap-3 p-3.5 min-[360px]:p-4 sm:p-5 text-left cursor-pointer transition hover:bg-slate-50"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs min-[360px]:text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={17}
                      className={`shrink-0 text-[#1a73e8] transition duration-300 ${
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
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-3.5 min-[360px]:px-4 pb-3.5 min-[360px]:pb-4 sm:px-5 sm:pb-5 text-[11px] min-[360px]:text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-2.5 sm:pt-3">
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

      {/* Bottom Conversion CTA Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1a73e8] via-[#1557b0] to-[#0d47a1] py-10 min-[380px]:py-14 sm:py-20 text-white text-center">
        <div className="relative mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 min-[360px]:px-3.5 py-1 text-[11px] min-[360px]:text-xs font-bold text-amber-300 backdrop-blur-sm border border-white/20">
            <Lock size={12} /> 100% Confidential & Free Consultation
          </span>
          <h2 className="mt-3.5 text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-2xl mx-auto leading-tight">
            Aaj hi apna sona chhudwayein aur extra byaaj se azaad hoiye.
          </h2>
          <p className="mt-2.5 text-xs min-[360px]:text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
            Loan receipt WhatsApp par bhejein ya MD JEWELERS ke gold loan specialist se muft paramarsh lein.
          </p>
          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5">
            <button
              onClick={() => openForm("bottom_cta")}
              className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl text-xs min-[360px]:text-sm font-bold shadow-xl cursor-pointer py-3 sm:py-3.5 px-5 sm:px-6 active:scale-[0.99]"
            >
              <span>Get Free Settlement Quote</span> <ArrowRight size={15} />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl text-xs min-[360px]:text-sm font-bold shadow-lg py-3 sm:py-3.5 px-5 sm:px-6"
            >
              <MessageCircle size={17} /> <span>Chat on WhatsApp (Fast Reply)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer (With Physical Hub Addresses & Trust Certifications) */}
      <footer className="bg-[#0f172a] py-10 sm:py-12 text-slate-400 text-xs">
        <div className="mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-8 sm:pb-10 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={logoMdJewelers}
                  alt="MD JEWELERS"
                  className="h-11 sm:h-14 w-auto object-contain brightness-110 drop-shadow-md"
                />
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
                India's premier gold loan release and settlement assistance platform. Helping families safely clear pledged jewellery with dignity, zero advance charges, and maximum value.
              </p>
              <div className="mt-3.5 flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
                <CheckCircle2 size={13} /> GST Registered • BIS Standards Compliant
              </div>
            </div>

            <div>
              <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5 sm:mb-3">
                Key Services
              </p>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-amber-400 transition">Core Services & Highlights</a></li>
                <li><a href="#partial-release" className="hover:text-amber-400 transition">Partial Gold Release (Keep Gold)</a></li>
                <li><a href="#auction-alert" className="hover:text-amber-400 transition">Auction Notice Relief Help</a></li>
                <li><a href="#calculator" className="hover:text-amber-400 transition">Settlement Calculator</a></li>
                <li><a href="#documents" className="hover:text-amber-400 transition">Documents Required</a></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5 sm:mb-3">
                Registered Hubs & Showrooms
              </p>
              <div className="space-y-2 text-slate-400 text-[11px]">
                <p>
                  <strong className="text-white">Mumbai Hub:</strong> Shop 14, Ground Floor, Sheikh Memon St, Zaveri Bazaar, Mumbai 400002
                </p>
                <p>
                  <strong className="text-white">Delhi NCR Hub:</strong> 24/8, Bank Street, Karol Bagh, New Delhi 110005
                </p>
                <p className="text-[10px] text-amber-400">
                  + Doorstep branch executives in 10+ major Indian cities.
                </p>
              </div>
            </div>

            <div>
              <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5 sm:mb-3">
                Contact & Support
              </p>
              <p className="text-white font-semibold">Toll Free: 1800 120 1225</p>
              <p className="mt-1">WhatsApp: +91 98800 11225</p>
              <p className="mt-1">Email: support@mdjewelers.in</p>
              <p className="mt-2 text-[10px] text-slate-500">Working hours: 9:00 AM - 8:30 PM (All 7 Days)</p>
            </div>
          </div>

          <div className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10px] min-[360px]:text-[11px] text-slate-500 text-center sm:text-left">
            <p>© 2025-2026 MD JEWELERS. All rights reserved. GSTIN: 27AABCM8921P1Z5.</p>
            <p>100% legal branch clearance process. We do not provide unauthorized pawn loans.</p>
          </div>
        </div>
      </footer>

      {/* Desktop Floating WhatsApp Quick Trigger (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#25d366] text-white px-5 py-3 shadow-xl hover:bg-[#20ba5a] hover:scale-105 transition duration-200 group"
        >
          <MessageCircle size={22} className="group-hover:rotate-12 transition" />
          <span className="text-xs font-extrabold tracking-wide">WhatsApp Loan Slip</span>
        </a>
      </div>

      {/* Mobile Sticky Quick Action Bar (Ultra-responsive on 320px-360px Android devices) */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 min-[360px]:px-3 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center gap-1.5 min-[360px]:gap-2">
        <a
          href="tel:+919880011225"
          className="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl bg-slate-100 px-2 min-[360px]:px-3 py-1.5 min-[360px]:py-2 text-slate-700 border border-slate-200 min-w-[48px] min-[360px]:min-w-[58px] shrink-0"
        >
          <Phone size={15} className="text-[#1a73e8]" />
          <span className="text-[9px] min-[360px]:text-[10px] font-bold mt-0.5">Call</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 min-[360px]:gap-1.5 rounded-xl sm:rounded-2xl bg-[#25d366] py-2 min-[360px]:py-2.5 px-1.5 text-[11px] min-[360px]:text-xs font-bold text-white shadow-xs whitespace-nowrap"
        >
          <MessageCircle size={15} className="shrink-0" />
          <span className="truncate">WhatsApp Slip</span>
        </a>
        <button
          onClick={() => openForm("sticky_mobile")}
          className="flex-1 flex items-center justify-center gap-1 rounded-xl sm:rounded-2xl bg-[#1a73e8] text-white py-2 min-[360px]:py-2.5 px-1.5 text-[11px] min-[360px]:text-xs font-bold shadow-xs cursor-pointer active:scale-[0.99] whitespace-nowrap"
        >
          <span className="truncate">Release Sona</span>
          <ArrowRight size={13} className="shrink-0" />
        </button>
      </div>

      {/* Lead Capture Dialog */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-2 min-[360px]:p-3 sm:p-4 backdrop-blur-xs"
            onMouseDown={() => setDialogOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative max-h-[94dvh] w-full max-w-lg overflow-y-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 min-[360px]:p-5 sm:p-8 shadow-2xl text-slate-800"
              role="dialog"
              aria-modal="true"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition cursor-pointer"
                onClick={() => setDialogOpen(false)}
                aria-label="Close"
              >
                <X size={17} />
              </button>

              {submitted ? (
                <div className="py-6 sm:py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                    <Check size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-3.5 text-xl sm:text-2xl font-extrabold text-slate-900">Anurodh Prapt Hua!</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    MD JEWELERS ke gold loan specialist 10 minute ke andar aapse call karenge aur aapke branch settlement ki poori jankari denge.
                  </p>
                  <div className="mt-5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-blue-50 border border-blue-100 text-xs text-[#1a73e8] font-semibold">
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
                      className="flex-1 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-100 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
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
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={emblemMdJewelers}
                      alt="MD JEWELERS"
                      className="h-6 sm:h-7 w-auto object-contain"
                    />
                    <div className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 sm:px-3 py-0.5 text-[10px] min-[360px]:text-[11px] font-extrabold text-[#1a73e8]">
                      <Zap size={11} /> MD JEWELERS Free Quote
                    </div>
                  </div>
                  <h3 className="mt-1.5 text-lg min-[360px]:text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                    Sona Chhudwane Ke Liye Details Bharein
                  </h3>
                  <p className="mt-1 text-[11px] min-[360px]:text-xs text-slate-500">
                    ₹0 advance charges. Aapka data 100% confidential aur safe rahega.
                  </p>

                  <div className="mt-4 sm:mt-5 space-y-3">
                    <div>
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700 block mb-1">
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
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700 block mb-1">
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
                        <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700 block mb-1">
                          Lender (Branch)
                        </label>
                        <select
                          name="lender"
                          defaultValue={selectedLender}
                          className="form-input text-xs font-semibold"
                        >
                          {lendersList.map((l) => (
                            <option key={l.name} value={l.name}>
                              {l.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700 block mb-1">
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
                      <label className="text-[11px] min-[360px]:text-xs font-bold text-slate-700 block mb-1">
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
                        <option value="sell_old_gold">Sell Old Gold (Ghar ka purana / toota sona bechna)</option>
                        <option value="sell_coins">Sell Gold Coins & Bullion Bars (Instant Cash)</option>
                        <option value="sell_silver">Sell Silver Items (Chandi ke bartan / payal / sikke)</option>
                        <option value="partial_release">Partial Gold Release (Aadha sona becho, bacha sona ghar le jao)</option>
                        <option value="full_settlement">Full Loan Settlement (Bank se poora sona chhudwana)</option>
                        <option value="auction_help">Urgent Auction / Nilaami Notice Relief</option>
                      </select>
                    </div>

                    <label className="flex items-start gap-2 text-[10px] min-[360px]:text-[11px] text-slate-500 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        required
                        className="mt-0.5 accent-[#1a73e8]"
                      />
                      <span>
                        Main MD JEWELERS ke specialist se call aur WhatsApp par quotation paane ke liye sehmat hoon.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 sm:mt-5 w-full flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-[#1a73e8] hover:bg-[#1557b0] text-white py-3 sm:py-3.5 text-xs min-[360px]:text-sm font-bold shadow-md shadow-blue-500/20 cursor-pointer transition active:scale-[0.99]"
                  >
                    <span>
                      {dialogSource.includes("old_gold")
                        ? "Request Free Valuation & Cash Quote"
                        : "Request Free Settlement Call"}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
