# 👑 MRAJ JEWELERS (MD ENTERPRISE) — MASTER TECHNICAL & PROJECT DOCUMENTATION

> **Brand**: MRAJ JEWELERS (MD ENTERPRISE)  
> **Specialization**: Girvi Gold Loan Settlement, Jewellery Release & Old Gold Valuation  
> **Official Hotline & WhatsApp**: `+91 81011 21813`  
> **Physical Hubs**:
> - **Kolkata Central Hub**: Bowbazar / B.B. Ganguly St, Kolkata 700012
> - **Kolkata South Hub**: Gariahat Road, Kolkata 700019  
> **Supported Lenders**: Muthoot Finance, Manappuram Finance, SBI Gold Loan, HDFC Bank, IIFL, ICICI, Shriram Finance, Federal Bank, Canara Bank, Axis Bank, and all NBFCs/Banks  
> **Core Guarantee**: ₹0 Advance Fee • 100% Legal Bank Clearance with NOC • Direct Locker Handover

---

## 📑 Table of Contents
1. [Business Overview & Core Services](#1-business-overview--core-services)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Modular Directory & Component Structure](#3-modular-directory--component-structure)
4. [Public Website Features & Components](#4-public-website-features--components)
5. [Smart Valuation & Settlement Calculator](#5-smart-valuation--settlement-calculator)
6. [Staff & Owner Admin Portal](#6-staff--owner-admin-portal)
7. [Analytics, Device Breakdown & IP Location Tracking](#7-analytics-device-breakdown--ip-location-tracking)
8. [Data Models & LocalStorage State Management](#8-data-models--localstorage-state-management)
9. [Developer Guidelines & AI Prompting Rules](#9-developer-guidelines--ai-prompting-rules)

---

## 1. Business Overview & Core Services

### Primary Value Proposition
Customers who have pledged gold jewellery in banks or NBFCs (like Muthoot or Manappuram) and face high compounding interest or auction risk can have their gold loans cleared directly at the branch counter:
1. **Gold Loan Settlement (Girvi Sona Release)**:
   - MD Enterprise executive visits the lender branch with the customer.
   - The outstanding loan is paid directly to the lender counter (₹0 advance fee from customer).
   - Gold jewellery is released from the locker in front of the customer with loan closure NOC.
   - Purity and weight are verified using computerized testing at live market rate.
   - The customer receives the extra balance payout immediately via Cash, UPI, or Bank Transfer.
2. **Partial Gold Release (Keep Gold)**:
   - Only the required grams of gold are sold to clear the loan; the remaining ornaments are handed back to the customer safely.
3. **Sell Old Gold & Silver**:
   - Spot counter cash/UPI for physical old jewellery, broken scrap gold, gold coins (999/916), and silver items with 0% hidden deduction.
4. **Urgent Auction Notice Relief**:
   - Immediate intervention for accounts where the lender has served an auction notice.

---

## 2. Tech Stack & Architecture

- **Framework**: React 18 (TypeScript)
- **Bundling**: Vite 7 (configured with `vite-plugin-singlefile` for ultra-portable, fast client builds)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design System (`src/index.css`)
- **Animation & Transitions**: Framer Motion
- **Icons**: Lucide React
- **Analytics & Telemetry**: Native client-side event tracking + IP Geolocation API (`ipapi.co` / fallback)
- **Modularized Architecture**: 
  - Monolithic `AdminPanel.tsx` (1,694 lines) refactored to **166 lines**
  - Monolithic `App.tsx` (2,227 lines) refactored to **186 lines**
  - High speed Vite HMR builds (2.5s) and token-efficient AI pair programming (<80% token usage).

---

## 3. Modular Directory & Component Structure

```
d:\PROJECTS\MD ENTERPRISE\
├── index.html                         # SPA Entry point & meta headers
├── package.json                       # Dependencies & scripts (build, dev, preview)
├── tsconfig.json                      # Strict TypeScript compiler options
├── vite.config.ts                     # Vite configuration & singlefile plugin
├── PROJECT_DOCUMENTATION.md           # Master project documentation (This file)
├── README.md                          # Repository quickstart guide
│
└── src/
    ├── types/                         # TypeScript interfaces
    │   └── admin.ts                   # GoldRatesConfig, CustomerLead, AdminSettings, AdminTabType
    │
    ├── constants/                     # Static configurations & mock defaults
    │   ├── adminDefaults.ts           # DEFAULT_RATES, DEFAULT_SETTINGS, SAMPLE_LEADS
    │   └── publicData.ts              # lendersList, citiesList, liveTickerFeed, faqs, query options
    │
    ├── components/
    │   ├── common/
    │   │   └── Reveal.tsx             # Framer-motion scroll reveal wrapper
    │   │
    │   ├── admin/                     # Modular Admin Panel Subcomponents
    │   │   ├── AdminHeader.tsx        # Sticky header, stats, 4-tab grid, live IP/city badge, logout
    │   │   ├── AdminLoginModal.tsx    # PIN-protected auth dialog (Default PIN: 1234)
    │   │   ├── AdminAnalyticsTab.tsx  # KPI cards, device breakdown, location IP tracker, filter & timeline
    │   │   ├── AdminRatesTab.tsx      # Real-time gold (24K, 22K, 20K, 18K) & silver rate editor
    │   │   ├── AdminLeadsTab.tsx      # Customer inquiries, CSV export, search, status updates
    │   │   └── AdminSettingsTab.tsx   # Phone helpline, WhatsApp number, branch addresses, PIN editor
    │   │
    │   └── public/                    # Modular Public Website Sections
    │       ├── PublicNavbar.tsx       # Live rates ticker, MRAJ logo, nav links, admin portal trigger
    │       ├── HeroSection.tsx        # Display video showcase, headline, value chips, metric badges
    │       ├── ServicesSection.tsx    # Gold Loan Settlement & Sell Old Gold cards with quick modal triggers
    │       ├── LoanCalculatorSection.tsx # Estimator preview card & 3-mode pop-up modal
    │       ├── ProcessSection.tsx     # 3-step easy sona release roadmap
    │       ├── AuctionNoticeSection.tsx # Urgent auction relief video & lenders strip
    │       ├── FaqSection.tsx         # Interactive collapsible FAQ accordion
    │       ├── PublicFooter.tsx       # Kolkata central/south hubs, phone/whatsapp, staff login link
    │       ├── FloatingActions.tsx    # Desktop floating WhatsApp button & Mobile bottom sticky bar
    │       └── LeadModals.tsx         # Main inquiry popup & quick service inquiry popup
    │
    ├── AdminPanel.tsx                 # 166-line coordinator for admin sub-components
    ├── App.tsx                        # 186-line coordinator for public sub-components
    ├── analytics.ts                   # Event tracking, device detection & IP location telemetry
    └── index.css                      # Design tokens, .admin-tab-active, gold gradients
```

---

## 4. Public Website Features & Components

### 1. Navigation Header (`PublicNavbar.tsx`)
- Top ticker bar streaming live gold rate benchmarks and service alerts.
- MRAJ JEWELERS logo wordmark and jewelers styling.
- Responsive mobile drawer menu for fast navigation on handheld devices.
- Direct quick call button (`tel:+918101121813`) and WhatsApp trigger.

### 2. Hero Section (`HeroSection.tsx`)
- **Cinematic Display Video**: Embedded looping video showcase of authentic jewellery valuation.
- **Headline & Trust Guarantees**: Highlights ₹0 advance fees, live market rates, and direct locker handover.
- **Micro-Metric Cards**: Highlights *1,000 – 2,500+ Families Helped* and *4.9 ★ Google Rating*.

### 3. Core Services (`ServicesSection.tsx`)
- **Card 1: Gold Loan Settlement**: Release locked gold from Muthoot, Manappuram, and banks.
- **Card 2: Sell Old Gold & Silver**: Instant valuation and highest spot counter payout.
- Clicking any card opens a tailored quick inquiry popup.

### 4. Process Roadmap (`ProcessSection.tsx`)
- **Step 01**: Details Share Karein (WhatsApp loan slip).
- **Step 02**: Branch Assistance (Executive visits branch with customer).
- **Step 03**: Gold & Payout Handover (Locker gold handed over & extra cash balance paid).

### 5. Auction Relief & Supported Lenders (`AuctionNoticeSection.tsx`)
- Video alert highlighting auction rescue.
- Quick filter chips for top banks and NBFCs.

### 6. FAQ Section (`FaqSection.tsx`)
- Interactive animated accordion answering common customer queries regarding advance fees, partial release, safety, and paperwork.

### 7. Footer (`PublicFooter.tsx`)
- Address details for Kolkata Central Hub (Bowbazar) and Kolkata South Hub (Gariahat).
- Phone and WhatsApp contact info (`+91 81011 21813`).
- Discreet Staff / Admin Portal link for authorized store operators.

### 8. Floating & Sticky Mobile Bar (`FloatingActions.tsx`)
- Desktop floating circular WhatsApp button (bottom-right).
- Mobile sticky action bar with instant Call (`tel:+918101121813`), WhatsApp, and *"Release Sona"* modal trigger.

---

## 5. Smart Valuation & Settlement Calculator (`LoanCalculatorSection.tsx`)

Supports 3 distinct calculation modes:
1. **Full Cash (`cash`)**:
   $$\text{Market Value} = \text{Grams} \times \text{Live Rate}$$
   $$\text{Net Cash In Hand} = \max(0, \text{Market Value} - \text{Loan Due})$$
2. **Keep Gold (`partial`)**:
   $$\text{Grams to Sell} = \min\left(\text{Grams}, \left\lceil \frac{\text{Loan Due}}{\text{Live Rate}} \right\rceil\right)$$
   $$\text{Grams Returned Home} = \max(0, \text{Grams} - \text{Grams to Sell})$$
3. **Sell Old Gold (`old_gold`)**:
   - Calculates spot cash for physical jewellery, coins, or scrap with 0% deduction.

---

## 6. Staff & Owner Admin Portal (`AdminPanel.tsx`)

Protected by PIN authentication modal (Default: `1234`).
Contains 4 high-powered tabs:
1. **Analytics Tab (`AdminAnalyticsTab.tsx`)**:
   - Total clicks, button interactions, card views, popup opens.
   - Device Breakdown (Mobile vs. Desktop vs. Tablet).
   - Real-time IP & Location Click Tracker (IP address, City, Region, Action, Timestamp).
   - Search bar and city filter dropdown.
2. **Rates Tab (`AdminRatesTab.tsx`)**:
   - Live editable gold rates: 24K, 22K, 20K, 18K, and Silver (per gram).
   - Synchronizes instantly with public website calculator and hero tickers.
   - Reset to market defaults button.
3. **Leads Tab (`AdminLeadsTab.tsx`)**:
   - Customer inquiries with Name, Phone, Lender, Gold Grams, Service Type, Status (New, Contacted, In Progress, Closed).
   - Export all leads to CSV file.
   - Manual "+ Add Lead" modal for counter walk-ins.
4. **Settings Tab (`AdminSettingsTab.tsx`)**:
   - Store helpline phone number and WhatsApp number.
   - Central and South branch addresses.
   - Security PIN management (change master PIN).

---

## 7. Analytics, Device Breakdown & IP Location Tracking

Implemented in `src/analytics.ts`:
- **Event Types**:
  - `page_view`: Tracked on site load.
  - `button_click`: CTA clicks, Call, WhatsApp triggers.
  - `card_click`: Service cards, calculator cards, lender chips.
  - `popup_open`: Calculator modal, inquiry form, admin login.
- **Location Telemetry**:
  - On page load, `initGeoTracking()` queries geolocation service (`ipapi.co`) and caches IP, city, region, country in `sessionStorage`.
  - Every logged event automatically appends the user's IP, City, Region, Device type, and Browser info.
  - Displays directly inside the Admin Analytics table.

---

## 8. Data Models & LocalStorage State Management

| Key | Purpose | Structure |
|-----|---------|-----------|
| `mraj_gold_rates` | Current rates for 24K, 22K, 20K, 18K, Silver | `Record<string, number>` |
| `mraj_customer_leads` | Customer inquiries & counter walk-ins | `CustomerLead[]` |
| `mraj_admin_settings` | Contact numbers, branch addresses, master PIN | `AdminSettings` |
| `mraj_analytics_events` | Click tracking, IP addresses & location logs | `AnalyticsEvent[]` |

---

## 9. Developer Guidelines & AI Prompting Rules

> [!IMPORTANT]
> **CRITICAL USER CONSTRAINTS**:
> 1. **Zero Git Commits Without Permission**: Never execute `git commit` or `git push` without explicit user permission.
> 2. **Project Scope Isolation**: Keep all conversations, edits, and context strictly isolated to **MD ENTERPRISE / MRAJ JEWELERS**. Do not cross-reference or modify other projects.
> 3. **Modular Maintenance**: Always make edits to specific components inside `src/components/admin/` or `src/components/public/`. Do not bloat `App.tsx` or `AdminPanel.tsx`.
> 4. **Active Tab Highlight**: Always use the `.admin-tab-active` CSS class defined in `src/index.css` for gold active states.
> 5. **Contact Number Standard**: All Call and WhatsApp redirect links must point to `+91 81011 21813`.
