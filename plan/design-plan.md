# Design plan: DongWorkx

## 1. Audience & primary job
Riders in Gerona, Guimba and nearby towns, mostly arriving on a phone from a Facebook ad or post. Many are commuters or delivery and tricycle riders whose bike is their income. They arrive **anxious and in a hurry**: the bike is hard to start, the check-engine light is on, it's burning fuel. They want to know three things: *can you fix it, how much, when*. A second group of enthusiasts arrives **excited** to shop for parts and upgrades for their Click, NMAX or Aerox.
**Primary job:** book a repair slot at the right branch in under a minute. **Secondary:** check that a part fits my bike and buy it.

## 2. Subject grounding
- **Vernacular:** FI, ECU, injector, throttle body, "check engine", CVT, bola (rollers), panggilid, change oil, tune-up, "pasok ba sa Click?", Taglish.
- **Materials and environment:** a highway-side shop on MacArthur Hwy. Steel roller shutters, rubber mats, chrome parts, brake rotors, diagnostic scanners plugged into a scooter's coupler. Sticker culture: racing decals on helmets and body panels.
- **Brand:** the existing banner is a chrome/red/lime **racing sticker** with a white die-cut outline over purple and teal rotor art. The owner will recognise themselves only if that sticker energy survives. I'm refining the brand, not replacing it.

## 3. Colour tokens

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `ink` | `#16121F` | Violet-black from the banner shadows. Header, hero and scanner backgrounds | white on ink 18.4:1 |
| `steel` | `#EEF0F3` | Cool garage-floor grey page background (not cream) | ink on steel 16.1:1 |
| `workx` | `#D7261E` | "Workx" red. Primary CTA fill and price highlights | white on workx 5.0:1 ✓ |
| `workx-deep` | `#A81A14` | Red for text/links on light backgrounds | on steel 6.5:1 ✓ (plain `workx` on steel is only 4.4:1, so it is never used for text) |
| `fi` | `#C9F23D` | "FI Specialist" lime. **Used only on ink** for scanner readouts and focus rings on dark | lime on ink 14.2:1 ✓ (never on light) |
| `rotor` | `#5B3FD1` | Banner purple. Secondary accents, active filter chips, graphics | white on rotor 6.8:1 ✓; rotor on steel 6.0:1 ✓ |

Body text on steel is `ink` at 100% or `#4A4558` (8.1:1) for muted text.

## 4. Type
- **Saira** (variable, `wdth` axis) for everything else. Display uses condensed width (wdth 62–75), weight 800, with a slight `skew(-8deg)` on the hero headline only, echoing the logo's italic racing lettering. Body uses normal width, weight 400/500, 16–17px, line-height 1.55, max ~68ch.
- **JetBrains Mono** for data only: the scanner readout, part numbers, durations, prices in tables, fault codes.
- **Scale** (mobile → desktop): 14 / 16 / 18 / 22 / 28→36 / 40→64 (hero).

## 5. Layout concept

**Home, mobile (375):**
```
┌───────────────────────────┐
│ [logo]        [My bike][🛒]│  ink header
├───────────────────────────┤
│ FUEL-INJECTION PROBLEMS,  │  ink hero; condensed skewed display
│ FIXED RIGHT.              │
│ Gerona & Guimba · 8AM–6PM │
│ [ Book a repair ] [Parts] │
│ ┌─ FI SCANNER ──────────┐ │  lime-on-ink "screen" with die-cut
│ │ > Select symptom      │ │  white sticker outline
│ │ (Hard start)(Rough…)  │ │
│ │ READING… causes…      │ │
│ │ [Book: FI diagnostic] │ │
│ └───────────────────────┘ │
├───────────────────────────┤
│ ● Gerona   OPEN · til 6PM │  branch strip on steel
│ ● Guimba   OPEN · til 6PM │
├───────────────────────────┤
│ Services list (rows, not  │  ruled rows: name / mins / from ₱
│ cards): name   45m  ₱650  │
├───────────────────────────┤
│ Parts for: [Click 125i ▾] │  horizontal scroll of part tiles
├───────────────────────────┤
│ 1 Pick branch 2 Pick time │  real 3-step sequence, numbered
│ 3 Ride in                 │
├───────────────────────────┤
│ Pay your way: logos row   │  Cash GCash Maya QR Card Skyro Salmon
│ Ships nationwide          │
├───────────────────────────┤
│ footer                    │
├───────────────────────────┤
│ [Call] [Book a repair][🛒]│  sticky action bar
└───────────────────────────┘
```

**Home, desktop (1440):** the hero is a 12-column grid. Headline and CTAs take 7 columns on the left; the scanner takes 5 columns on the right, tilted 2° like a sticker on a toolbox. The branch strip is two columns side by side. The services section has category tabs on the left (sticky) and ruled price rows on the right. Parts sit in a 4-column grid. Content is centred in a container with a max width of 1200px.

**Booking flow (mobile → desktop):**
```
mobile                         desktop
┌──────────────────┐          ┌───────────────────────────┬───────────┐
│ Step 2 of 6 ▓▓░░ │          │ progress: Branch·Service… │ SUMMARY   │
│ Choose services  │          │ step content              │ Gerona    │
│ [✓] FI cleaning  │          │                           │ FI clean  │
│ [ ] Change oil   │          │                           │ 60 min    │
│ ─────────────────│          │                           │ ₱1,200    │
│ 60 min · ₱1,200  │ sticky   │ [Back]        [Continue]  │ (sticky)  │
│ [Back][Continue] │ footer   └───────────────────────────┴───────────┘
└──────────────────┘
```
Alignment: on mobile, all flow content is left-aligned in a single column with the running total pinned to the bottom. On desktop, the summary sits in a sticky right rail.

## 6. Signature element
**The FI scanner.** It's a diagnostic-tool screen in the hero, drawn with lime JetBrains Mono on ink inside a white die-cut sticker outline, like the logo. The rider taps a symptom chip, and the screen "reads" the fault: a short typed-out line, then the likely causes, then a recommended service with price and duration. A "Book this" button carries the service into `/book` already selected. This is the one orchestrated motion moment, and it only plays in response to a tap. Under `prefers-reduced-motion` the result appears instantly.
It fits because "FI Specialist" is the claim on their logo, and the scanner *demonstrates* it rather than stating it.

Everything else stays quiet: ruled rows instead of cards, flat steel surfaces, no gradients, no hover lift.

## 7. Imagery
- The DongWorkx banner (client asset) is used as the hero background texture at low opacity behind the ink, and its logo crop is used in the header.
- Hand-built **SVG part illustrations**, one per category (injector, spark plug, CVT roller set, belt, brake pad, oil bottle, battery, rotor, shock, air filter), in a consistent line style with a `rotor` fill. Parts don't get fake "product photos".
- Payment method marks are shown as **text wordmark chips** (not copied brand logos) to avoid trademark misuse in the demo.
- If any public stock photo is used (e.g. a mechanic at work on Unsplash/Pexels), the photographer and licence are recorded in image-credits.md.

## 8. Self-review: "would I make this plan for any other motorcycle shop?"
- *Hero headline "Your trusted motorcycle shop"*. Yes, generic. **Revised:** led with the FI claim and both town names.
- *Card grid of services with icons*. Yes, every shop site has this. **Revised:** ruled price rows using mono durations and prices, like a shop price board.
- *Dark + neon accent palette*. This is close to the "near-black + acid green" AI tell. **Revised:** the base is the banner's violet-black and not pure black. Lime is restricted to the scanner and FI-related readouts only. The main action colour is the brand red, and steel-grey light sections carry most of the content. This palette is lifted directly from the owner's existing logo.
- *Generic "pick a bike" filter*. Most parts sites have one. **Kept, but made personal:** a "My bike" chip in the header remembers the bike and carries it into booking.
- *Removed one accessory:* I had planned a diagonal "racing stripe" divider between sections. I cut it, because the sticker scanner is enough boldness.
