// SAMPLE CONTENT (C5): the client approved invented parts, stock and prices for the demo.
// Brand names are deliberately left out. Confirm the real catalogue with the owner.

import type { BranchId } from "./site";

export type PartCategoryId = "fuel" | "ignition" | "cvt" | "brakes" | "fluids" | "electrical" | "suspension" | "performance";

export type PartArt =
  | "injector" | "pump" | "can" | "sensor" | "plug" | "filter" | "belt" | "rollers"
  | "bell" | "pads" | "bottle" | "battery" | "shock" | "piston" | "bulb" | "regulator";

export type Part = {
  slug: string;
  name: string;
  category: PartCategoryId;
  price: number;
  weightKg: number;
  art: PartArt;
  /** Bike ids from content/bikes.ts, or "all" for universal parts. */
  fits: string[] | "all";
  stock: Record<BranchId, number>;
  description: string;
  specs: [string, string][];
  installServiceId?: string;
  sample: true;
};

export const partCategories: { id: PartCategoryId; name: string }[] = [
  { id: "fuel", name: "Fuel injection" },
  { id: "ignition", name: "Air & ignition" },
  { id: "cvt", name: "CVT" },
  { id: "brakes", name: "Brakes" },
  { id: "fluids", name: "Oils & fluids" },
  { id: "electrical", name: "Electrical" },
  { id: "suspension", name: "Suspension" },
  { id: "performance", name: "Performance" },
];

const CLICKS = ["honda-click-125i", "honda-click-160"];
const HONDA_160 = ["honda-click-160", "honda-adv-160", "honda-pcx-160"];
const YAMAHA_155 = ["yamaha-nmax-155", "yamaha-aerox-155"];
const SMALL_SCOOTERS = ["honda-click-125i", "honda-beat-fi", "yamaha-mio-i-125", "yamaha-mio-gear"];

export const parts: Part[] = [
  {
    slug: "fuel-injector-6-hole", name: "Fuel injector, 6-hole", category: "fuel", price: 1450, weightKg: 0.2, art: "injector",
    fits: ["honda-click-125i", "honda-beat-fi"], stock: { gerona: 4, guimba: 2 },
    description: "OEM-spec replacement injector. Fixes hard starting, misfires and poor fuel economy caused by a clogged or leaking injector.",
    specs: [["Holes", "6"], ["Flow rate", "OEM spec"], ["Includes", "O-rings and seal"]], installServiceId: "fi-scan", sample: true,
  },
  {
    slug: "fuel-injector-8-hole-155", name: "Fuel injector, 8-hole (155cc)", category: "fuel", price: 1850, weightKg: 0.2, art: "injector",
    fits: [...YAMAHA_155, "yamaha-sniper-155"], stock: { gerona: 3, guimba: 0 },
    description: "8-hole injector for 155cc Yamahas. Gives a finer spray and a smoother throttle response than a worn stock unit.",
    specs: [["Holes", "8"], ["Flow rate", "OEM spec"], ["Includes", "O-rings and seal"]], installServiceId: "fi-scan", sample: true,
  },
  {
    slug: "fuel-pump-assembly", name: "Fuel pump assembly", category: "fuel", price: 2950, weightKg: 0.6, art: "pump",
    fits: [...CLICKS, "honda-adv-160", "honda-pcx-160"], stock: { gerona: 2, guimba: 1 },
    description: "Complete in-tank pump with strainer and pressure regulator. Fits Honda 125–160cc FI scooters.",
    specs: [["Pressure", "OEM spec"], ["Includes", "Strainer, gasket"], ["Install time", "about 1 h"]], installServiceId: "fuel-pump", sample: true,
  },
  {
    slug: "throttle-body-cleaner", name: "Throttle body & injector cleaner, 300 ml", category: "fuel", price: 280, weightKg: 0.35, art: "can",
    fits: "all", stock: { gerona: 24, guimba: 18 },
    description: "Sensor-safe spray that cuts carbon from throttle bodies and intake valves. The same cleaner we use in the shop.",
    specs: [["Volume", "300 ml"], ["Sensor safe", "Yes"]], sample: true,
  },
  {
    slug: "oxygen-sensor", name: "Oxygen (O2) sensor", category: "fuel", price: 2200, weightKg: 0.15, art: "sensor",
    fits: [...HONDA_160, ...YAMAHA_155], stock: { gerona: 2, guimba: 2 },
    description: "Replaces a lazy O2 sensor that causes high fuel use and a check-engine light.",
    specs: [["Type", "Narrowband, heated"], ["Connector", "OEM plug-in"]], installServiceId: "fi-scan", sample: true,
  },
  {
    slug: "iridium-spark-plug", name: "Iridium spark plug", category: "ignition", price: 650, weightKg: 0.05, art: "plug",
    fits: "all", stock: { gerona: 30, guimba: 20 },
    description: "Fine-wire iridium tip for a stronger spark and longer life than standard nickel plugs. Tell us your bike at checkout and we'll pack the right heat range.",
    specs: [["Electrode", "Iridium"], ["Service life", "up to 3× standard"]], sample: true,
  },
  {
    slug: "air-filter-click", name: "Air filter element, Click", category: "ignition", price: 380, weightKg: 0.25, art: "filter",
    fits: CLICKS, stock: { gerona: 10, guimba: 6 },
    description: "Paper element for Honda Click 125i and 160. Replace every 12,000 km, or sooner on dusty roads.",
    specs: [["Type", "Viscous paper"], ["Interval", "12,000 km"]], installServiceId: "air-filter", sample: true,
  },
  {
    slug: "air-filter-nmax-aerox", name: "Air filter element, NMAX / Aerox", category: "ignition", price: 420, weightKg: 0.25, art: "filter",
    fits: YAMAHA_155, stock: { gerona: 8, guimba: 5 },
    description: "Replacement air filter for Yamaha NMAX 155 and Aerox 155.",
    specs: [["Type", "Viscous paper"], ["Interval", "12,000 km"]], installServiceId: "air-filter", sample: true,
  },
  {
    slug: "drive-belt-click", name: "Drive belt, Click", category: "cvt", price: 1150, weightKg: 0.4, art: "belt",
    fits: CLICKS, stock: { gerona: 5, guimba: 3 },
    description: "Kevlar-reinforced CVT belt. A worn belt slips and steals your top speed.",
    specs: [["Construction", "Kevlar cord"], ["Interval", "about 20,000 km"]], installServiceId: "belt-rollers", sample: true,
  },
  {
    slug: "drive-belt-nmax-aerox", name: "Drive belt, NMAX / Aerox", category: "cvt", price: 1350, weightKg: 0.45, art: "belt",
    fits: YAMAHA_155, stock: { gerona: 4, guimba: 4 },
    description: "Kevlar-reinforced CVT belt for Yamaha 155cc scooters.",
    specs: [["Construction", "Kevlar cord"], ["Interval", "about 20,000 km"]], installServiceId: "belt-rollers", sample: true,
  },
  {
    slug: "racing-roller-set-12g", name: "Racing roller set, 12 g", category: "cvt", price: 450, weightKg: 0.15, art: "rollers",
    fits: [...SMALL_SCOOTERS, ...YAMAHA_155, ...CLICKS], stock: { gerona: 12, guimba: 7 },
    description: "Lighter rollers for quicker take-off. Ask us about weights. We tune them to your riding and load.",
    specs: [["Weight", "12 g × 6"], ["Includes", "Sliders"]], installServiceId: "belt-rollers", sample: true,
  },
  {
    slug: "clutch-bell", name: "Clutch bell", category: "cvt", price: 950, weightKg: 0.9, art: "bell",
    fits: SMALL_SCOOTERS, stock: { gerona: 3, guimba: 2 },
    description: "Replacement clutch bell. Cures judder on take-off when the old bell is glazed or out of round.",
    specs: [["Material", "Cast steel"]], installServiceId: "clutch-service", sample: true,
  },
  {
    slug: "front-brake-pads", name: "Front brake pads", category: "brakes", price: 320, weightKg: 0.1, art: "pads",
    fits: [...SMALL_SCOOTERS, ...CLICKS, ...YAMAHA_155, "yamaha-sniper-155", "suzuki-raider-r150-fi"], stock: { gerona: 16, guimba: 10 },
    description: "Semi-metallic pads that bite well in wet weather and are gentle on rotors.",
    specs: [["Compound", "Semi-metallic"], ["Position", "Front"]], installServiceId: "brake-service", sample: true,
  },
  {
    slug: "brake-fluid-dot4", name: "Brake fluid DOT 4, 500 ml", category: "fluids", price: 260, weightKg: 0.55, art: "bottle",
    fits: "all", stock: { gerona: 14, guimba: 9 },
    description: "High boiling point DOT 4 fluid for disc brakes. Replace every two years.",
    specs: [["Standard", "DOT 4"], ["Volume", "500 ml"]], installServiceId: "brake-flush", sample: true,
  },
  {
    slug: "scooter-oil-10w40", name: "Scooter engine oil 10W-40, 0.8 L", category: "fluids", price: 340, weightKg: 0.85, art: "bottle",
    fits: "all", stock: { gerona: 40, guimba: 30 },
    description: "Semi-synthetic oil made for automatic scooters (JASO MB). The right fill for most 110–160cc scooters.",
    specs: [["Grade", "10W-40"], ["Spec", "JASO MB"], ["Volume", "0.8 L"]], installServiceId: "change-oil", sample: true,
  },
  {
    slug: "gear-oil-120ml", name: "Gear oil, 120 ml", category: "fluids", price: 120, weightKg: 0.15, art: "bottle",
    fits: "all", stock: { gerona: 35, guimba: 25 },
    description: "Final-drive gear oil for scooters. Change it with every second engine oil change.",
    specs: [["Grade", "80W-90"], ["Volume", "120 ml"]], installServiceId: "change-oil", sample: true,
  },
  {
    slug: "mf-battery-12v-5ah", name: "Maintenance-free battery 12V 5Ah", category: "electrical", price: 1350, weightKg: 1.6, art: "battery",
    fits: [...SMALL_SCOOTERS, ...CLICKS, "suzuki-burgman-street"], stock: { gerona: 6, guimba: 4 },
    description: "Sealed battery, ready to fit. FI bikes need a healthy battery to power the pump and ECU at start-up.",
    specs: [["Voltage", "12 V"], ["Capacity", "5 Ah"], ["Type", "Sealed MF"]], installServiceId: "battery-check", sample: true,
  },
  {
    slug: "regulator-rectifier", name: "Regulator / rectifier", category: "electrical", price: 850, weightKg: 0.3, art: "regulator",
    fits: [...SMALL_SCOOTERS, ...CLICKS], stock: { gerona: 3, guimba: 0 },
    description: "Stops overcharging that cooks batteries and bulbs.",
    specs: [["Output", "14.0–14.8 V"]], installServiceId: "charging-system", sample: true,
  },
  {
    slug: "led-headlight-bulb", name: "LED headlight bulb", category: "electrical", price: 750, weightKg: 0.1, art: "bulb",
    fits: [...SMALL_SCOOTERS, "suzuki-raider-r150-fi"], stock: { gerona: 9, guimba: 6 },
    description: "Brighter, whiter light with a correct beam cut-off, so you don't dazzle oncoming riders.",
    specs: [["Colour", "6000 K"], ["Draw", "18 W"]], installServiceId: "wiring", sample: true,
  },
  {
    slug: "adjustable-rear-shock-300", name: "Adjustable rear shock, 300 mm", category: "suspension", price: 3800, weightKg: 2.2, art: "shock",
    fits: SMALL_SCOOTERS, stock: { gerona: 2, guimba: 1 },
    description: "Preload- and rebound-adjustable shock. Set it soft for solo commuting or firm for carrying a passenger and cargo.",
    specs: [["Length", "300 mm"], ["Adjusters", "Preload, rebound"]], installServiceId: "shock-install", sample: true,
  },
  {
    slug: "big-bore-kit-59mm", name: "Big bore kit 59 mm", category: "performance", price: 6500, weightKg: 2.5, art: "piston",
    fits: YAMAHA_155, stock: { gerona: 1, guimba: 0 },
    description: "Takes a 155cc Yamaha to about 170cc. We install it and remap the fuelling so it runs clean on the new displacement.",
    specs: [["Bore", "59 mm"], ["Displacement", "~170 cc"], ["Includes", "Piston, rings, gaskets"]], installServiceId: "bore-up", sample: true,
  },
];

export function getPart(slug: string): Part | undefined {
  return parts.find((p) => p.slug === slug);
}

export function partFitsBike(part: Part, bikeId: string | null): boolean {
  if (!bikeId) return true;
  return part.fits === "all" || part.fits.includes(bikeId);
}
