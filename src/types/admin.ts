export interface GoldRatesConfig {
  "24K": number;
  "22K": number;
  "20K": number;
  "18K": number;
  silver: number;
}

export interface CustomerLeadAttachment {
  name: string;
  size: string;
  previewUrl?: string;
  isImage?: boolean;
  type?: "document" | "photo";
}

export interface CustomerLead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  location?: string;
  serviceType: string;
  category?: "gold_loan" | "old_gold" | "auction_relief" | "calculator" | "general";
  goldGrams?: number | string;
  loanAmount?: number | string;
  lender?: string;
  status: "New" | "Contacted" | "Verified" | "Settled" | "Cancelled";
  notes?: string;
  attachment?: CustomerLeadAttachment;
}

export interface CustomerFeedback {
  id: string;
  createdAt: string;
  name: string;
  phone?: string;
  location: string;
  serviceType: string;
  rating: number;
  comment: string;
  recommended?: boolean;
}

export interface AdminSettings {
  phone: string;
  whatsapp: string;
  bowbazarAddress: string;
  gariahatAddress: string;
  adminPin: string;
}

export type AdminTabType = "analytics" | "rates" | "leads" | "feedback" | "settings";

