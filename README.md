# Billing System Frontend

A modern billing and invoicing frontend built with Next.js.

This application provides the internal billing dashboard and customer-facing invoice portal.

## Stack

- Next.js
- React
- Tailwind CSS

## Authentication

Authentication relies on the external Authentication-as-a-Service (AaaS).

The frontend stores the access token and uses it to communicate with the Laravel API.

AaaS repository: https://github.com/patrick-rakotoharilalao/auth-service-project

## Features

- Dashboard overview
- Client management UI
- Invoice management UI
- Customer invoice portal
- Stripe payment flow integration

## Environment Variables

Create an `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_AAAS_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_AAAS_API_KEY=
```

## Installation 
```bash
git clone https://github.com/billing-saas/billing-system-ui
cd billing-system-frontend

npm install
```

## Run the project

```bash
npm run dev
```

The frontend will be available at:
```
http://localhost:3000
```

## Backend dependency

This frontend requires:

the Laravel API running locally
the external AaaS service running locally

AaaS repository: https://github.com/patrick-rakotoharilalao/auth-service-project