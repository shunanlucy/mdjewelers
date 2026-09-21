import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  AdminSettings,
  AdminTabType,
  CustomerFeedback,
  CustomerLead,
  GoldRatesConfig,
} from "./types/admin";
import {
  DEFAULT_RATES,
  DEFAULT_SETTINGS,
  SAMPLE_FEEDBACKS,
  SAMPLE_LEADS,
} from "./constants/adminDefaults";
import {
  computeAnalytics,
  getCachedGeo,
  getStoredEvents,
} from "./analytics";

import { AdminHeader } from "./components/admin/AdminHeader";
import { AdminLoginModal } from "./components/admin/AdminLoginModal";
import { AdminAnalyticsTab } from "./components/admin/AdminAnalyticsTab";
import { AdminRatesTab } from "./components/admin/AdminRatesTab";
import { AdminLeadsTab } from "./components/admin/AdminLeadsTab";
import { AdminFeedbackTab } from "./components/admin/AdminFeedbackTab";
import { AdminSettingsTab } from "./components/admin/AdminSettingsTab";

// Re-export types for backward compatibility
export type { GoldRatesConfig, CustomerLead, CustomerFeedback, AdminSettings };

interface AdminPanelProps {
  onClose: () => void;
  rates: GoldRatesConfig;
  onUpdateRates: (newRates: GoldRatesConfig) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onClose,
  rates,
  onUpdateRates,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("mraj_admin_auth") === "true";
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTabType>("analytics");

  // Settings State
  const [settings, setSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem("mraj_admin_settings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // Leads State
  const [leads, setLeads] = useState<CustomerLead[]>(() => {
    const saved = localStorage.getItem("mraj_customer_leads");
    return saved ? JSON.parse(saved) : SAMPLE_LEADS;
  });

  // Customer Feedbacks State
  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>(() => {
    const saved = localStorage.getItem("mraj_customer_feedbacks");
    return saved ? JSON.parse(saved) : SAMPLE_FEEDBACKS;
  });

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Analytics Events
  const [events, setEvents] = useState(getStoredEvents());
  const [analyticsTimeFilter, setAnalyticsTimeFilter] = useState<"today" | "7days" | "all">("all");

  const currentGeo = getCachedGeo();

  useEffect(() => {
    setEvents(getStoredEvents());
    // Also re-read feedbacks if tab changes
    try {
      const saved = localStorage.getItem("mraj_customer_feedbacks");
      if (saved) setFeedbacks(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, [activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("mraj_admin_auth");
  };

  // Rates Handlers
  const handleSaveRates = (newRates: GoldRatesConfig) => {
    onUpdateRates(newRates);
    localStorage.setItem("mraj_gold_rates", JSON.stringify(newRates));
    showToast("Live Gold & Silver Rates successfully updated!");
  };

  const handleResetRates = () => {
    onUpdateRates(DEFAULT_RATES);
    localStorage.setItem("mraj_gold_rates", JSON.stringify(DEFAULT_RATES));
    showToast("Rates reset to default market benchmarks.");
  };

  // Settings Handlers
  const handleSaveSettings = (newSettings: AdminSettings) => {
    setSettings(newSettings);
    localStorage.setItem("mraj_admin_settings", JSON.stringify(newSettings));
    showToast("Business contact settings saved successfully!");
  };

  // Leads Handlers
  const handleUpdateLeads = (newLeads: CustomerLead[]) => {
    setLeads(newLeads);
    localStorage.setItem("mraj_customer_leads", JSON.stringify(newLeads));
  };

  // Feedback Handlers
  const handleUpdateFeedbacks = (updated: CustomerFeedback[]) => {
    setFeedbacks(updated);
    localStorage.setItem("mraj_customer_feedbacks", JSON.stringify(updated));
  };

  // Analytics Handlers
  const handleResetAnalytics = () => {
    if (confirm("Kya aap analytics history reset karna chahte hain?")) {
      localStorage.removeItem("mraj_analytics_events");
      setEvents(getStoredEvents());
      showToast("Analytics data refreshed.");
    }
  };

  const analytics = computeAnalytics(events, analyticsTimeFilter);
  const newLeadsCount = leads.filter((l) => l.status === "New").length;

  // Not logged in -> Show Login Modal
  if (!isAuthenticated) {
    return (
      <AdminLoginModal
        onClose={onClose}
        onSuccess={() => setIsAuthenticated(true)}
        expectedPin={settings.adminPin}
        showToast={showToast}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[999] flex flex-col bg-[#0a0a0e] text-slate-100 font-sans overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-[1050] flex items-center gap-2 rounded-xl bg-emerald-950/95 border border-emerald-500/50 px-4 py-3 text-emerald-300 shadow-2xl backdrop-blur-md text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & 5-Tab Navigation */}
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={onClose}
        onLogout={handleLogout}
        rates={rates}
        leadsCount={leads.length}
        newLeadsCount={newLeadsCount}
        feedbacksCount={feedbacks.length}
        currentGeo={currentGeo}
        phone={settings.phone}
      />

      {/* Main Tab Content */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeTab === "analytics" && (
          <AdminAnalyticsTab
            analytics={analytics}
            currentGeo={currentGeo}
            timeFilter={analyticsTimeFilter}
            setTimeFilter={setAnalyticsTimeFilter}
            onResetAnalytics={handleResetAnalytics}
          />
        )}

        {activeTab === "rates" && (
          <AdminRatesTab
            rates={rates}
            onSaveRates={handleSaveRates}
            onResetRates={handleResetRates}
          />
        )}

        {activeTab === "leads" && (
          <AdminLeadsTab
            leads={leads}
            onUpdateLeads={handleUpdateLeads}
            showToast={showToast}
          />
        )}

        {activeTab === "feedback" && (
          <AdminFeedbackTab
            feedbacks={feedbacks}
            onUpdateFeedbacks={handleUpdateFeedbacks}
            showToast={showToast}
          />
        )}

        {activeTab === "settings" && (
          <AdminSettingsTab
            settings={settings}
            onSaveSettings={handleSaveSettings}
          />
        )}
      </main>
    </div>
  );
};
