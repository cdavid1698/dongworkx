// SAMPLE CONTENT (C5): the client approved invented services and prices for the demo.
// Confirm the real menu and prices with the owner before going live.

export type ServiceCategoryId = "fi" | "maintenance" | "cvt" | "electrical" | "brakes" | "engine";

export type Service = {
  id: string;
  category: ServiceCategoryId;
  name: string;
  summary: string;
  minutes: number;
  price: number;
  priceFrom?: boolean;
  sample: true;
};

export const serviceCategories: { id: ServiceCategoryId; name: string; intro: string }[] = [
  { id: "fi", name: "Fuel injection & diagnostics", intro: "Our speciality. We scan the ECU first, so you only pay for the fix your bike needs." },
  { id: "maintenance", name: "Preventive maintenance", intro: "Regular service keeps an FI bike starting first time and sipping fuel." },
  { id: "cvt", name: "CVT & transmission", intro: "Belts, rollers and clutch work for scooters that feel slow or shudder on take-off." },
  { id: "electrical", name: "Electrical", intro: "Batteries, charging and wiring. FI systems need steady voltage to run right." },
  { id: "brakes", name: "Brakes & suspension", intro: "Stopping power and a steady ride for the highway." },
  { id: "engine", name: "Engine work", intro: "Overhauls and performance builds, done in the shop by appointment." },
];

export const services: Service[] = [
  { id: "fi-scan", category: "fi", name: "FI diagnostic scan", summary: "Read and clear ECU fault codes, check sensors and live data.", minutes: 30, price: 350, sample: true },
  { id: "injector-cleaning", category: "fi", name: "Injector cleaning", summary: "Ultrasonic clean and spray-pattern test, new O-rings fitted.", minutes: 60, price: 800, sample: true },
  { id: "throttle-body", category: "fi", name: "Throttle body cleaning & idle reset", summary: "Clean the throttle body and idle valve, then relearn the idle with the scanner.", minutes: 45, price: 500, sample: true },
  { id: "fi-tuneup", category: "fi", name: "FI tune-up package", summary: "Scan, injector clean, throttle body clean, air filter and spark plug check.", minutes: 120, price: 1500, sample: true },
  { id: "fuel-pump", category: "fi", name: "Fuel pump test & replacement", summary: "Pressure test the pump. Labour only, parts quoted after testing.", minutes: 60, price: 600, sample: true },

  { id: "change-oil", category: "maintenance", name: "Change oil & gear oil", summary: "Drain, refill and check for leaks. Labour, oil sold separately.", minutes: 30, price: 200, sample: true },
  { id: "pms", category: "maintenance", name: "Periodic maintenance service", summary: "Full check of brakes, chain or belt, lights, filters, tyres and fluids.", minutes: 90, price: 900, sample: true },
  { id: "air-filter", category: "maintenance", name: "Air filter replacement", summary: "Swap the element and clean the airbox.", minutes: 15, price: 100, sample: true },

  { id: "cvt-cleaning", category: "cvt", name: "CVT cleaning", summary: "Strip, clean and inspect the pulley, belt, rollers and clutch.", minutes: 60, price: 450, sample: true },
  { id: "belt-rollers", category: "cvt", name: "Belt & roller replacement", summary: "Fit a new drive belt and rollers. Labour only.", minutes: 60, price: 500, sample: true },
  { id: "clutch-service", category: "cvt", name: "Clutch lining & bell service", summary: "Fix judder and slipping on take-off.", minutes: 60, price: 500, sample: true },

  { id: "battery-check", category: "electrical", name: "Battery test & charging", summary: "Load test the battery and recharge, or replace if needed.", minutes: 30, price: 150, sample: true },
  { id: "charging-system", category: "electrical", name: "Charging system check", summary: "Test the stator, regulator and rectifier.", minutes: 45, price: 350, sample: true },
  { id: "wiring", category: "electrical", name: "Wiring & lighting repair", summary: "Trace faults, repair harnesses and fit lights.", minutes: 60, price: 400, priceFrom: true, sample: true },

  { id: "brake-service", category: "brakes", name: "Brake pads & caliper cleaning", summary: "New pads fitted, caliper pistons cleaned and lubricated.", minutes: 45, price: 350, sample: true },
  { id: "brake-flush", category: "brakes", name: "Brake fluid flush", summary: "Replace old fluid and bleed the system.", minutes: 30, price: 300, sample: true },
  { id: "shock-install", category: "brakes", name: "Rear shock install", summary: "Fit and set up an aftermarket rear shock.", minutes: 30, price: 250, sample: true },

  { id: "top-overhaul", category: "engine", name: "Top overhaul", summary: "Valves, gaskets and a cylinder head refresh. Drop the bike off in the morning.", minutes: 480, price: 3500, priceFrom: true, sample: true },
  { id: "bore-up", category: "engine", name: "Big bore kit install", summary: "Fit the kit, then remap fuelling for the new displacement.", minutes: 300, price: 2500, priceFrom: true, sample: true },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
