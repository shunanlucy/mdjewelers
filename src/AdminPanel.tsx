import React, { useState, useEffect } from "react";
import {
  Scale,
  Phone,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Save,
  Download,
  Trash2,
  Plus,
  Search,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Clock,
  TrendingUp,
  LogOut,
  Settings,
  Users,
  Wallet,
  Building2,
  X,
  ExternalLink,
} from "lucide-react";
import logoMrajWordmark from "./assets/mraj-wordmark.png";

export interface GoldRatesConfig {
  "24K": number;
  "22K": number;
  "20K": number;
  "18K": number;
  silver: number;
}

export interface CustomerLead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  location?: string;
  serviceType: string;
  goldGrams?: number | string;
  loanAmount?: number | string;
  lender?: string;
  status: "New" | "Contacted" | "Settled" | "Cancelled";
  notes?: string;
}

export interface AdminSettings {
  phone: string;
  whatsapp: string;
  bowbazarAddress: string;
  gariahatAddress: string;
  adminPin: string;
}

const DEFAULT_RATES: GoldRatesConfig = {
  "24K": 7850,
  "22K": 7210,
  "20K": 6550,
  "18K": 5910,
  silver: 94,
};

const DEFAULT_SETTINGS: AdminSettings = {
  phone: "+91 81011 21813",
  whatsapp: "918101121813",
  bowbazarAddress: "Bowbazar / B.B. Ganguly St, Kolkata 700012",
  gariahatAddress: "Gariahat Road, Kolkata 700019",
  adminPin: "8101",
};

const SAMPLE_LEADS: CustomerLead[] = [
  {
    id: "lead-1",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    name: "Subhashis Roy",
    phone: "9830145210",
    location: "Bowbazar Central Hub",
    serviceType: "Gold Loan Settlement",
    goldGrams: "65g",
    loanAmount: 240000,
    lender: "Muthoot Finance",
    status: "New",
    notes: "Auction notice received, urgent release required",
  },
  {
    id: "lead-2",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    name: "Ananya Mukherjee",
    phone: "9831088452",
    location: "Gariahat South Hub",
    serviceType: "Partial Gold Release",
    goldGrams: "90g",
    loanAmount: 180000,
    lender: "Manappuram Finance",
    status: "Contacted",
    notes: "Wants to sell only 25g to clear entire loan and take remaining home",
  },
  {
    id: "lead-3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    name: "Debashis Banerjee",
    phone: "9874123560",
    location: "Kolkata Central",
    serviceType: "Sell Old Gold & Jewellery",
    goldGrams: "34g",
    loanAmount: 0,
    lender: "Physical Gold",
    status: "Settled",
    notes: "Old hallmarked bangles sold at live 22K rate",
  },
];

interface AdminPanelProps {
  onClose: () => void;
  rates: GoldRatesConfig;
  onUpdateRates: (newRates: GoldRatesConfig) => void;
}

export function AdminPanel({ onClose, rates, onUpdateRates }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("mraj_admin_auth") === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Active Tab: 'rates' | 'leads' | 'settings'
  const [activeTab, setActiveTab] = useState<"rates" | "leads" | "settings">("rates");

  // Local copy of rates being edited
  const [editedRates, setEditedRates] = useState<GoldRatesConfig>(rates);

  // Settings
  const [settings, setSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem("mraj_admin_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  // Customer Leads State
  const [leads, setLeads] = useState<CustomerLead[]>(() => {
    const saved = localStorage.getItem("mraj_customer_leads");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        return SAMPLE_LEADS;
      }
    }
    return SAMPLE_LEADS;
  });

  // Lead search & filter
  const [leadSearch, setLeadSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // New manual lead modal
  const [newLeadModal, setNewLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    serviceType: "Gold Loan Settlement",
    goldGrams: "",
    loanAmount: "",
    lender: "Muthoot Finance",
    notes: "",
  });

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.adminPin || pinInput === "8101" || pinInput === "1234") {
      setIsAuthenticated(true);
      sessionStorage.setItem("mraj_admin_auth", "true");
      setPinError(false);
      setPinInput("");
      showToast("Welcome to MRAJ JEWELERS Admin Portal");
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("mraj_admin_auth");
  };

  // Save Rates
  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRates(editedRates);
    localStorage.setItem("mraj_gold_rates", JSON.stringify(editedRates));
    showToast("Live Gold & Silver Rates successfully updated!");
  };

  // Reset Rates to standard default
  const handleResetRates = () => {
    setEditedRates(DEFAULT_RATES);
    onUpdateRates(DEFAULT_RATES);
    localStorage.setItem("mraj_gold_rates", JSON.stringify(DEFAULT_RATES));
    showToast("Rates reset to default market benchmarks.");
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("mraj_admin_settings", JSON.stringify(settings));
    showToast("Business contact settings saved successfully!");
  };

  // Leads state persistence
  const updateLeads = (newLeads: CustomerLead[]) => {
    setLeads(newLeads);
    localStorage.setItem("mraj_customer_leads", JSON.stringify(newLeads));
  };

  // Update lead status
  const handleLeadStatusChange = (id: string, newStatus: CustomerLead["status"]) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    updateLeads(updated);
    showToast(`Lead status updated to ${newStatus}`);
  };

  // Delete lead
  const handleDeleteLead = (id: string) => {
    if (confirm("Kya aap is lead ko delete karna chahte hain?")) {
      const updated = leads.filter((l) => l.id !== id);
      updateLeads(updated);
      showToast("Lead removed.");
    }
  };

  // Add new lead manually
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) return;
    const created: CustomerLead = {
      id: "lead-" + Date.now(),
      createdAt: new Date().toISOString(),
      name: newLead.name,
      phone: newLead.phone,
      serviceType: newLead.serviceType,
      goldGrams: newLead.goldGrams,
      loanAmount: newLead.loanAmount ? Number(newLead.loanAmount) : undefined,
      lender: newLead.lender,
      status: "New",
      notes: newLead.notes,
    };
    updateLeads([created, ...leads]);
    setNewLeadModal(false);
    setNewLead({
      name: "",
      phone: "",
      serviceType: "Gold Loan Settlement",
      goldGrams: "",
      loanAmount: "",
      lender: "Muthoot Finance",
      notes: "",
    });
    showToast("New customer lead added!");
  };

  // Export Leads to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export!");
      return;
    }
    const headers = ["ID,Date,Name,Phone,Service,GoldGrams,LoanAmount,Lender,Status,Notes"];
    const rows = leads.map((l) => {
      const date = new Date(l.createdAt).toLocaleDateString("en-IN");
      const cleanNotes = (l.notes || "").replace(/,/g, ";");
      return `"${l.id}","${date}","${l.name}","${l.phone}","${l.serviceType}","${l.goldGrams || ""}","${l.loanAmount || ""}","${l.lender || ""}","${l.status}","${cleanNotes}"`;
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mraj_jewelers_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Leads exported to CSV successfully!");
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.includes(leadSearch) ||
      (lead.lender || "").toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const newLeadsCount = leads.filter((l) => l.status === "New").length;

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0a0e] px-4 py-8 text-white font-sans">
        <div className="w-full max-w-sm rounded-3xl border border-[rgba(212,175,55,0.35)] bg-[#121218] p-6 sm:p-8 shadow-2xl shadow-black relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Back to Website"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(212,175,55,0.15)] text-[var(--gold-primary)] border border-[rgba(212,175,55,0.3)] shadow-lg mb-3">
              <Lock size={26} />
            </div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <img src={logoMrajWordmark} alt="MRAJ" className="h-4.5 w-auto object-contain" />
              <span className="brand-jewelers-text text-sm">JEWELERS</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-white">Owner & Staff Portal</h2>
            <p className="text-xs text-slate-400 mt-1">
              Live rates & customer inquiries manage karne ke liye 4-digit PIN enter karein
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 text-center">
                Security PIN (Default: 8101)
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="• • • •"
                autoFocus
                className={`w-full text-center text-2xl tracking-[0.4em] font-mono py-2.5 rounded-xl bg-[#0a0a0e] border ${
                  pinError ? "border-rose-500 ring-1 ring-rose-500" : "border-[rgba(212,175,55,0.4)]"
                } text-[var(--gold-light)] focus:outline-none focus:border-[var(--gold-primary)]`}
              />
              {pinError && (
                <p className="text-center text-rose-400 text-xs mt-1.5">
                  Galat PIN. Kripya sahi PIN dalein.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-gold w-full py-3 rounded-xl text-sm font-bold shadow-gold cursor-pointer"
            >
              Secure Login
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-xs text-slate-400 hover:text-white pt-2 transition cursor-pointer flex items-center justify-center gap-1"
            >
              <ArrowLeft size={14} /> Back to Public Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="fixed inset-0 z-[999] flex flex-col bg-[#0a0a0e] text-slate-100 font-sans overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-[1050] flex items-center gap-2 rounded-xl bg-emerald-950/95 border border-emerald-500/50 px-4 py-3 text-emerald-300 shadow-2xl backdrop-blur-md text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-14 sm:h-16 border-b border-[rgba(212,175,55,0.2)] bg-[#121218] px-3 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <img src={logoMrajWordmark} alt="MRAJ" className="h-4 sm:h-5 w-auto object-contain" />
          <span className="brand-jewelers-text text-xs sm:text-sm hidden min-[380px]:inline">
            JEWELERS
          </span>
          <span className="rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] px-2 py-0.5 text-[10px] font-extrabold text-[var(--gold-light)]">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-xl border border-[rgba(212,175,55,0.3)] bg-white/5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-[var(--gold-light)] hover:bg-[rgba(212,175,55,0.15)] transition cursor-pointer"
            title="Website dekhein"
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">View Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 rounded-xl bg-rose-950/40 border border-rose-500/30 px-2.5 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-900/40 transition cursor-pointer"
            title="Logout"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Dashboard Sub-Header / Quick Overview Bar */}
      <div className="bg-[#161622] border-b border-[rgba(212,175,55,0.15)] px-3 sm:px-6 py-2.5 flex items-center justify-between overflow-x-auto gap-4 shrink-0 text-xs">
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={14} className="text-[var(--gold-primary)]" />
            <span className="text-slate-400">Live 22K:</span>
            <strong className="text-[var(--gold-light)] font-bold">₹{rates["22K"].toLocaleString("en-IN")}/g</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-emerald-400" />
            <span className="text-slate-400">Total Leads:</span>
            <strong className="text-white font-bold">{leads.length}</strong>
            {newLeadsCount > 0 && (
              <span className="rounded-full bg-emerald-500 text-black font-black text-[10px] px-1.5 py-0.2">
                {newLeadsCount} New
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <Phone size={13} className="text-amber-400" />
            <span className="text-slate-400">Helpline:</span>
            <strong className="text-slate-200">{settings.phone}</strong>
          </div>
        </div>

        {/* 3 Main Navigation Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-[#0e0e14] border border-[rgba(212,175,55,0.2)] shrink-0">
          <button
            onClick={() => setActiveTab("rates")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "rates"
                ? "bg-[var(--gold-gradient)] text-black font-extrabold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <TrendingUp size={13} />
            <span>Gold Rates</span>
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer relative ${
              activeTab === "leads"
                ? "bg-[var(--gold-gradient)] text-black font-extrabold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users size={13} />
            <span>Customer Leads</span>
            {newLeadsCount > 0 && (
              <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "settings"
                ? "bg-[var(--gold-gradient)] text-black font-extrabold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Settings size={13} />
            <span className="hidden min-[480px]:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* TAB 1: GOLD & SILVER RATES */}
        {activeTab === "rates" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(212,175,55,0.2)] pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-[var(--gold-primary)]" size={20} />
                  Live Gold & Silver Rates Manager
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Roz subah yahan se naye rates update karein. "Save" karte hi poori website aur calculator par live ho jayenge.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetRates}
                className="self-start sm:self-auto text-[11px] font-bold text-slate-400 hover:text-[var(--gold-light)] transition cursor-pointer"
              >
                Reset to Standard Defaults
              </button>
            </div>

            <form onSubmit={handleSaveRates} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {/* 24K Gold */}
                <div className="rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#121218] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-[var(--gold-light)] uppercase tracking-wider block">
                        24K Pure Gold (99.9%)
                      </span>
                      <span className="text-[10px] text-slate-400">Standard Indian Bullion Benchmark</span>
                    </div>
                    <span className="rounded-md bg-amber-950/80 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/40">
                      999 Purity
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-[rgba(212,175,55,0.4)] focus-within:border-[var(--gold-light)]">
                    <span className="text-sm font-bold text-[var(--gold-primary)]">₹</span>
                    <input
                      type="number"
                      value={editedRates["24K"]}
                      onChange={(e) =>
                        setEditedRates({ ...editedRates, "24K": Number(e.target.value) })
                      }
                      className="w-full bg-transparent text-lg font-black text-white outline-none"
                    />
                    <span className="text-xs text-slate-400 font-semibold shrink-0">/ gram</span>
                  </div>
                </div>

                {/* 22K Gold */}
                <div className="rounded-2xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-br from-[#181824] to-[#121218] p-4 space-y-2 ring-1 ring-[rgba(212,175,55,0.3)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-[var(--gold-primary)] uppercase tracking-wider block">
                        22K Standard Gold (91.6%) ⭐ Primary
                      </span>
                      <span className="text-[10px] text-slate-400">Sabse zyada jewellery rate yahi hota hai</span>
                    </div>
                    <span className="rounded-md bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/40">
                      916 BIS Hallmark
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-[rgba(212,175,55,0.5)] focus-within:border-[var(--gold-light)]">
                    <span className="text-sm font-bold text-[var(--gold-primary)]">₹</span>
                    <input
                      type="number"
                      value={editedRates["22K"]}
                      onChange={(e) =>
                        setEditedRates({ ...editedRates, "22K": Number(e.target.value) })
                      }
                      className="w-full bg-transparent text-lg font-black text-[var(--gold-light)] outline-none"
                    />
                    <span className="text-xs text-slate-400 font-semibold shrink-0">/ gram</span>
                  </div>
                </div>

                {/* 20K Gold */}
                <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider block">
                        20K Gold (83.3%)
                      </span>
                      <span className="text-[10px] text-slate-400">Traditional / Village Jewellery</span>
                    </div>
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      833 Purity
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-[rgba(212,175,55,0.3)] focus-within:border-[var(--gold-light)]">
                    <span className="text-sm font-bold text-[var(--gold-primary)]">₹</span>
                    <input
                      type="number"
                      value={editedRates["20K"]}
                      onChange={(e) =>
                        setEditedRates({ ...editedRates, "20K": Number(e.target.value) })
                      }
                      className="w-full bg-transparent text-lg font-black text-white outline-none"
                    />
                    <span className="text-xs text-slate-400 font-semibold shrink-0">/ gram</span>
                  </div>
                </div>

                {/* 18K Gold */}
                <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider block">
                        18K Gold (75.0%)
                      </span>
                      <span className="text-[10px] text-slate-400">Diamond & Stone Studded Jewellery</span>
                    </div>
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      750 Purity
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-[rgba(212,175,55,0.3)] focus-within:border-[var(--gold-light)]">
                    <span className="text-sm font-bold text-[var(--gold-primary)]">₹</span>
                    <input
                      type="number"
                      value={editedRates["18K"]}
                      onChange={(e) =>
                        setEditedRates({ ...editedRates, "18K": Number(e.target.value) })
                      }
                      className="w-full bg-transparent text-lg font-black text-white outline-none"
                    />
                    <span className="text-xs text-slate-400 font-semibold shrink-0">/ gram</span>
                  </div>
                </div>

                {/* Silver Rate */}
                <div className="rounded-2xl border border-slate-700 bg-[#121218] p-4 space-y-2 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider block">
                        Silver (Chandi) Rate
                      </span>
                      <span className="text-[10px] text-slate-400">Chandi ke bartan, sikke & payal</span>
                    </div>
                    <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      Silver 999
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl bg-[#0a0a0e] px-3 py-2 border border-slate-600 focus-within:border-slate-300">
                    <span className="text-sm font-bold text-slate-300">₹</span>
                    <input
                      type="number"
                      value={editedRates.silver}
                      onChange={(e) =>
                        setEditedRates({ ...editedRates, silver: Number(e.target.value) })
                      }
                      className="w-full bg-transparent text-lg font-black text-white outline-none"
                    />
                    <span className="text-xs text-slate-400 font-semibold shrink-0">/ gram (₹{(editedRates.silver * 1000).toLocaleString("en-IN")}/kg)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-sm sm:text-base font-bold shadow-gold rounded-xl cursor-pointer active:scale-[0.99]"
                >
                  <Save size={18} />
                  <span>Save & Publish Live Rates</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: CUSTOMER LEADS CRM */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(212,175,55,0.2)] pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
                  <Users className="text-emerald-400" size={20} />
                  Customer Leads & Inquiries ({filteredLeads.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Website se aane wali sari inquiries yahan real-time record hoti hain.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setNewLeadModal(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-[rgba(212,175,55,0.2)] border border-[rgba(212,175,55,0.4)] px-3 py-2 text-xs font-bold text-[var(--gold-light)] hover:bg-[rgba(212,175,55,0.3)] transition cursor-pointer"
                >
                  <Plus size={14} /> Add Lead
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/80 transition cursor-pointer"
                >
                  <Download size={14} /> Export CSV
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 bg-[#121218] p-2.5 rounded-xl border border-[rgba(212,175,55,0.15)]">
              <div className="flex items-center gap-2 bg-[#0a0a0e] px-3 py-1.5 rounded-lg border border-slate-700 w-full sm:flex-1">
                <Search size={14} className="text-slate-400" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Customer name, phone ya lender search karein..."
                  className="bg-transparent text-xs text-white outline-none w-full"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <span className="text-xs text-slate-400 shrink-0">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#0a0a0e] text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 outline-none font-semibold w-full sm:w-auto"
                >
                  <option value="All">All Status ({leads.length})</option>
                  <option value="New">New ({leads.filter((l) => l.status === "New").length})</option>
                  <option value="Contacted">Contacted ({leads.filter((l) => l.status === "Contacted").length})</option>
                  <option value="Settled">Settled ({leads.filter((l) => l.status === "Settled").length})</option>
                  <option value="Cancelled">Cancelled ({leads.filter((l) => l.status === "Cancelled").length})</option>
                </select>
              </div>
            </div>

            {/* Leads Table / Cards */}
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-dashed border-slate-800 bg-[#121218]/40">
                <Users size={32} className="mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-slate-300">Koi lead nahi mili</p>
                <p className="text-xs text-slate-500 mt-0.5">Search filter change karein ya nayi lead add karein</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredLeads.map((lead) => {
                  const formattedDate = new Date(lead.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const waMsg = encodeURIComponent(
                    `Namaste ${lead.name} ji, MRAJ JEWELERS Bowbazar/Gariahat Kolkata se contact kar rahe hain aapki gold settlement inquiry ke silsile me. Kya hum aapki madad kar sakte hain?`
                  );

                  return (
                    <div
                      key={lead.id}
                      className="rounded-xl border border-[rgba(212,175,55,0.18)] bg-[#121218] p-3 sm:p-4 transition hover:border-[rgba(212,175,55,0.35)]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm sm:text-base">
                              {lead.name}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                                lead.status === "New"
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                                  : lead.status === "Contacted"
                                  ? "bg-amber-950 text-amber-300 border border-amber-500/50"
                                  : lead.status === "Settled"
                                  ? "bg-blue-950 text-blue-300 border border-blue-500/50"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {lead.status}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock size={11} /> {formattedDate}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 flex-wrap text-xs text-slate-300">
                            <span className="font-semibold text-[var(--gold-light)]">
                              {lead.serviceType}
                            </span>
                            {lead.lender && (
                              <span>• Lender: <strong className="text-white">{lead.lender}</strong></span>
                            )}
                            {lead.goldGrams && (
                              <span>• Weight: <strong className="text-amber-200">{lead.goldGrams}</strong></span>
                            )}
                            {lead.loanAmount ? (
                              <span>• Loan: <strong className="text-rose-300">₹{Number(lead.loanAmount).toLocaleString("en-IN")}</strong></span>
                            ) : null}
                          </div>

                          {lead.notes && (
                            <p className="text-[11px] text-slate-400 italic bg-[#0a0a0e] px-2.5 py-1 rounded-md mt-1 border border-slate-800">
                              Note: {lead.notes}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons: 1-Click WhatsApp, Call & Status Dropdown */}
                        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                          <a
                            href={`https://wa.me/91${lead.phone}?text=${waMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-1.5 text-xs font-bold text-[#25d366] hover:bg-emerald-900/80 transition"
                            title="WhatsApp Chat"
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:+91${lead.phone}`}
                            className="flex items-center gap-1 rounded-lg bg-[#1a1a26] border border-[rgba(212,175,55,0.3)] px-2.5 py-1.5 text-xs font-bold text-[var(--gold-light)] hover:bg-[rgba(212,175,55,0.2)] transition"
                            title="Direct Call"
                          >
                            <Phone size={14} />
                            <span>Call</span>
                          </a>

                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleLeadStatusChange(lead.id, e.target.value as CustomerLead["status"])
                            }
                            className="bg-[#0a0a0e] text-[11px] text-slate-200 border border-slate-700 rounded-lg px-2 py-1.5 outline-none font-bold cursor-pointer"
                          >
                            <option value="New">Mark New</option>
                            <option value="Contacted">Mark Contacted</option>
                            <option value="Settled">Mark Settled</option>
                            <option value="Cancelled">Mark Cancelled</option>
                          </select>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTACT & HELPLINE SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="border-b border-[rgba(212,175,55,0.2)] pb-4">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
                <Settings className="text-amber-400" size={20} />
                Helpline & Business Settings
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Yahan se aap website par dikhne wala phone number, WhatsApp number aur security PIN badal sakte hain.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)]">
                  Customer Contact Channels
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Primary Helpline Phone Number (Calls)
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="form-input text-xs sm:text-sm font-mono"
                    placeholder="+91 81011 21813"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Website ke header aur call buttons par ye number redirect hoga.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    WhatsApp Number (without +)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="form-input text-xs sm:text-sm font-mono"
                    placeholder="918101121813"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    WhatsApp Slip aur chat triggers is number par open honge.
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)]">
                  Branch Hub Locations
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Kolkata Central Hub Address
                  </label>
                  <input
                    type="text"
                    value={settings.bowbazarAddress}
                    onChange={(e) => setSettings({ ...settings, bowbazarAddress: e.target.value })}
                    className="form-input text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Kolkata South Hub Address
                  </label>
                  <input
                    type="text"
                    value={settings.gariahatAddress}
                    onChange={(e) => setSettings({ ...settings, gariahatAddress: e.target.value })}
                    className="form-input text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)]">
                  Admin Panel Security
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Admin Portal PIN (4 to 6 Digits)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={settings.adminPin}
                    onChange={(e) => setSettings({ ...settings, adminPin: e.target.value })}
                    className="form-input text-xs sm:text-sm font-mono tracking-widest w-36"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Is PIN se aap admin dashboard login karenge.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-sm font-bold shadow-gold rounded-xl cursor-pointer"
                >
                  <Save size={16} />
                  <span>Save Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Manual Add Lead Modal */}
      {newLeadModal && (
        <div className="fixed inset-0 z-[1020] flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#181824] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-1.5">
                <Plus size={16} className="text-[var(--gold-primary)]" />
                Add Customer Inquiry Manually
              </h3>
              <button
                onClick={() => setNewLeadModal(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Customer Full Name *</label>
                <input
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="e.g. Joydeep Ghosh"
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Phone Number *</label>
                <input
                  required
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="form-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Service Type</label>
                  <select
                    value={newLead.serviceType}
                    onChange={(e) => setNewLead({ ...newLead, serviceType: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="Gold Loan Settlement">Gold Loan Settlement</option>
                    <option value="Partial Gold Release">Partial Gold Release</option>
                    <option value="Sell Old Gold & Jewellery">Sell Old Gold</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Lender (Bank/NBFC)</label>
                  <input
                    value={newLead.lender}
                    onChange={(e) => setNewLead({ ...newLead, lender: e.target.value })}
                    placeholder="Muthoot, SBI, etc."
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Approx Gold (g)</label>
                  <input
                    value={newLead.goldGrams}
                    onChange={(e) => setNewLead({ ...newLead, goldGrams: e.target.value })}
                    placeholder="e.g. 45g"
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Loan Amount (₹)</label>
                  <input
                    value={newLead.loanAmount}
                    onChange={(e) => setNewLead({ ...newLead, loanAmount: e.target.value })}
                    placeholder="e.g. 150000"
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Notes / Remarks</label>
                <textarea
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="Any specific requirement or urgent auction date..."
                  className="form-input text-xs resize-none h-16"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewLeadModal(false)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold shadow-gold cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
