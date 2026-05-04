# billing-system-ui

> Next.js frontend for the Facturo billing system — a clean, modern interface for managing clients, invoices, and payments.

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** — styling
- **shadcn/ui** — component library
- **TanStack Query** — data fetching & caching
- **Zustand** — global state management
- **React Hook Form + Zod** — forms & validation
- **Recharts** — dashboard charts
- **Axios** — HTTP client

---

## Prerequisites

- Node.js >= 18
- [billing-system-api](https://github.com/billing-saas/billing-system-api) running locally
- [AaaS](https://github.com/patrick-rakotoharilalao/auth-service-project) running locally

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/billing-saas/billing-system-ui.git
cd billing-system-ui

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start the development server
npm run dev
```

---

## Environment Variables

```env
# Laravel API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# AaaS — https://github.com/patrick-rakotoharilalao/auth-service-project
NEXT_PUBLIC_AAAS_BASE_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_AAAS_API_KEY=your_aaas_api_key
```

---

## Project Structure

```
billing-system-ui/
├── app/
│   ├── (auth)/              # Public pages: login, register
│   ├── (dashboard)/         # Protected pages: dashboard, clients, invoices, settings
│   └── (public)/            # Public pages without auth: payment-success
├── components/
│   ├── ui/                  # Reusable presentational components (shadcn + custom)
│   └── features/            # Business-specific components
│       ├── clients/
│       ├── invoices/
│       ├── dashboard/
│       └── layout/
├── hooks/                   # TanStack Query hooks
├── lib/
│   ├── api/                 # API functions per domain
│   ├── axios.ts             # Configured Axios instance
│   └── validations/         # Zod schemas
├── stores/                  # Zustand stores
└── types/                   # TypeScript types
```

---

## Authentication Flow

Authentication is handled entirely by the external [AaaS](https://github.com/patrick-rakotoharilalao/auth-service-project).

```
Register:   Next.js → Laravel /auth/register → AaaS /auth/register + /auth/grant-access
Login:      Next.js → AaaS /auth/login (direct)
API calls:  Next.js → Laravel API (with JWT Bearer token)
            Laravel → AaaS /auth/verify (on every protected request)
```

The JWT is stored in a cookie via Zustand `persist` middleware, making it accessible to the Next.js `proxy.ts` route guard.

---

## Pages

| Route | Description | Auth |
|-------|-------------|------|
| `/login` | Login page | Public |
| `/register` | Registration page | Public |
| `/dashboard` | Stats overview | Protected |
| `/clients` | Client list | Protected |
| `/clients/new` | Create client | Protected |
| `/clients/[id]` | Client detail | Protected |
| `/clients/[id]/edit` | Edit client | Protected |
| `/invoices` | Invoice list | Protected |
| `/invoices/new` | Create invoice | Protected |
| `/invoices/[id]` | Invoice detail | Protected |
| `/invoices/[id]/edit` | Edit invoice | Protected |
| `/settings` | User profile & preferences | Protected |
| `/payment-success/[id]` | Post-payment confirmation | Public |
