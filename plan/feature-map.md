# Feature map

**Business model:** hybrid **Appointment service** (repair and FI diagnostics) + **Product retail** (parts, shipped nationwide).
**Primary action:** Book a repair. **Secondary:** Shop parts. **Always available:** Call 0969 029 3899.

## In the demo

| Feature | Why it matters for DongWorkx |
|---|---|
| **FI symptom scanner** (hero widget): pick a symptom, get the likely causes and a recommended service, then book that service | "FI Specialist" is their difference. Most riders can't name the fault, only the symptom ("hirap mag-start", check-engine light). This turns specialist knowledge into a booking. |
| **Booking flow:** branch → service(s) → your bike → date & time → details → confirm, plus an .ics calendar file | Replaces Messenger back-and-forth. Slots come from the real 8 AM–6 PM hours and the service duration. Two branches, so branch is the first choice. |
| **Pay at shop or pay a reservation deposit** (demo checkout) | Riders mostly pay cash after the job. An optional deposit shows the owner how to cut no-shows. |
| **"My bike" selector** that is remembered everywhere (localStorage) | Fitment is the #1 question for parts ("pasok ba sa Click 125?"). Choosing a bike filters the parts catalogue and pre-fills the booking. |
| **Parts catalogue:** categories, filter by bike fitment, product detail pages with a fitment list | Lets riders check price and fit without messaging. |
| **Cart** (drawer + page, persisted), quantity editing, VAT-inclusive totals | Standard retail. Prices in ₱ with VAT shown. |
| **Checkout:** pickup at either branch or nationwide shipping (Luzon / Visayas / Mindanao rates, sample), then payment by Cash (pickup/COD), GCash, Maya, QR Ph, card, or Skyro / Salmon instalments | Shows the full range of confirmed payment methods [C3] and nationwide shipping [C4]. Financing is a strong selling point for higher-value parts. |
| **Instalment estimator** on high-value items ("from ₱x/month via Skyro or Salmon") | Riders compare monthly costs. All figures are sample and labelled "indicative". |
| **Branches page** with live "Open now / Closed" status, map embeds, click-to-call, directions | Two branches. The owner's FB lists "Always open", so showing accurate status builds trust. |
| **Sticky mobile action bar:** Call · Book · Cart | Most traffic will be mobile, coming from FB ads. |
| **Newsletter / promo capture** (demo, no data sent) | Promos and new parts, matching how they already use FB. |
| **FAQ:** warranty, waiting times, financing, shipping, which bikes they work on | Answers the questions that come up on Messenger. |
| **Legal pages** (privacy, terms), templated | Needed for the Data Privacy Act 2012 (RA 10173). Marked as needing legal review. |
| **Demo banner** | Honesty (§0.4). |
| LocalBusiness JSON-LD (×2 branches), sitemap, robots `noindex` | Local SEO structure, ready for the real site. |

## Proposed for the paid build
- Real booking backend (e.g. Cal.com or a custom booking API) with SMS confirmations (Semaphore / Twilio PH).
- Real payments: PayMongo or Xendit (GCash, Maya, QR Ph, cards), and Skyro / Salmon merchant integration.
- Inventory and price management (CMS or a POS sync) so stock is live.
- Courier booking integration (J&T / LBC / Flash) with tracking.
- Google Business Profiles for both branches, plus a review-request flow.
- Analytics and Meta Pixel / Conversions API, so their current FB ads can be measured against bookings.
- Messenger chat plugin.
