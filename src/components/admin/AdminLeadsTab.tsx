import React, { useState } from "react";
import {
  AlertTriangle,
  Building2,
  Camera,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  Gem,
  Landmark,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { CustomerLead, CustomerLeadAttachment } from "../../types/admin";
import { LOCATION_OPTIONS } from "../../constants/publicData";

interface AdminLeadsTabProps {
  leads: CustomerLead[];
  onUpdateLeads: (leads: CustomerLead[]) => void;
  showToast: (msg: string) => void;
}

type CategoryFilter = "all" | "gold_loan" | "old_gold" | "auction_relief" | "with_attachments" | "whatsapp_leads";

const getLeadCategory = (
  lead: CustomerLead
): "gold_loan" | "old_gold" | "auction_relief" | "calculator" | "general" => {
  if (lead.category) return lead.category;
  const str = `${lead.serviceType} ${lead.notes || ""} ${lead.lender || ""}`.toLowerCase();
  if (str.includes("auction") || str.includes("notice")) return "auction_relief";
  if (str.includes("old gold") || str.includes("jeweller") || str.includes("bangle") || str.includes("sale"))
    return "old_gold";
  if (str.includes("calculator") || str.includes("valuation")) return "calculator";
  if (
    str.includes("loan") ||
    str.includes("settle") ||
    str.includes("release") ||
    str.includes("muthoot") ||
    str.includes("manappuram")
  )
    return "gold_loan";
  return "general";
};

export const AdminLeadsTab: React.FC<AdminLeadsTabProps> = ({
  leads,
  onUpdateLeads,
  showToast,
}) => {
  const [leadSearch, setLeadSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [locationFilter, setLocationFilter] = useState("All");

  // Document / Photo Preview Modal
  const [previewAttachment, setPreviewAttachment] = useState<{
    leadName: string;
    attachment: CustomerLeadAttachment;
  } | null>(null);

  // Manual Add Lead Modal
  const [newLeadModal, setNewLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    location: "Kalyani",
    category: "gold_loan" as "gold_loan" | "old_gold" | "auction_relief",
    serviceType: "Gold Loan Settlement",
    goldGrams: "",
    loanAmount: "",
    lender: "Muthoot Finance",
    status: "New" as CustomerLead["status"],
    notes: "",
    attachmentName: "",
    attachmentType: "document" as "document" | "photo",
  });

  // Calculate Category Counts
  const counts = {
    total: leads.length,
    goldLoan: leads.filter((l) => getLeadCategory(l) === "gold_loan").length,
    oldGold: leads.filter((l) => getLeadCategory(l) === "old_gold").length,
    auctionRelief: leads.filter((l) => getLeadCategory(l) === "auction_relief").length,
    withAttachments: leads.filter(
      (l) => l.attachment || (l.notes && l.notes.toLowerCase().includes("attach"))
    ).length,
    whatsappLeads: leads.filter(
      (l) => (l.lender || "").toLowerCase().includes("whatsapp") || l.name.toLowerCase().includes("whatsapp")
    ).length,
  };

  const handleLeadStatusChange = (id: string, newStatus: CustomerLead["status"]) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    onUpdateLeads(updated);
    showToast(`Lead status updated to ${newStatus}`);
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Kya aap is lead ko delete karna chahte hain?")) {
      const updated = leads.filter((l) => l.id !== id);
      onUpdateLeads(updated);
      showToast("Lead removed.");
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name.trim() || !newLead.phone.trim()) return;

    const created: CustomerLead = {
      id: "lead-" + Date.now(),
      createdAt: new Date().toISOString(),
      name: newLead.name.trim(),
      phone: newLead.phone.trim(),
      location: newLead.location,
      category: newLead.category,
      serviceType:
        newLead.category === "old_gold"
          ? "Sell Old Gold & Jewellery"
          : newLead.category === "auction_relief"
          ? "Auction Notice Relief"
          : "Gold Loan Settlement",
      goldGrams: newLead.goldGrams ? newLead.goldGrams : undefined,
      loanAmount: newLead.loanAmount ? Number(newLead.loanAmount) : undefined,
      lender: newLead.lender,
      status: newLead.status,
      notes: newLead.notes,
      attachment: newLead.attachmentName
        ? {
            name: newLead.attachmentName,
            size: "Sample Size",
            type: newLead.attachmentType,
          }
        : undefined,
    };

    onUpdateLeads([created, ...leads]);
    setNewLeadModal(false);
    setNewLead({
      name: "",
      phone: "",
      location: "Kalyani",
      category: "gold_loan",
      serviceType: "Gold Loan Settlement",
      goldGrams: "",
      loanAmount: "",
      lender: "Muthoot Finance",
      status: "New",
      notes: "",
      attachmentName: "",
      attachmentType: "document",
    });
    showToast("New categorized lead added successfully!");
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export!");
      return;
    }
    const headers = [
      "ID,Date,Name,Phone,Location,Category,Service,GoldGrams,LoanAmount,Lender,Attachment,Status,Notes",
    ];
    const rows = leads.map((l) => {
      const date = new Date(l.createdAt).toLocaleDateString("en-IN");
      const cleanNotes = (l.notes || "").replace(/,/g, ";");
      const category = getLeadCategory(l);
      const attachmentInfo = l.attachment ? `${l.attachment.name} (${l.attachment.size})` : "None";
      return `"${l.id}","${date}","${l.name}","${l.phone}","${l.location || ""}","${category}","${l.serviceType}","${l.goldGrams || ""}","${l.loanAmount || ""}","${l.lender || ""}","${attachmentInfo}","${l.status}","${cleanNotes}"`;
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

  // Filter Pipeline
  const filteredLeads = leads.filter((lead) => {
    const category = getLeadCategory(lead);
    const matchesSearch =
      lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.includes(leadSearch) ||
      (lead.lender || "").toLowerCase().includes(leadSearch.toLowerCase()) ||
      (lead.location || "").toLowerCase().includes(leadSearch.toLowerCase());

    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const matchesLocation = locationFilter === "All" || (lead.location || "").toLowerCase().includes(locationFilter.toLowerCase());

    let matchesCategory = true;
    if (categoryFilter === "gold_loan") {
      matchesCategory = category === "gold_loan";
    } else if (categoryFilter === "old_gold") {
      matchesCategory = category === "old_gold";
    } else if (categoryFilter === "auction_relief") {
      matchesCategory = category === "auction_relief";
    } else if (categoryFilter === "with_attachments") {
      matchesCategory = !!lead.attachment || !!(lead.notes && lead.notes.toLowerCase().includes("attach"));
    } else if (categoryFilter === "whatsapp_leads") {
      matchesCategory = (lead.lender || "").toLowerCase().includes("whatsapp") || lead.name.toLowerCase().includes("whatsapp");
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesLocation;
  });

  return (
    <div className="space-y-4">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(212,175,55,0.2)] pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
            <Users className="text-emerald-400" size={20} />
            Categorized Customer Leads ({filteredLeads.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Har inquiry category, uploaded documents, gold purity aur branch tracking ke sath organized hai.
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

      {/* 4 Category Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Card 1: Gold Loan Settlement */}
        <button
          onClick={() => setCategoryFilter(categoryFilter === "gold_loan" ? "all" : "gold_loan")}
          className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            categoryFilter === "gold_loan"
              ? "bg-amber-950/50 border-[var(--gold-primary)] shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              : "bg-[#121218] border-[rgba(212,175,55,0.18)] hover:border-[rgba(212,175,55,0.4)]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--gold-light)] flex items-center gap-1">
              <Landmark size={13} className="text-[var(--gold-primary)]" />
              Gold Loan Settlement
            </span>
            <span className="h-2 w-2 rounded-full bg-[var(--gold-primary)]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-serif font-bold text-white">{counts.goldLoan}</span>
            <span className="text-[10px] text-slate-400">Pledge Release</span>
          </div>
        </button>

        {/* Card 2: Sell Old Gold */}
        <button
          onClick={() => setCategoryFilter(categoryFilter === "old_gold" ? "all" : "old_gold")}
          className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            categoryFilter === "old_gold"
              ? "bg-emerald-950/50 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
              : "bg-[#121218] border-emerald-500/20 hover:border-emerald-500/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
              <Gem size={13} className="text-emerald-400" />
              Sell Old Gold
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-serif font-bold text-white">{counts.oldGold}</span>
            <span className="text-[10px] text-slate-400">Jewellery Valuation</span>
          </div>
        </button>

        {/* Card 3: Auction Notice Relief */}
        <button
          onClick={() => setCategoryFilter(categoryFilter === "auction_relief" ? "all" : "auction_relief")}
          className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            categoryFilter === "auction_relief"
              ? "bg-rose-950/50 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.25)]"
              : "bg-[#121218] border-rose-500/20 hover:border-rose-500/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-300 flex items-center gap-1">
              <AlertTriangle size={13} className="text-rose-400" />
              Auction Notice
            </span>
            <span className="h-2 w-2 rounded-full bg-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-serif font-bold text-white">{counts.auctionRelief}</span>
            <span className="text-[10px] text-rose-400 font-bold">Urgent Protection</span>
          </div>
        </button>

        {/* Card 4: Documents & Photos Attached */}
        <button
          onClick={() => setCategoryFilter(categoryFilter === "with_attachments" ? "all" : "with_attachments")}
          className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            categoryFilter === "with_attachments"
              ? "bg-cyan-950/50 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
              : "bg-[#121218] border-cyan-500/20 hover:border-cyan-500/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
              <Camera size={13} className="text-cyan-400" />
              With Attachments
            </span>
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-serif font-bold text-white">{counts.withAttachments}</span>
            <span className="text-[10px] text-cyan-400">Slips & Photos</span>
          </div>
        </button>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
            categoryFilter === "all"
              ? "bg-[var(--gold-primary)] text-black shadow-gold"
              : "bg-[#181824] text-slate-300 hover:text-white border border-slate-700/60"
          }`}
        >
          All Categories ({counts.total})
        </button>

        <button
          onClick={() => setCategoryFilter("gold_loan")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === "gold_loan"
              ? "bg-amber-500 text-black shadow-md font-black"
              : "bg-[#181824] text-amber-300 hover:text-white border border-amber-500/30"
          }`}
        >
          <Landmark size={12} />
          Gold Loan Settlement ({counts.goldLoan})
        </button>

        <button
          onClick={() => setCategoryFilter("old_gold")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === "old_gold"
              ? "bg-emerald-500 text-black shadow-md font-black"
              : "bg-[#181824] text-emerald-300 hover:text-white border border-emerald-500/30"
          }`}
        >
          <Gem size={12} />
          Sell Old Gold ({counts.oldGold})
        </button>

        <button
          onClick={() => setCategoryFilter("auction_relief")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === "auction_relief"
              ? "bg-rose-500 text-white shadow-md font-black"
              : "bg-[#181824] text-rose-300 hover:text-white border border-rose-500/30"
          }`}
        >
          <AlertTriangle size={12} />
          Auction Notice ({counts.auctionRelief})
        </button>

        <button
          onClick={() => setCategoryFilter("with_attachments")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === "with_attachments"
              ? "bg-cyan-500 text-black shadow-md font-black"
              : "bg-[#181824] text-cyan-300 hover:text-white border border-cyan-500/30"
          }`}
        >
          <FileText size={12} />
          With Uploaded Slips/Photos ({counts.withAttachments})
        </button>

        <button
          onClick={() => setCategoryFilter("whatsapp_leads")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === "whatsapp_leads"
              ? "bg-[#25D366] text-black shadow-md font-black"
              : "bg-[#181824] text-[#25D366] hover:text-white border border-[#25D366]/30"
          }`}
        >
          <MessageCircle size={12} />
          WhatsApp Clicks ({counts.whatsappLeads})
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 bg-[#121218] p-2.5 rounded-xl border border-[rgba(212,175,55,0.15)]">
        <div className="flex items-center gap-2 bg-[#0a0a0e] px-3 py-1.5 rounded-lg border border-slate-700 w-full sm:flex-1">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            value={leadSearch}
            onChange={(e) => setLeadSearch(e.target.value)}
            placeholder="Customer name, phone, lender ya location search karein..."
            className="bg-transparent text-xs text-white outline-none w-full placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
            <span className="text-[11px] text-slate-400 shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0a0a0e] text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 outline-none font-semibold w-full sm:w-auto cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Verified">Verified</option>
              <option value="Settled">Settled</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
            <span className="text-[11px] text-slate-400 shrink-0">Location:</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-[#0a0a0e] text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 outline-none font-semibold w-full sm:w-auto cursor-pointer"
            >
              <option value="All">All Cities</option>
              {LOCATION_OPTIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Cards List */}
      {filteredLeads.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-800 bg-[#121218]/40">
          <Users size={32} className="mx-auto text-slate-600 mb-2" />
          <p className="text-sm font-semibold text-slate-300">Koi categorized lead nahi mili</p>
          <p className="text-xs text-slate-500 mt-0.5">Filter change karein ya nayi lead add karein</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead) => {
            const category = getLeadCategory(lead);
            const formattedDate = new Date(lead.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });

            const waMsg = encodeURIComponent(
              category === "auction_relief"
                ? `Namaste ${lead.name} ji, MRAJ JEWELERS se urgent gold auction notice assistance ke liye sampark kar rahe hain. Aapka loan gold surrender hone se bacha sakte hain. Kya hum baat kar sakte hain?`
                : category === "old_gold"
                ? `Namaste ${lead.name} ji, MRAJ JEWELERS (${lead.location || "Kalyani"}) se old gold valuation & direct payout ke silsile me contact kar rahe hain. Live rate par instant payout ke liye guide karein.`
                : `Namaste ${lead.name} ji, MRAJ JEWELERS (${lead.location || "Kalyani"}) se Gold Loan Settlement aur locker se direct sona release karwane ke silsile me contact kar rahe hain.`
            );

            return (
              <div
                key={lead.id}
                className="rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[#121218] p-3.5 sm:p-4.5 transition hover:border-[rgba(212,175,55,0.4)] shadow-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    {/* Top Row: Name, Location, Status, Time */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-base">
                        {lead.name}
                      </span>

                      {/* Location Badge */}
                      {lead.location && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10.5px] font-semibold text-slate-300">
                          <MapPin size={10} className="text-[var(--gold-primary)]" />
                          {lead.location}
                        </span>
                      )}

                      {/* Category Badge */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                          category === "auction_relief"
                            ? "bg-rose-950 text-rose-300 border border-rose-500/50"
                            : category === "old_gold"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                            : "bg-amber-950 text-amber-300 border border-amber-500/50"
                        }`}
                      >
                        {category === "auction_relief" ? (
                          <AlertTriangle size={10} />
                        ) : category === "old_gold" ? (
                          <Gem size={10} />
                        ) : (
                          <Landmark size={10} />
                        )}
                        {category === "auction_relief"
                          ? "Auction Notice"
                          : category === "old_gold"
                          ? "Sell Old Gold"
                          : "Gold Loan Settlement"}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                          lead.status === "New"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                            : lead.status === "Contacted"
                            ? "bg-amber-950 text-amber-300 border border-amber-500/50"
                            : lead.status === "Verified"
                            ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50"
                            : lead.status === "Settled"
                            ? "bg-blue-950 text-blue-300 border border-blue-500/50"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {lead.status}
                      </span>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto lg:ml-0">
                        <Clock size={11} /> {formattedDate}
                      </span>
                    </div>

                    {/* Metadata Row: Lender, Grams, Loan Amount, Phone */}
                    <div className="flex items-center gap-3 flex-wrap text-xs text-slate-300 pt-0.5">
                      <span className="font-semibold text-slate-400">
                        Phone: <strong className="text-white">{lead.phone}</strong>
                      </span>

                      {lead.lender && (
                        <span>
                          • Lender / Type: <strong className="text-white">{lead.lender}</strong>
                        </span>
                      )}

                      {lead.goldGrams && (
                        <span>
                          • Weight: <strong className="text-amber-200">{lead.goldGrams}</strong>
                        </span>
                      )}

                      {lead.loanAmount ? (
                        <span>
                          • Loan:{" "}
                          <strong className="text-rose-300">
                            ₹{Number(lead.loanAmount).toLocaleString("en-IN")}
                          </strong>
                        </span>
                      ) : null}
                    </div>

                    {/* Document / Jewellery Photo Attachment Pill */}
                    {lead.attachment ? (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewAttachment({
                              leadName: lead.name,
                              attachment: lead.attachment!,
                            })
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/60 transition cursor-pointer"
                        >
                          {lead.attachment.isImage ? (
                            <Camera size={13} className="text-cyan-400" />
                          ) : (
                            <FileText size={13} className="text-cyan-400" />
                          )}
                          <span>
                            {lead.attachment.type === "photo" ? "Jewellery Photo" : "Loan Document"}:{" "}
                            <strong className="text-white">{lead.attachment.name}</strong>
                          </span>
                          <span className="text-[10px] text-cyan-400">({lead.attachment.size})</span>
                          <Eye size={12} className="ml-1 text-cyan-400" />
                        </button>
                      </div>
                    ) : lead.notes && lead.notes.toLowerCase().includes("document attached") ? (
                      <div className="flex items-center gap-2 pt-1">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                          <FileCheck size={13} className="text-emerald-400" />
                          <span>{lead.notes}</span>
                        </span>
                      </div>
                    ) : null}

                    {/* Notes Row */}
                    {lead.notes && !lead.notes.toLowerCase().includes("document attached") && (
                      <p className="text-[11px] text-slate-400 italic bg-[#0a0a0e] px-2.5 py-1 rounded-md mt-1 border border-slate-800">
                        Remarks: {lead.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions Right Side */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                    <a
                      href={`https://wa.me/91${lead.phone}?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 px-3 py-2 text-xs font-bold text-[#25d366] hover:bg-emerald-900/80 transition cursor-pointer"
                      title="WhatsApp Chat"
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:+91${lead.phone}`}
                      className="flex items-center gap-1.5 rounded-xl bg-[#1a1a26] border border-[rgba(212,175,55,0.3)] px-3 py-2 text-xs font-bold text-[var(--gold-light)] hover:bg-[rgba(212,175,55,0.2)] transition cursor-pointer"
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
                      className="bg-[#0a0a0e] text-[11px] text-slate-200 border border-slate-700 rounded-xl px-2.5 py-2 outline-none font-bold cursor-pointer"
                    >
                      <option value="New">Mark New</option>
                      <option value="Contacted">Mark Contacted</option>
                      <option value="Verified">Mark Verified</option>
                      <option value="Settled">Mark Settled</option>
                      <option value="Cancelled">Mark Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
                      title="Delete Lead"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Attachment Preview Modal */}
      {previewAttachment && (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-[rgba(212,175,55,0.35)] bg-[#14141c] p-5 shadow-2xl text-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(212,175,55,0.15)] text-[var(--gold-primary)]">
                  {previewAttachment.attachment.type === "photo" ? (
                    <Camera size={16} />
                  ) : (
                    <FileText size={16} />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {previewAttachment.attachment.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Uploaded by: <strong className="text-white">{previewAttachment.leadName}</strong> •{" "}
                    {previewAttachment.attachment.size}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewAttachment(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Preview */}
            <div className="rounded-xl border border-slate-800 bg-[#0a0a0e] p-3 flex flex-col items-center justify-center min-h-[220px]">
              {previewAttachment.attachment.previewUrl ? (
                <img
                  src={previewAttachment.attachment.previewUrl}
                  alt={previewAttachment.attachment.name}
                  className="max-h-[340px] w-auto rounded-lg object-contain"
                />
              ) : previewAttachment.attachment.isImage ? (
                <div className="text-center py-6">
                  <Camera size={48} className="mx-auto text-[var(--gold-primary)] mb-2" />
                  <p className="text-sm font-bold text-white">Jewellery Photo Attached</p>
                  <p className="text-xs text-slate-400 mt-1">{previewAttachment.attachment.name}</p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText size={48} className="mx-auto text-emerald-400 mb-2" />
                  <p className="text-sm font-bold text-white">Loan Document / Slip (PDF)</p>
                  <p className="text-xs text-slate-400 mt-1">{previewAttachment.attachment.name}</p>
                  <span className="inline-block mt-3 rounded-full bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 text-[11px] font-bold text-emerald-300">
                    Verified Customer Document
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Type:{" "}
                <strong className="text-white capitalize">
                  {previewAttachment.attachment.type || "Document"}
                </strong>
              </span>
              <button
                onClick={() => setPreviewAttachment(null)}
                className="btn-gold px-4 py-2 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Lead Modal with Categories */}
      {newLeadModal && (
        <div className="fixed inset-0 z-[1020] flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#181824] p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-1.5">
                <Plus size={16} className="text-[var(--gold-primary)]" />
                Add Categorized Customer Inquiry
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
                  placeholder="e.g. Ramesh Sharma"
                  className="form-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Phone Number *</label>
                  <input
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Location / Branch</label>
                  <select
                    value={newLead.location}
                    onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                    className="form-input text-xs"
                  >
                    {LOCATION_OPTIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Selector */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Service Category *</label>
                <select
                  value={newLead.category}
                  onChange={(e) =>
                    setNewLead({
                      ...newLead,
                      category: e.target.value as any,
                      attachmentType: e.target.value === "old_gold" ? "photo" : "document",
                    })
                  }
                  className="form-input text-xs font-bold text-[var(--gold-light)]"
                >
                  <option value="gold_loan">🏦 Gold Loan Settlement</option>
                  <option value="old_gold">💎 Sell Old Gold & Jewellery</option>
                  <option value="auction_relief">🚨 Auction Notice Relief (Urgent)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Lender / Bank</label>
                  <input
                    value={newLead.lender}
                    onChange={(e) => setNewLead({ ...newLead, lender: e.target.value })}
                    placeholder="Muthoot, SBI, Manappuram..."
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Approx Gold (g)</label>
                  <input
                    value={newLead.goldGrams}
                    onChange={(e) => setNewLead({ ...newLead, goldGrams: e.target.value })}
                    placeholder="e.g. 55g"
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Loan Amount (₹)</label>
                  <input
                    value={newLead.loanAmount}
                    onChange={(e) => setNewLead({ ...newLead, loanAmount: e.target.value })}
                    placeholder="e.g. 180000"
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Initial Status</label>
                  <select
                    value={newLead.status}
                    onChange={(e) => setNewLead({ ...newLead, status: e.target.value as any })}
                    className="form-input text-xs"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Verified">Verified</option>
                    <option value="Settled">Settled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Attached File / Photo Name (Optional)
                </label>
                <input
                  value={newLead.attachmentName}
                  onChange={(e) => setNewLead({ ...newLead, attachmentName: e.target.value })}
                  placeholder="e.g. loan_slip.pdf ya jewellery_photo.jpg"
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Notes / Special Case</label>
                <textarea
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="Customer call details, urgency, branch visit timing..."
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
                  Save Categorized Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
