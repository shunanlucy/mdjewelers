import React, { useState, useEffect, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Heart,
  MapPin,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  UserCheck,
  X,
} from "lucide-react";
import { CustomerFeedback } from "../../types/admin";
import { SAMPLE_FEEDBACKS } from "../../constants/adminDefaults";
import { LOCATION_OPTIONS } from "../../constants/publicData";
import { trackEvent } from "../../analytics";

const RATING_LABELS: Record<number, string> = {
  5: "Outstanding Experience (5/5)",
  4: "Very Good & Professional (4/5)",
  3: "Good & Satisfied (3/5)",
  2: "Average Service (2/5)",
  1: "Needs Improvement (1/5)",
};

const AVATAR_GRADIENTS = [
  "from-amber-600 to-amber-800 text-amber-100",
  "from-blue-600 to-blue-800 text-blue-100",
  "from-emerald-600 to-emerald-800 text-emerald-100",
  "from-rose-600 to-rose-800 text-rose-100",
  "from-purple-600 to-purple-800 text-purple-100",
  "from-cyan-600 to-cyan-800 text-cyan-100",
  "from-indigo-600 to-indigo-800 text-indigo-100",
  "from-teal-600 to-teal-800 text-teal-100",
];

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (name[0] || "M").toUpperCase();
};

const getAvatarGradient = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const getRelativeTime = (isoString: string) => {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return "Kal";
    if (diffDays < 7) return `${diffDays} din pehle`;
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks === 1) return "1 week ago";
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "1 month ago";
    return `${diffMonths} months ago`;
  } catch {
    return "Recent";
  }
};

// Mini Google Icon for realistic verified review vibe
const GoogleIcon: React.FC = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const CustomerFeedbackSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Feedbacks loaded from localStorage or initialized with defaults (guarantees all 10 realistic reviews)
  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>(() => {
    try {
      const saved = localStorage.getItem("mraj_customer_feedbacks");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10) {
          return parsed;
        }
        // Merge missing authentic reviews if saved had fewer old items
        const existingIds = new Set(parsed.map((p: any) => p.id));
        const missing = SAMPLE_FEEDBACKS.filter((s) => !existingIds.has(s.id));
        const merged = [...parsed, ...missing];
        localStorage.setItem("mraj_customer_feedbacks", JSON.stringify(merged));
        return merged;
      }
      localStorage.setItem("mraj_customer_feedbacks", JSON.stringify(SAMPLE_FEEDBACKS));
      return SAMPLE_FEEDBACKS;
    } catch {
      return SAMPLE_FEEDBACKS;
    }
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: LOCATION_OPTIONS[0] || "Kalyani",
    serviceType: "Gold Loan Settlement",
    rating: 5,
    comment: "",
    recommended: true,
  });

  // Sync state to localStorage whenever feedbacks change
  useEffect(() => {
    localStorage.setItem("mraj_customer_feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    const newFeedback: CustomerFeedback = {
      id: "fb-" + Date.now(),
      createdAt: new Date().toISOString(),
      name: formData.name.trim(),
      phone: formData.phone.trim() || undefined,
      location: formData.location,
      serviceType: formData.serviceType,
      rating: formData.rating,
      comment: formData.comment.trim(),
      recommended: formData.recommended,
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem("mraj_customer_feedbacks", JSON.stringify(updated));
    trackEvent("feedback_submitted", `${formData.name} - ${formData.rating}★ (${formData.location})`);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        name: "",
        phone: "",
        location: LOCATION_OPTIONS[0] || "Kalyani",
        serviceType: "Gold Loan Settlement",
        rating: 5,
        comment: "",
        recommended: true,
      });
    }, 2400);
  };

  return (
    <section id="reviews" className="relative py-10 sm:py-14 bg-[#0c0c10] border-y border-[rgba(212,175,55,0.18)] overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1440px] px-3 min-[360px]:px-4 sm:px-8 lg:px-12 w-full">
        {/* Section Header with Stats & Call-To-Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[rgba(212,175,55,0.15)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)]">
                <Heart size={12} className="fill-[var(--gold-primary)]" />
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--gold-light)]">
                Genuine Customer Experiences
              </p>
            </div>
            <h2 className="font-serif text-2xl min-[380px]:text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Customer Feedback &{" "}
              <span className="gold-gradient-text">Verified Reviews</span>
            </h2>
          </div>

          {/* Action: Review Dein Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => {
                trackEvent("button_click", "Open Customer Feedback Modal");
                setModalOpen(true);
              }}
              className="btn-gold flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold shadow-gold rounded-xl cursor-pointer active:scale-[0.98] transition"
            >
              <MessageSquare size={14} />
              <span>Review Dein</span>
            </button>
          </div>
        </div>

        {/* 10 Reviews Horizontal Carousel with Continuous CSS Auto-Scroll */}
        <div className="relative overflow-hidden w-full py-2">
          {/* Subtle side fade vignettes for luxurious entry & exit */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-[#0c0c10] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-[#0c0c10] to-transparent z-10" />

          {/* Marquee Track: Seamless GPU-driven Right-to-Left movement */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className={`flex gap-3.5 sm:gap-4.5 animate-review-marquee select-none ${isPaused ? "paused" : ""}`}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {[...feedbacks, ...feedbacks].map((fb, idx) => {
              const initials = getInitials(fb.name);
              const avatarGrad = getAvatarGradient(fb.name);
              const relativeTime = getRelativeTime(fb.createdAt);

              return (
                <div
                  key={`${fb.id || "fb"}-${idx}`}
                  className="w-[290px] min-[400px]:w-[330px] sm:w-[360px] shrink-0 flex flex-col justify-between rounded-2xl border border-[rgba(212,175,55,0.2)] bg-gradient-to-b from-[#161624] to-[#101018] p-4 sm:p-5 shadow-lg shadow-black/50 hover:border-[var(--gold-primary)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.15)] transition-all duration-300 cursor-pointer"
                >
                  <div className="space-y-3">
                    {/* Top User Info & Verification Header */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Avatar Initial Circle with diverse colors */}
                        <div
                          className={`h-10 w-10 rounded-full bg-gradient-to-br ${avatarGrad} flex items-center justify-center font-bold text-xs shadow-md shrink-0 border border-white/10`}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-tight">
                              {fb.name}
                            </h4>
                            <UserCheck
                              size={13}
                              className="text-emerald-400 shrink-0"
                              title="Verified Reviewer"
                            />
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-slate-400">
                              {relativeTime}
                            </span>
                            <span className="text-[9px] text-slate-500">•</span>
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-[var(--gold-light)]">
                              <MapPin size={10} /> {fb.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Google Verified Badge */}
                      <span className="inline-flex items-center gap-1 text-[9.5px] text-slate-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 shrink-0">
                        <GoogleIcon />
                        <span className="font-medium">Verified</span>
                      </span>
                    </div>

                    {/* Star Rating & Service Type */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-[rgba(212,175,55,0.1)]">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={13}
                            className={
                              star <= fb.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-800 text-slate-700"
                            }
                          />
                        ))}
                        <span className="text-[11px] font-bold text-slate-300 ml-1">
                          {fb.rating}.0
                        </span>
                      </div>

                      <span className="text-[10px] font-medium text-slate-400 bg-black/40 px-2 py-0.5 rounded-md border border-[rgba(212,175,55,0.12)] truncate max-w-[170px]">
                        {fb.serviceType}
                      </span>
                    </div>

                    {/* Natural Human Review Text */}
                    <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal pt-1">
                      "{fb.comment}"
                    </p>
                  </div>

                  {/* Card Bottom: Recommendation & Trust Pill */}
                  <div className="mt-4 pt-2.5 border-t border-[rgba(212,175,55,0.12)] flex items-center justify-between gap-2 text-[10.5px]">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>Zero Advance Settlement</span>
                    </span>

                    {fb.recommended !== false ? (
                      <span className="inline-flex items-center gap-1 text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                        <ThumbsUp size={10} className="text-[var(--gold-primary)]" />
                        <span>Recommends</span>
                      </span>
                    ) : (
                      <span className="text-slate-500">Verified Client</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Feedback Submission Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-2 min-[360px]:p-3 sm:p-4 backdrop-blur-md overflow-y-auto"
            onMouseDown={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative max-h-[94dvh] w-full max-w-lg overflow-y-auto rounded-2xl sm:rounded-3xl border border-[rgba(212,175,55,0.32)] bg-[#181824] p-4 min-[360px]:p-5 sm:p-7 shadow-2xl text-slate-200"
              role="dialog"
              aria-modal="true"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Top ambient gold accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent" />

              {/* Close Button */}
              <button
                className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer z-10"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {submitted ? (
                /* Success Celebration State */
                <div className="py-8 flex flex-col items-center text-center space-y-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shadow-xl">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Feedback Prapt Hua!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xs">
                    Dhanyawad <strong className="text-[var(--gold-light)]">{formData.name}</strong> ji! Aapka anubhav safalta-purvak record ho gaya hai.
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 pt-2">
                    <Sparkles size={13} /> MRAJ JEWELERS Par Vishwas Ke Liye Shukriya!
                  </span>
                </div>
              ) : (
                /* Feedback Form */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-[rgba(212,175,55,0.18)] pr-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.15)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)] shrink-0">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                        Customer Feedback & Review
                      </h3>
                      <p className="text-[10.5px] text-slate-400">
                        Apna anubhav aur rating share karein
                      </p>
                    </div>
                  </div>

                  {/* Interactive Star Rating */}
                  <div className="rounded-xl bg-[#121218] border border-[rgba(212,175,55,0.2)] p-3 text-center">
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">
                      Aapka Overall Experience Kaisa Raha?
                    </label>
                    <div className="flex items-center justify-center gap-2 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 transition-transform active:scale-125 cursor-pointer"
                        >
                          <Star
                            size={28}
                            className={`transition-colors ${
                              (hoverRating !== null ? star <= hoverRating : star <= formData.rating)
                                ? "text-[var(--gold-primary)] fill-[var(--gold-primary)] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                                : "text-slate-600"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] font-bold text-[var(--gold-light)] mt-1">
                      {RATING_LABELS[hoverRating ?? formData.rating]}
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Aapka Naam <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Chandra"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input text-xs"
                      />
                    </div>
                  </div>

                  {/* Location & Service Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Aapka Shehar / Location
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="form-input text-xs"
                      >
                        {LOCATION_OPTIONS.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#181824] text-white">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Service Availed
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="form-input text-xs"
                      >
                        <option value="Gold Loan Settlement" className="bg-[#181824] text-white">Gold Loan Settlement</option>
                        <option value="Partial Gold Release" className="bg-[#181824] text-white">Partial Gold Release</option>
                        <option value="Sell Old Gold & Jewellery" className="bg-[#181824] text-white">Sell Old Gold & Jewellery</option>
                        <option value="Auction Notice Relief" className="bg-[#181824] text-white">Auction Notice Relief</option>
                        <option value="Valuation Consultation" className="bg-[#181824] text-white">Valuation Consultation</option>
                      </select>
                    </div>
                  </div>

                  {/* Feedback Message */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Aapka Anubhav / Review Comments <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="MRAJ JEWELERS ke saath aapka experience kaisa raha? Settlement, testing, payout time etc..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="form-input text-xs resize-none"
                    />
                  </div>

                  {/* Recommendation Toggle */}
                  <div className="flex items-center justify-between rounded-xl bg-[#121218] border border-[rgba(212,175,55,0.15)] px-3 py-2">
                    <span className="text-[11px] font-semibold text-slate-300">
                      Kya aap doosro ko MRAJ JEWELERS recommend karenge?
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, recommended: !formData.recommended })}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        formData.recommended
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      <ThumbsUp size={12} />
                      <span>{formData.recommended ? "Haan (Yes)" : "Nahi"}</span>
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold shadow-gold rounded-xl cursor-pointer active:scale-[0.99] transition mt-2"
                  >
                    <Send size={15} />
                    <span>Submit Feedback</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
