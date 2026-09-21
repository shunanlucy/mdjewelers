import React, { useState } from "react";
import {
  Heart,
  MapPin,
  MessageSquare,
  Search,
  Star,
  ThumbsUp,
  Trash2,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { CustomerFeedback } from "../../types/admin";

interface AdminFeedbackTabProps {
  feedbacks: CustomerFeedback[];
  onUpdateFeedbacks: (updated: CustomerFeedback[]) => void;
  showToast: (msg: string) => void;
}

export const AdminFeedbackTab: React.FC<AdminFeedbackTabProps> = ({
  feedbacks,
  onUpdateFeedbacks,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");

  const totalReviews = feedbacks.length;
  const averageRating = totalReviews
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalReviews).toFixed(1)
    : "0.0";
  const fiveStarCount = feedbacks.filter((f) => f.rating === 5).length;
  const fiveStarPct = totalReviews ? Math.round((fiveStarCount / totalReviews) * 100) : 0;

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Kya aap "${name}" ka feedback delete karna chahte hain?`)) {
      const updated = feedbacks.filter((f) => f.id !== id);
      onUpdateFeedbacks(updated);
      showToast(`Feedback from "${name}" deleted.`);
    }
  };

  // Filtered feedbacks
  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (ratingFilter !== "all" && fb.rating !== Number(ratingFilter)) return false;
    if (locationFilter !== "all" && fb.location !== locationFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      fb.name.toLowerCase().includes(q) ||
      fb.comment.toLowerCase().includes(q) ||
      (fb.phone && fb.phone.includes(q)) ||
      fb.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#121218] p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Average Rating
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[var(--gold-light)] flex items-center gap-1.5 mt-1">
              <span>{averageRating}</span>
              <Star size={20} className="fill-[var(--gold-primary)] text-[var(--gold-primary)]" />
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.12)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.25)]">
            <Heart size={20} />
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#121218] p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Customer Reviews
            </p>
            <p className="text-2xl sm:text-3xl font-black text-white mt-1">
              {totalReviews}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
            <MessageSquare size={20} />
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#121218] p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              5-Star Satisfaction Rate
            </p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
              {fiveStarPct}%
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950/60 text-amber-400 border border-amber-500/30">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-[#121218] p-3 rounded-2xl border border-[rgba(212,175,55,0.18)]">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search reviews by customer name, phone, comment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181824] border border-[rgba(212,175,55,0.2)] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--gold-primary)]"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Rating Filter */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="bg-[#181824] border border-[rgba(212,175,55,0.2)] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="all">All Ratings (★)</option>
            <option value="5">5 Stars Only</option>
            <option value="4">4 Stars Only</option>
            <option value="3">3 Stars Only</option>
            <option value="2">2 Stars Only</option>
            <option value="1">1 Star Only</option>
          </select>

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-[#181824] border border-[rgba(212,175,55,0.2)] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="all">All Locations</option>
            <option value="Kalyani">Kalyani</option>
            <option value="Bidhannagar">Bidhannagar</option>
            <option value="Newtown">Newtown</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredFeedbacks.length === 0 ? (
          <div className="rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[#121218] p-8 text-center text-slate-400 text-xs">
            Koi review match nahi hua.
          </div>
        ) : (
          filteredFeedbacks.map((fb) => (
            <div
              key={fb.id}
              className="rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[#121218] p-4 sm:p-5 hover:border-[var(--gold-primary)] transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[rgba(212,175,55,0.1)]">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-bold text-sm text-white flex items-center gap-1.5">
                    {fb.name}
                    <UserCheck size={14} className="text-emerald-400" />
                  </span>
                  {fb.phone && (
                    <span className="text-xs text-slate-400 font-mono">({fb.phone})</span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-md bg-[rgba(212,175,55,0.12)] px-2 py-0.5 text-[10.5px] font-bold text-[var(--gold-light)] border border-[rgba(212,175,55,0.25)]">
                    <MapPin size={11} /> {fb.location}
                  </span>
                  <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                    {fb.serviceType}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-[var(--gold-primary)]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        className={
                          star <= fb.rating
                            ? "fill-[var(--gold-primary)]"
                            : "text-slate-600"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(fb.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() => handleDelete(fb.id, fb.name)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-500/30 transition cursor-pointer ml-1"
                    title="Delete Feedback"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                “{fb.comment}”
              </p>

              {fb.recommended && (
                <div className="mt-2.5 flex items-center gap-1 text-[10.5px] text-emerald-400 font-semibold">
                  <ThumbsUp size={12} />
                  <span>Customer recommends MRAJ JEWELERS</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
