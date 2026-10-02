# DongWorkx: demo website

A proposal demo for **DongWorkx**, a motorcycle repair shop, FI (fuel-injection) specialist and motor parts shop in Gerona, Tarlac and Guimba, Nueva Ecija. Prepared by CK David.

Bookings and payments are **simulated**. Nothing is charged, sent or stored outside the visitor's browser.

## Stack
- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4. Design tokens are in `app/globals.css`.
- `next/font` (Saira, JetBrains Mono), `next/image`, `lucide-react`
- No database. State lives in React and `localStorage` (cart, "My bike", demo bookings and orders).

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Environment variables
Copy `.env.example` to `.env.local`. Both are optional.

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_AGENCY_NAME` | Name in the demo banner and footer | `CK David` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and JSON-LD | `http://localhost:3000` |

## Payments (Stripe Mode A, fully static)
There are no keys and no API routes. Checkout and reservation deposits open a simulated payment step:
- **GCash / Maya / QR Ph:** shows a decorative demo code (not scannable) and a "simulate payment" button.
- **Card:** only the test card `4242 4242 4242 4242` is accepted, with any future expiry and any 3-digit CVC. Other numbers are rejected, so real card data is never entered.
- **Skyro / Salmon:** shows indicative monthly amounts (price ÷ months) and a simulated approval.
- **Cash:** pay at pickup or cash on delivery.

## Project layout
```
content/    business facts (with source refs) and sample services, parts, FAQs
lib/        booking.ts, cart.ts, payments.ts, time.ts (Manila time), store.ts
components/ UI. book/ and checkout/ hold the two conversion flows
app/        routes: /, /services, /book, /parts, /parts/[slug], /cart, /checkout, /branches, /faq, /privacy, /terms
research/   sources, business profile, competitors, image credits
plan/       feature map, sitemap, design plan
```

## Deploy (Vercel)
1. Import the GitHub repo in Vercel (framework: Next.js, default settings), or run `npx vercel` from this folder.
2. Set `NEXT_PUBLIC_SITE_URL` to the deployment URL (and optionally `NEXT_PUBLIC_AGENCY_NAME`).
3. The site is already `noindex` (`robots` metadata and `app/robots.ts`), so the demo won't compete with the business in search.
