import { useEffect, useState } from "react";
import { AdminPanel } from "./AdminPanel";
import { GoldRatesConfig } from "./types/admin";
import { DEFAULT_RATES } from "./constants/adminDefaults";
import { citiesList } from "./constants/publicData";
import { initGeoTracking, trackEvent } from "./analytics";

// Modular public components
import { PublicNavbar } from "./components/public/PublicNavbar";
import { HeroSection } from "./components/public/HeroSection";
import { ServicesSection } from "./components/public/ServicesSection";
import { LoanCalculatorSection } from "./components/public/LoanCalculatorSection";
import { ProcessSection } from "./components/public/ProcessSection";
import { AuctionNoticeSection } from "./components/public/AuctionNoticeSection";
import { FaqSection } from "./components/public/FaqSection";
import { CustomerFeedbackSection } from "./components/public/CustomerFeedbackSection";
import { PublicFooter } from "./components/public/PublicFooter";
import { FloatingActions } from "./components/public/FloatingActions";
import { LeadModals } from "./components/public/LeadModals";
import { WhatsAppCategoryModal } from "./components/public/WhatsAppCategoryModal";

export function App() {
  // Live Gold Rates State (Synchronized with LocalStorage and Admin Panel)
  const [goldRates, setGoldRates] = useState<GoldRatesConfig>(() => {
    try {
      const saved = localStorage.getItem("mraj_gold_rates");
      return saved ? JSON.parse(saved) : DEFAULT_RATES;
    } catch {
      return DEFAULT_RATES;
    }
  });

  // Selected City & Lead Modals State
  const [selectedCity] = useState(citiesList[0] || "Kalyani"); // Kalyani default
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSource, setDialogSource] = useState("general");
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Quick Service Modal State (Old Gold & Gold Loan Settlement)
  const [quickServiceModal, setQuickServiceModal] = useState<{
    isOpen: boolean;
    category: "old_gold" | "gold_loan";
  }>({
    isOpen: false,
    category: "old_gold",
  });

  // Track initial visits and location telemetry on load
  useEffect(() => {
    initGeoTracking();
    trackEvent("page_view", "MRAJ JEWELERS Home Page");

    if (window.location.hash === "#admin") {
      setAdminOpen(true);
    }

    const handleHash = () => {
      if (window.location.hash === "#admin") {
        setAdminOpen(true);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Scroll detection for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body overflow lock when modals are open
  useEffect(() => {
    if (dialogOpen || quickServiceModal.isOpen || adminOpen || whatsappModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [dialogOpen, quickServiceModal.isOpen, adminOpen, whatsappModalOpen]);

  // Primary WhatsApp URL with target phone number (81011 21813)
  const whatsappUrl = `https://wa.me/918101121813?text=${encodeURIComponent(
    `Hello MRAJ JEWELERS, I want to inquire about Gold Loan Settlement & Jewellery Release in ${selectedCity}. Please guide me.`
  )}`;

  // Handlers
  const handleOpenForm = (source = "general") => {
    setDialogSource(source);
    setDialogOpen(true);
    trackEvent("popup_open", `Lead Dialog (${source})`);
  };

  const handleOpenWhatsAppModal = () => {
    setWhatsappModalOpen(true);
    trackEvent("popup_open", "WhatsApp Category Selection Modal");
  };

  const handleOpenQuickModal = (category: "old_gold" | "gold_loan") => {
    setQuickServiceModal({ isOpen: true, category });
    trackEvent(
      "popup_open",
      category === "old_gold" ? "Quick Modal: Sell Old Gold" : "Quick Modal: Gold Loan Settlement"
    );
  };

  const handleScrollTo = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    if (target === "#calculator") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      trackEvent("card_click", "Navbar Scroll to Calculator");
      return;
    }
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-slate-100 overflow-x-hidden selection:bg-[var(--gold-primary)] selection:text-black">
      {/* 1. Header Navigation Bar */}
      <PublicNavbar
        isScrolled={isScrolled}
        onOpenForm={handleOpenForm}
        onOpenAdmin={() => setAdminOpen(true)}
        onScrollTo={handleScrollTo}
        whatsappUrl={whatsappUrl}
        onOpenWhatsApp={handleOpenWhatsAppModal}
      />

      {/* 2. Hero Section with Video Showcase, Chips & CTAs */}
      <HeroSection onOpenForm={handleOpenForm} whatsappUrl={whatsappUrl} />

      {/* 3. Core Services: Gold Loan Settlement & Sell Old Gold */}
      <ServicesSection onOpenQuickModal={handleOpenQuickModal} />

      {/* 4. Interactive Settlement & Valuation Calculator with Modal */}
      <LoanCalculatorSection
        goldRates={goldRates}
        onOpenForm={handleOpenForm}
        selectedCity={selectedCity}
      />

      {/* 5. 3-Step Easy Process Roadmap */}
      <ProcessSection />

      {/* 6. Customer Feedback & Verified Reviews (Social Proof after Process) */}
      <CustomerFeedbackSection />

      {/* 7. Urgent Auction Notice Relief & Supported Lenders */}
      <AuctionNoticeSection whatsappUrl={whatsappUrl} />

      {/* 8. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 9. Luxury Footer with Locations & Admin Link */}
      <PublicFooter onOpenAdmin={() => setAdminOpen(true)} />

      {/* 9. Floating WhatsApp Button & Sticky Mobile Action Bar */}
      <FloatingActions
        whatsappUrl={whatsappUrl}
        onOpenForm={handleOpenForm}
        onOpenWhatsApp={handleOpenWhatsAppModal}
      />

      {/* 10. WhatsApp Inquiry Category Selection Modal */}
      <WhatsAppCategoryModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        selectedCity={selectedCity}
      />

      {/* 11. Inquiry & Lead Capture Dialog Modals */}
      <LeadModals
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogSource={dialogSource}
        quickServiceModal={quickServiceModal}
        setQuickServiceModal={setQuickServiceModal}
        selectedLender="Muthoot Finance"
        goldGrams={50}
        whatsappUrl={whatsappUrl}
      />

      {/* 11. Staff / Owner Admin Portal */}
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
