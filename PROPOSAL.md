# Website proposal: DongWorkx

Prepared by CK David · 2 October 2026

## 1. About DongWorkx
DongWorkx is a motorcycle repair centre and motor parts shop run by Brando Ramones, with two branches:

- **Gerona:** Mac Arthur Highway, Purok Ilang Ilang, Brgy. Magaspac, Gerona, Tarlac
- **Guimba:** Provincial Road, Saranay District, Guimba, Nueva Ecija

Both branches are open 8 AM to 6 PM. Customers can pay with cash, GCash, Maya, QR Ph, card, or Skyro and Salmon instalments, and parts ship nationwide. The brand calls itself the **FI Specialist**: the shop that can diagnose and fix the fuel-injection problems on today's scooters. Their Facebook page has 6.5K followers, dates from 2017 and is currently running ads.

## 2. Where things stand online
| Finding | Evidence | Why it matters |
|---|---|---|
| No website | Facebook is the only presence. The page's "website" field links to the owner's personal profile. | Ad clicks land on a Facebook page, where every booking and price check becomes a Messenger chat. |
| Not on Google Maps | No Google Business Profile found for either branch. | Riders searching "motorcycle repair Gerona" or "FI repair Guimba" find the dealers (Guanzon in the same barangay, Premio in Guimba) instead. |
| Hours listed as "Always open" | Facebook About section | Riders who turn up after 6 PM find the shop closed, which costs trust. |
| No way to book online | — | Bookings depend on someone replying to messages during work hours. |
| No parts catalogue | — | "Pasok ba sa Click ko?" means a message, a wait, and often a lost sale. |
| No reviews collected anywhere | No rating on any platform | Competitors with ratings win the comparison. |

## 3. What the new site does
It is built around the two things DongWorkx sells:

- **Book a repair:** six short steps (branch → services → bike → time → details → confirm). Times come from the real 8–6 hours and how long each job takes. Riders can pay at the shop or leave a small deposit to lock the slot. They get a booking number and an "Add to calendar" file.
- **The FI symptom scanner** is the centrepiece of the home page. A rider taps what their bike is doing ("Hard to start", "Check-engine light on"…). The scanner shows the likely causes and the right service with its price, and one tap books it. It turns the "FI Specialist" claim into something the rider can try.
- **Parts counter:** riders set their bike once and the shop only shows parts that fit. Each part shows stock at each branch, monthly instalment estimates, and a "Book fitting" link. Checkout covers branch pickup or nationwide shipping, and every payment method DongWorkx accepts.
- **Built for phones:** riders mostly arrive from Facebook on mobile. Call, Book and Cart are always one tap away in a bar at the bottom of the screen.
- **Trust near every decision:** live "Open now" status for each branch, real addresses with directions, and the Facebook following. Reviews will appear once they are collected.
- **Local SEO groundwork:** structured data for both branches, one clear heading per page, and consistent name, address and phone. The demo itself is hidden from search engines.

## 4. Demo vs full build
| Area | In this demo | In the paid build |
|---|---|---|
| Bookings | Simulated availability, stored in the browser | Real calendar per branch and bay (e.g. Cal.com or custom), SMS confirmations and reminders |
| Payments | Simulated GCash/Maya/QR/card/Skyro/Salmon steps | PayMongo or Xendit for GCash, Maya, QR Ph and cards; Skyro and Salmon merchant checkout |
| Parts & stock | Sample catalogue of 21 parts | Real catalogue, live stock per branch, owner-editable CMS or POS sync |
| Shipping | Sample regional rates | Courier integration (J&T / LBC / Flash) with tracking |
| Content | Sample services, prices and FAQs | Owner-supplied menu, real shop photos and logo file |
| Growth | — | Google Business Profiles for both branches, review requests, analytics, Meta Pixel to measure their FB ads against bookings |
| Hosting | Vercel preview | Production hosting, custom domain, email |

## 5. Content to confirm with the client
All of the following is **sample content**, with the client's approval for the demo:
- The full service menu, durations and labour prices (`content/services.ts`)
- The parts catalogue: names, prices, stock, fitment, specs (`content/parts.ts`)
- The bike models they work on (`content/bikes.ts`)
- The symptom guide wording in the FI scanner (`content/symptoms.ts`)
- FAQ answers on walk-ins, warranty (30 days labour), own parts (`content/faqs.ts`)
- Shipping rates and the ₱3,000 free-shipping threshold, the ₱200 booking deposit, and the ₱1,500 financing minimum (`content/site.ts`)
- Return policy (7 days) and other terms in `/terms`
- Privacy notice and terms are templates and **need review by a Philippine lawyer**
- Whether DongWorkx is VAT-registered (prices are shown VAT-inclusive at 12%)

Images:
- The DongWorkx banner (from the agency brief). **Confirm permission to use it.**
- The logo in the header is a type-set recreation. We need the owner's vector logo file.
- Part illustrations are original SVGs. Real product photos would replace them in the full build.

## 6. Open questions
1. Are both branches open 8–6 **every day**, or closed on Sundays or holidays?
2. Does Guimba use the same number (0969 029 3899)? An older number, 0922 698 3234, appears in a search index.
3. Which scanner and FI services does the shop actually offer (ECU remap, injector testing)?
4. Which courier do they use for nationwide shipping?
5. Can we use photos and reels from their Facebook page?

## 7. Next steps
1. Walk the owner through the demo on their phone, starting with the FI scanner, then a booking, then a parts order.
2. Collect the real service menu, price list, parts list, logo file and photos.
3. Set up Google Business Profiles for both branches (a quick win, even before launch).
4. Agree scope and integrations for the full build (payments, booking calendar, SMS, courier).
