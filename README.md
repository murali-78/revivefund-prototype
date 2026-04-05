# ReviveFund — Green Health & Climate Startup Revival

A presentation-level prototype for backing struggling startups and low-performing ventures. Built with Next.js 14, TypeScript, TailwindCSS, Prisma + SQLite, Recharts, and react-leaflet.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up database
npm run prisma:migrate
npm run prisma:seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📋 Demo Accounts

All seeded accounts use password: `demo1234`

- **Backer**: `backer@revivefund.demo` — View ventures, pledge rSOL, adopt startups
- **Owner**: `owner@revivefund.demo` — Manage ventures, accept expert offers
- **Expert**: `expert@revivefund.demo` — Create expert offers, help ventures

## 🎯 Core Features

### 1. AI venture Health Analyzer
Rules-based scorer that evaluates:
- Revenue vs. expenses trends
- Funding progress
- Emergency flags
- Recovery probability
- Risk assessment

**Location**: venture profile pages (`/b/[slug]`)

### 2. Revival Funding Models
Four funding types:
- **Donation** — Pure support, no return
- **Investment** — Profit-share model
- **Revenue-based return** — Percentage of revenue
- **Rewards** — Perks and recognition

**Location**: venture profile → "Back this Revival" button

### 3. Transparency Dashboard
Real-time visibility into:
- Fund usage breakdown (pie chart)
- Revenue vs. expenses (6-month area chart)
- Activity log (pledges, milestones, updates)
- Live Revival timeline (Day 1/7/30/60 milestones)

**Location**: `/b/[slug]/dashboard`

### 4. Community Revival System
- Experts create offers with rSOL rewards
- ventures accept offers
- Contributors earn rSOL by supporting expert-led startups

**Location**: `/community`

### 5. Adopt a venture
- Pick a venture to actively support
- Complete tasks (share, review, engage)
- Earn rSOL and boost Revival Score

**Location**: `/adopt`

### 6. Investor Risk Score
Shown on every venture card:
- Recovery probability (0–100%)
- Risk level (Low/Moderate/Elevated/Critical)
- Recommended pledge range

**Location**: Home page, venture cards, profiles

### 7. Live Revival Timeline
Milestone tracking:
- Day 1: Campaign launch
- Day 7: First operational changes
- Day 30: Mid-point check-in
- Day 60: Recovery assessment

**Location**: venture dashboard

## 🗺️ Pages

- `/` — Home: Urgency-ranked ventures, AI suggestions
- `/b/[slug]` — venture profile: Before/after slider, funding options, health analysis
- `/b/[slug]/dashboard` — Transparency dashboard: Charts, logs, timeline
- `/map` — Geographic view: OpenStreetMap with venture locations, filters
- `/adopt` — Adopt a venture: Pick startups, earn rSOL
- `/community` — Expert marketplace: Offers, acceptances, rewards
- `/success` — Success stories: High revival score ventures
- `/auth` — Login/Register: Simple email+password auth
- `/me` — Profile: Role switching, contributions, adoptions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v3
- **Database**: Prisma + SQLite
- **Charts**: Recharts
- **Maps**: react-leaflet (OpenStreetMap tiles)
- **Auth**: Cookie-based sessions (demo mode)
- **Icons**: lucide-react

## 📊 Demo Token: rSOL

**Important**: rSOL is a **fake in-app demo token**. It is:
- ❌ Not real Solana
- ❌ Not real cryptocurrency
- ❌ Not real money
- ✅ A simulation for demo purposes only

All funding actions update the database and UI instantly, but no real transactions occur.

## 🎨 Design Philosophy

- **Non-generic copy**: Real product voice, minimal fluff
- **Startup-real vibe**: Professional but approachable
- **Dark theme**: Modern, focused UI
- **Glass morphism**: Subtle depth and elevation
- **Data-driven**: Charts, scores, and metrics front and center

## 📦 Seed Data

The seed script (`prisma/seed.js`) creates:
- 12 ventures across categories (Cafe, Restaurant, SaaS, Fitness, etc.)
- 3 demo users (Backer, Owner, Expert)
- Sample contributions, updates, expert offers, and adoptions

Run `npm run prisma:seed` to reset and reseed the database.

## 🔧 Development

```bash
# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Generate Prisma client
npx prisma generate

# Start dev server
npm run dev

# Build for production
npm run build
npm start
```

## 📝 5-Minute Demo Flow

1. **Home page** (`/`)
   - See urgency-ranked ventures
   - Notice AI-backed scoring
   - Click a venture card

2. **venture profile** (`/b/[slug]`)
   - Review Revival story
   - Drag the before/after slider
   - Click "Back this Revival"
   - Pledge 500 rSOL (Donation type)
   - See funding bar update

3. **Dashboard** (`/b/[slug]/dashboard`)
   - View revenue vs. expenses chart
   - Check fund usage pie chart
   - Read activity log (your pledge appears)
   - Review Revival timeline

4. **Map** (`/map`)
   - See ventures on OpenStreetMap
   - Filter by category or emergency status
   - Click markers for quick info

5. **Adopt** (`/adopt`)
   - Sign in as `backer@revivefund.demo` / `demo1234`
   - Click "Adopt this venture" on any card
   - See adoption appear in your profile

6. **Community** (`/community`)
   - Sign in as `expert@revivefund.demo` / `demo1234`
   - Create an expert offer
   - Sign in as `owner@revivefund.demo` / `demo1234`
   - Accept the offer

7. **Success stories** (`/success`)
   - See ventures with high revival scores
   - Filter by recovery probability

8. **Profile** (`/me`)
   - View your contributions
   - See adoptions and earned rSOL
   - Switch roles using different demo accounts

## 🎯 Key Differentiators

- **Rules-based AI scorer** (ready for LLM swap)
- **Multiple funding models** (donation, investment, revenue-share, rewards)
- **Transparency-first** (charts, logs, timelines)
- **Community-driven** (experts, adoptions, rSOL rewards)
- **Geographic view** (map with filters)
- **Before/after visual transformation** (image slider)

## 📄 License

Demo prototype — built for product conversations, not real capital allocation.

---

**Built with ❤️ for Green Health & Climate Startup Revival.**
