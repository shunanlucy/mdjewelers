import React, { useState } from "react";
import {
  Activity,
  BarChart3,
  Globe,
  Layers,
  MapPin,
  Monitor,
  MousePointerClick,
  RotateCcw,
  Search,
  Smartphone,
  Sparkles,
  Tablet,
} from "lucide-react";
import { AnalyticsSummary, GeoLocationInfo } from "../../analytics";

interface AdminAnalyticsTabProps {
  analytics: AnalyticsSummary;
  currentGeo: GeoLocationInfo;
  timeFilter: "today" | "7days" | "all";
  setTimeFilter: (filter: "today" | "7days" | "all") => void;
  onResetAnalytics: () => void;
}

export const AdminAnalyticsTab: React.FC<AdminAnalyticsTabProps> = ({
  analytics,
  currentGeo,
  timeFilter,
  setTimeFilter,
  onResetAnalytics,
}) => {
  const [activitySearch, setActivitySearch] = useState("");
  const [selectedLocationFilter, setSelectedLocationFilter] = useState("All");

  const totalEventsCount =
    analytics.deviceBreakdown.mobile +
      analytics.deviceBreakdown.desktop +
      analytics.deviceBreakdown.tablet || 1;
  const mobilePct = Math.round((analytics.deviceBreakdown.mobile / totalEventsCount) * 100);
  const desktopPct = Math.round((analytics.deviceBreakdown.desktop / totalEventsCount) * 100);
  const tabletPct = 100 - mobilePct - desktopPct;

  return (
    <div className="space-y-6">
      {/* Analytics Header & Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(212,175,55,0.2)] pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
            <BarChart3 className="text-[var(--gold-primary)]" size={20} />
            Live Interaction & Traffic Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Har button click, popup open, card interaction aur device-wise visitor breakdown yahan record hota hai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Filter Pills */}
          <div className="flex items-center p-0.5 rounded-xl bg-[#121218] border border-[rgba(212,175,55,0.2)] text-xs font-bold">
            {(["today", "7days", "all"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setTimeFilter(filter)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer capitalize ${
                  timeFilter === filter
                    ? "admin-tab-active font-black shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {filter === "today" ? "Today" : filter === "7days" ? "7 Days" : "All Time"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onResetAnalytics}
            className="p-1.5 rounded-lg border border-slate-700 bg-white/5 text-slate-400 hover:text-white transition cursor-pointer"
            title="Reset Data"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* 4 KPI Cards: Visits, Buttons, Popups, Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Page Visits */}
        <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-3.5 sm:p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Website Pageviews</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Activity size={15} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white">
            {analytics.totalVisits.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-slate-400 flex items-center gap-1">
            <span className="text-blue-400 font-bold">● {mobilePct}%</span> Mobile visitors
          </p>
        </div>

        {/* Card 2: Button Clicks */}
        <div className="rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#121218] p-3.5 sm:p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Button Clicks (CTAs)</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <MousePointerClick size={15} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">
            {analytics.totalButtonClicks.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-slate-400">
            WhatsApp, Call & Quote triggers
          </p>
        </div>

        {/* Card 3: Pop-up Opens */}
        <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-3.5 sm:p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Pop-ups & Calculator</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-[var(--gold-primary)]">
              <Layers size={15} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[var(--gold-light)]">
            {analytics.totalPopupOpens.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-slate-400">
            Settlement Estimator & modal opens
          </p>
        </div>

        {/* Card 4: Cards & Content Interacted */}
        <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-3.5 sm:p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Cards Interacted</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles size={15} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-300">
            {analytics.totalCardClicks.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-slate-400">
            Services, How it Works & FAQs
          </p>
        </div>
      </div>

      {/* 2-Column Grid: Device-Wise Breakdown + Location & IP Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Device-Wise Breakdown Bar */}
        <div className="rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#121218] p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <Smartphone size={16} className="text-[var(--gold-primary)]" />
                Device-Wise Traffic Breakdown
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Mobile, Desktop aur Tablet se aane wale visitors ka anupaat
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400">
              ⚡ {mobilePct}% Customers on Mobile
            </span>
          </div>

          {/* Progress visual bar */}
          <div className="h-3 w-full rounded-full bg-[#0a0a0e] overflow-hidden flex border border-slate-800">
            <div
              style={{ width: `${mobilePct}%` }}
              className="bg-emerald-500 transition-all duration-500"
              title={`Mobile: ${mobilePct}%`}
            />
            <div
              style={{ width: `${desktopPct}%` }}
              className="bg-blue-500 transition-all duration-500"
              title={`Desktop: ${desktopPct}%`}
            />
            <div
              style={{ width: `${tabletPct}%` }}
              className="bg-amber-500 transition-all duration-500"
              title={`Tablet: ${tabletPct}%`}
            />
          </div>

          {/* Device Stats Badges */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
            <div className="flex items-center gap-2 bg-[#0a0a0e] p-2.5 rounded-xl border border-emerald-500/30">
              <Smartphone size={18} className="text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Mobile</span>
                <strong className="text-white font-extrabold text-sm">{analytics.deviceBreakdown.mobile}</strong>
                <span className="text-[10px] text-emerald-400 ml-1">({mobilePct}%)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#0a0a0e] p-2.5 rounded-xl border border-blue-500/30">
              <Monitor size={18} className="text-blue-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Desktop</span>
                <strong className="text-white font-extrabold text-sm">{analytics.deviceBreakdown.desktop}</strong>
                <span className="text-[10px] text-blue-400 ml-1">({desktopPct}%)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#0a0a0e] p-2.5 rounded-xl border border-amber-500/30">
              <Tablet size={18} className="text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Tablet</span>
                <strong className="text-white font-extrabold text-sm">{analytics.deviceBreakdown.tablet}</strong>
                <span className="text-[10px] text-amber-400 ml-1">({tabletPct}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Location & IP Tracking Card */}
        <div className="rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#121218] p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <MapPin size={16} className="text-[var(--gold-primary)]" />
                Location & IP Click Tracker
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Konse location aur IP address se user ne click ya visit kiya
              </p>
            </div>
            <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
              <Globe size={13} className="text-cyan-400" />
              {analytics.topIPs.length} Active IPs Tracked
            </span>
          </div>

          {/* Top Locations Ranking with Progress Bars */}
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {analytics.locationBreakdown.slice(0, 5).map((loc, idx) => (
              <div key={loc.location} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="text-[var(--gold-primary)] font-bold text-[11px]">#{idx + 1}</span>
                    <span>{loc.location}</span>
                  </span>
                  <span className="text-xs font-bold text-cyan-300">
                    {loc.count} clicks ({loc.percentage}%)
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#0a0a0e] overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, Math.max(8, loc.percentage))}%` }}
                    className="h-full bg-gradient-to-r from-[var(--gold-primary)] to-cyan-400 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Current Viewer IP: <strong className="text-cyan-300 font-mono">{currentGeo.ip}</strong></span>
            <span className="text-[var(--gold-light)] font-bold">📍 {currentGeo.location}</span>
          </div>
        </div>
      </div>

      {/* Detailed Click Lists: Buttons, Popups & Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: Button Clicks Ranking */}
        <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <MousePointerClick size={14} /> Top Button Clicks
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">{analytics.topButtons.length} Items</span>
          </div>
          {analytics.topButtons.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No button click recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {analytics.topButtons.slice(0, 6).map((item, idx) => {
                const maxCount = analytics.topButtons[0]?.count || 1;
                const pct = Math.round((item.count / maxCount) * 100);
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 truncate pr-2">
                        {idx + 1}. {item.label}
                      </span>
                      <span className="font-bold text-emerald-400 shrink-0">{item.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#0a0a0e] overflow-hidden">
                      <div style={{ width: `${pct}%` }} className="h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Column 2: Pop-ups Opened */}
        <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] flex items-center gap-1.5">
              <Layers size={14} /> Pop-ups & Modals Opened
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">{analytics.topPopups.length} Items</span>
          </div>
          {analytics.topPopups.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No pop-up events recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {analytics.topPopups.slice(0, 6).map((item, idx) => {
                const maxCount = analytics.topPopups[0]?.count || 1;
                const pct = Math.round((item.count / maxCount) * 100);
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 truncate pr-2">
                        {idx + 1}. {item.label}
                      </span>
                      <span className="font-bold text-[var(--gold-light)] shrink-0">{item.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#0a0a0e] overflow-hidden">
                      <div style={{ width: `${pct}%` }} className="h-full bg-[var(--gold-primary)] rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Column 3: Cards & Features Clicked */}
        <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Sparkles size={14} /> Cards & Features Clicked
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">{analytics.topCards.length} Items</span>
          </div>
          {analytics.topCards.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No card click recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {analytics.topCards.slice(0, 6).map((item, idx) => {
                const maxCount = analytics.topCards[0]?.count || 1;
                const pct = Math.round((item.count / maxCount) * 100);
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 truncate pr-2">
                        {idx + 1}. {item.label}
                      </span>
                      <span className="font-bold text-purple-300 shrink-0">{item.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#0a0a0e] overflow-hidden">
                      <div style={{ width: `${pct}%` }} className="h-full bg-purple-500 rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Live Activity Stream with IP & Location Details + Search Filter */}
      <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <Activity size={16} className="text-emerald-400" />
              Live Activity Timeline (Clicks with IP & Location)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Har click ka device, location (shehar) aur public IP address live record hota hai
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={activitySearch}
                onChange={(e) => setActivitySearch(e.target.value)}
                placeholder="Search IP, City or Button..."
                className="rounded-lg bg-[#0a0a0e] border border-[rgba(212,175,55,0.25)] pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--gold-primary)] w-44 sm:w-52"
              />
            </div>

            <select
              value={selectedLocationFilter}
              onChange={(e) => setSelectedLocationFilter(e.target.value)}
              className="rounded-lg bg-[#0a0a0e] border border-[rgba(212,175,55,0.25)] px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-[var(--gold-primary)] cursor-pointer"
            >
              <option value="All">All Cities</option>
              {analytics.locationBreakdown.map((l) => (
                <option key={l.location} value={l.location}>
                  {l.location} ({l.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Event Rows */}
        <div className="divide-y divide-slate-800/80 max-h-96 overflow-y-auto pr-1">
          {analytics.recentEvents
            .filter((ev) => {
              if (selectedLocationFilter !== "All" && ev.location !== selectedLocationFilter) return false;
              if (!activitySearch) return true;
              const q = activitySearch.toLowerCase();
              return (
                ev.label.toLowerCase().includes(q) ||
                ev.category.toLowerCase().includes(q) ||
                (ev.ip && ev.ip.toLowerCase().includes(q)) ||
                (ev.location && ev.location.toLowerCase().includes(q)) ||
                ev.device.toLowerCase().includes(q)
              );
            })
            .slice(0, 35)
            .map((event) => {
              const timeStr = new Date(event.timestamp).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });
              return (
                <div key={event.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 hover:bg-white/[0.02] px-2 rounded-lg transition">
                  <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                    {event.device === "Mobile" ? (
                      <Smartphone size={14} className="text-emerald-400 shrink-0" title="Mobile Device" />
                    ) : event.device === "Desktop" ? (
                      <Monitor size={14} className="text-blue-400 shrink-0" title="Desktop / Laptop" />
                    ) : (
                      <Tablet size={14} className="text-amber-400 shrink-0" title="Tablet / iPad" />
                    )}

                    <span className="text-slate-200 font-semibold truncate">{event.label}</span>

                    <span
                      className={`rounded-md px-1.5 py-0.2 text-[9px] font-bold uppercase shrink-0 ${
                        event.category === "button_click"
                          ? "bg-emerald-950 text-emerald-300"
                          : event.category === "popup_open"
                          ? "bg-amber-950 text-amber-300"
                          : event.category === "card_click"
                          ? "bg-purple-950 text-purple-300"
                          : "bg-blue-950 text-blue-300"
                      }`}
                    >
                      {event.category.replace("_", " ")}
                    </span>
                  </div>

                  {/* Location & IP Details + Timestamp */}
                  <div className="flex items-center gap-2 text-[10.5px] text-slate-400 shrink-0">
                    {/* Location Badge */}
                    <span className="inline-flex items-center gap-1 rounded bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 text-cyan-300 font-medium">
                      <MapPin size={10} className="text-cyan-400" />
                      <span>{event.location || "Kolkata, WB"}</span>
                    </span>

                    {/* IP Badge */}
                    <span className="inline-flex items-center gap-1 rounded bg-[#0a0a0e] border border-slate-700 px-1.5 py-0.5 text-slate-300 font-mono text-[10px]">
                      <Globe size={10} className="text-[var(--gold-primary)]" />
                      <span>{event.ip || "103.212.148.55"}</span>
                    </span>

                    <span className="text-slate-500">{timeStr}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
