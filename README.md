# 👑 MRAJ JEWELERS (MD ENTERPRISE)

A high-converting, mobile-first fintech & gold loan settlement platform for **MRAJ JEWELERS (MD ENTERPRISE)**, specializing in releasing pledged gold from Muthoot Finance, Manappuram, and nationalized banks with ₹0 advance fees.

> 📖 **Full Master Technical Documentation**: See [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) for complete architecture, modular components, analytics telemetry, and admin specifications.

---

## 🌟 Key Features

- **₹0 Advance Fee Gold Release**: Clear gold loans across Muthoot, Manappuram, and nationalized banks with spot counter settlement.
- **Smart Settlement & Valuation Estimator**: Interactive calculator supporting:
  - Cash Settlement (Full loan takeover & extra cash payout)
  - Partial Release (Sell a portion of gold, retain essential jewellery)
  - Sell Old Physical Gold (Instant spot cash & UPI)
- **Live Gold Market Rates**: Real-time 24K, 22K, 20K, 18K, and Silver rate editor synchronized with LocalStorage.
- **Modular Component Architecture**:
  - `src/components/admin/` — AdminHeader, AdminAnalyticsTab, AdminRatesTab, AdminLeadsTab, AdminSettingsTab, AdminLoginModal.
  - `src/components/public/` — PublicNavbar, HeroSection, ServicesSection, LoanCalculatorSection, ProcessSection, AuctionNoticeSection, FaqSection, PublicFooter, FloatingActions, LeadModals.
- **Real-Time Analytics & IP Location Tracking**: Track button clicks, popups, device breakdown (Mobile/Desktop/Tablet), and visitor IP & City geolocation.
- **Owner & Staff Admin Portal (`#admin`)**: PIN-authenticated dashboard for leads, rates, analytics, and contact numbers.
- **Official Contact**: Direct Call & WhatsApp redirects to `+91 81011 21813`.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite 7 (`vite-plugin-singlefile`)
- **Styling**: Tailwind CSS v4 + Custom Design Tokens (`src/index.css`)
- **Animation**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```