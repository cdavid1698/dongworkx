# DongWorkx demo site

Proposal demo for DongWorkx (motorcycle repair, FI specialist, motor parts) in Gerona, Tarlac and Guimba, Nueva Ecija. Prepared by CK David.

@AGENTS.md

## Rules for this project
- Every business fact comes from `research/sources.md` (S# = public source, C# = client-confirmed). Never add a fact without a source.
- Services, parts, prices, FAQs and the symptom guide are **sample content** (`sample: true`), approved for the demo by the client (C5).
- Copy and data live in `content/`. Components read from there; don't hard-code business facts in components.
- Flow logic sits behind `lib/booking.ts`, `lib/cart.ts` and `lib/payments.ts` so the paid build can swap in real backends.
- Payments are Mode A (simulated). The card form only accepts the test card 4242 4242 4242 4242.
- Design tokens are in `app/globals.css` and documented in `plan/design-plan.md`. Lime (`fi`) is only used on ink backgrounds.
- The site is `noindex` (metadata + robots.ts) because it is a demo.
