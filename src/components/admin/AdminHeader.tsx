import React from "react";
import {
  BarChart3,
  ExternalLink,
  Globe,
  LogOut,
  MapPin,
  MessageSquare,
  Phone,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import logoMrajWordmark from "../../assets/mraj-wordmark.png";
import { AdminTabType, GoldRatesConfig } from "../../types/admin";
import { GeoLocationInfo } from "../../analytics";

interface AdminHeaderProps {
  activeTab: AdminTabType;
  setActiveTab: (tab: AdminTabType) => void;
  onClose: () => void;
  onLogout: () => void;
  rates: GoldRatesConfig;
  leadsCount: number;
  newLeadsCount: number;
  feedbacksCount: number;
  currentGeo: GeoLocationInfo;
  phone: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  setActiveTab,
  onClose,
  onLogout,
  rates,
  leadsCount,
  newLeadsCount,
  feedbacksCount,
  currentGeo,
  phone,
}) => {
  return (
    <>
      {/* Top Navbar */}
      <header className="border-b border-[rgba(212,175,55,0.25)] bg-[#121218] px-3 sm:px-6 py-2.5 sm:py-3 shrink-0 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5">
          {/* Brand & Portal Status */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img src={logoMrajWordmark} alt="MRAJ" className="h-4.5 sm:h-5 w-auto object-contain drop-shadow" />
            <span className="brand-jewelers-text text-xs sm:text-sm font-bold tracking-wider shrink-0">
              JEWELERS
            </span>
            <span className="rounded-lg bg-[rgba(212,175,55,0.18)] border border-[rgba(212,175,55,0.35)] px-2 sm:px-2.5 py-0.5 text-[10.5px] sm:text-[11px] font-extrabold text-[var(--gold-light)] shrink-0">
              Admin Portal
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-400 shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Tracker Active
            </span>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-xl border border-[rgba(212,175,55,0.35)] bg-white/5 hover:bg-[rgba(212,175,55,0.15)] px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-[var(--gold-light)] transition cursor-pointer shadow-xs"
              title="Public Website Dekhein"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">View Website</span>
              <span className="sm:hidden text-[11px]">Website</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 rounded-xl bg-rose-950/50 border border-rose-500/40 hover:bg-rose-900/60 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-rose-200 transition cursor-pointer shadow-xs"
              title="Logout"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Main Navigation & Stats Bar */}
      <div className="bg-[#14141e] border-b border-[rgba(212,175,55,0.22)] px-3 sm:px-6 py-2 sm:py-2.5 shrink-0 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
          {/* 5 Main Tabs */}
          <nav
            aria-label="Admin Navigation"
            className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5 w-full lg:w-auto lg:min-w-[860px]"
          >
            {/* Tab 1: Analytics & IP */}
            <button
              type="button"
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center justify-between gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-150 cursor-pointer ${
                activeTab === "analytics"
                  ? "admin-tab-active font-black scale-[1.01]"
                  : "admin-tab-inactive font-bold"
              }`}
            >
              <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                <BarChart3 size={15} className={activeTab === "analytics" ? "text-black shrink-0" : "text-[var(--gold-primary)] shrink-0"} />
                <span className={`truncate ${activeTab === "analytics" ? "text-black font-black" : "text-slate-200"}`}>
                  Analytics & IP
                </span>
              </span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-black uppercase shrink-0 ${
                  activeTab === "analytics"
                    ? "bg-black/90 text-cyan-300 border border-black/40 shadow-xs"
                    : "bg-cyan-950/80 text-cyan-300 border border-cyan-500/30"
                }`}
              >
                Live
              </span>
            </button>

            {/* Tab 2: Gold Rates */}
            <button
              type="button"
              onClick={() => setActiveTab("rates")}
              className={`flex items-center justify-between gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-150 cursor-pointer ${
                activeTab === "rates"
                  ? "admin-tab-active font-black scale-[1.01]"
                  : "admin-tab-inactive font-bold"
              }`}
            >
              <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                <TrendingUp size={15} className={activeTab === "rates" ? "text-black shrink-0" : "text-amber-400 shrink-0"} />
                <span className={`truncate ${activeTab === "rates" ? "text-black font-black" : "text-slate-200"}`}>
                  Gold Rates
                </span>
              </span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-extrabold shrink-0 ${
                  activeTab === "rates"
                    ? "bg-black/90 text-amber-300 border border-black/40 shadow-xs"
                    : "bg-amber-950/80 text-amber-300 border border-amber-500/30"
                }`}
              >
                ₹{rates["22K"].toLocaleString("en-IN")}
              </span>
            </button>

            {/* Tab 3: Customer Leads */}
            <button
              type="button"
              onClick={() => setActiveTab("leads")}
              className={`flex items-center justify-between gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-150 cursor-pointer relative ${
                activeTab === "leads"
                  ? "admin-tab-active font-black scale-[1.01]"
                  : "admin-tab-inactive font-bold"
              }`}
            >
              <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                <Users size={15} className={activeTab === "leads" ? "text-black shrink-0" : "text-emerald-400 shrink-0"} />
                <span className={`truncate ${activeTab === "leads" ? "text-black font-black" : "text-slate-200"}`}>
                  Leads
                </span>
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-black shrink-0 ${
                  activeTab === "leads"
                    ? "bg-black text-[var(--gold-light)] border border-black/40 shadow-xs"
                    : "bg-emerald-500 text-black"
                }`}
              >
                {leadsCount}
              </span>
              {newLeadsCount > 0 && activeTab !== "leads" && (
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shrink-0 animate-ping absolute -top-1 -right-1" />
              )}
            </button>

            {/* Tab 4: Customer Feedback */}
            <button
              type="button"
              onClick={() => setActiveTab("feedback")}
              className={`flex items-center justify-between gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-150 cursor-pointer ${
                activeTab === "feedback"
                  ? "admin-tab-active font-black scale-[1.01]"
                  : "admin-tab-inactive font-bold"
              }`}
            >
              <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                <MessageSquare size={15} className={activeTab === "feedback" ? "text-black shrink-0" : "text-[var(--gold-primary)] shrink-0"} />
                <span className={`truncate ${activeTab === "feedback" ? "text-black font-black" : "text-slate-200"}`}>
                  Feedback
                </span>
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-black shrink-0 ${
                  activeTab === "feedback"
                    ? "bg-black text-[var(--gold-light)] border border-black/40 shadow-xs"
                    : "bg-[var(--gold-primary)] text-black"
                }`}
              >
                {feedbacksCount}
              </span>
            </button>

            {/* Tab 5: Settings */}
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`flex items-center justify-between gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-150 cursor-pointer ${
                activeTab === "settings"
                  ? "admin-tab-active font-black scale-[1.01]"
                  : "admin-tab-inactive font-bold"
              }`}
            >
              <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                <Settings size={15} className={activeTab === "settings" ? "text-black shrink-0" : "text-slate-400 shrink-0"} />
                <span className={`truncate ${activeTab === "settings" ? "text-black font-black" : "text-slate-200"}`}>
                  Settings
                </span>
              </span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-semibold shrink-0 ${
                  activeTab === "settings"
                    ? "bg-black/90 text-white border border-black/40 shadow-xs"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                Config
              </span>
            </button>
          </nav>

          {/* Right Side: Live IP & Geolocation Tracker Badge + Quick Helpline */}
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs pt-1.5 lg:pt-0 border-t lg:border-t-0 border-white/5 shrink-0">
            {/* Live IP & Location Tracker Pill (Visible on ALL devices) */}
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-[#0a0a0e] border border-[rgba(212,175,55,0.3)] px-3 py-1.5 text-xs shadow-inner">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="flex items-center gap-1 text-[var(--gold-light)] font-bold">
                <MapPin size={13} className="text-[var(--gold-primary)] shrink-0" />
                <span className="truncate max-w-[120px] sm:max-w-[170px]">{currentGeo.location}</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="hidden sm:flex items-center gap-1 text-cyan-300 font-mono text-[11px]">
                <Globe size={12} className="text-cyan-400 shrink-0" />
                IP: {currentGeo.ip}
              </span>
            </div>

            {/* Quick Helpline */}
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              className="hidden sm:flex items-center gap-1.5 bg-[#0a0a0e] hover:bg-[#151522] px-2.5 py-1.5 rounded-xl border border-[rgba(212,175,55,0.2)] text-slate-300 transition cursor-pointer"
              title="Call Helpline"
            >
              <Phone size={12} className="text-amber-400 shrink-0" />
              <span className="text-slate-400 text-[11px]">Help:</span>
              <strong className="text-slate-200 text-[11px]">{phone}</strong>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
