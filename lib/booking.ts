"use client";

// Booking service module. The demo generates plausible availability locally.
// In the paid build, swap getSlots/submitBooking for a real booking API (e.g. Cal.com).

import { site, type BranchId, getBranch } from "@/content/site";
import { getService, type Service } from "@/content/services";
import { createLocalStore } from "./store";
import { addDays, manilaNow } from "./time";

export const SLOT_STEP = 30;
export const BOOKING_WINDOW_DAYS = 14;

export type Slot = { minutes: number; available: boolean };

export type BookingDraft = {
  branch: BranchId | null;
  serviceIds: string[];
  bikeId: string | null;
  bikeOther: string;
  date: string | null;
  minutes: number | null;
  name: string;
  mobile: string;
  notes: string;
  payment: "at-shop" | "deposit";
};

export type Booking = BookingDraft & {
  id: string;
  branch: BranchId;
  date: string;
  minutes: number;
  totalMinutes: number;
  estimate: number;
  createdAt: string;
};

export function selectedServices(ids: string[]): Service[] {
  return ids.map(getService).filter((s): s is Service => Boolean(s));
}

export function totals(ids: string[]) {
  const list = selectedServices(ids);
  return {
    minutes: list.reduce((sum, s) => sum + s.minutes, 0),
    price: list.reduce((sum, s) => sum + s.price, 0),
    hasFrom: list.some((s) => s.priceFrom),
  };
}

export function bookableDates(): string[] {
  const today = manilaNow().date;
  return Array.from({ length: BOOKING_WINDOW_DAYS }, (_, i) => addDays(today, i));
}

// Deterministic hash so the same slot is always "taken" across renders.
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function getSlots(branch: BranchId, date: string, durationMinutes: number): Slot[] {
  const { open, close } = site.hours;
  const now = manilaNow();
  // Jobs should finish by closing. Long jobs (overhauls) are morning drop-offs, so keep at least a 2-hour start window.
  const lastStart = close - Math.min(Math.max(durationMinutes, SLOT_STEP), close - open - 120);
  const slots: Slot[] = [];
  for (let m = open; m <= lastStart; m += SLOT_STEP) {
    const past = date === now.date && m < now.minutes + 30;
    const taken = hash(`${branch}|${date}|${m}`) % 10 < 3;
    slots.push({ minutes: m, available: !past && !taken });
  }
  return slots;
}

const bookingsStore = createLocalStore<Booking[]>("dw-bookings", []);

/** Simulated submit. Nothing leaves the browser. */
export async function submitBooking(draft: BookingDraft, id: string): Promise<Booking> {
  if (!draft.branch || !draft.date || draft.minutes === null) throw new Error("Booking is incomplete");
  const t = totals(draft.serviceIds);
  const booking: Booking = {
    ...draft,
    id,
    branch: draft.branch,
    date: draft.date,
    minutes: draft.minutes,
    totalMinutes: t.minutes,
    estimate: t.price,
    createdAt: new Date().toISOString(),
  };
  await new Promise((r) => setTimeout(r, 600));
  bookingsStore.set((prev) => [booking, ...prev].slice(0, 20));
  return booking;
}

function icsDate(date: string, minutes: number): string {
  // Manila is UTC+8 all year.
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCMinutes(minutes - 8 * 60);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function icsEscape(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function bookingIcs(booking: Booking): string {
  const branch = getBranch(booking.branch);
  const names = selectedServices(booking.serviceIds).map((s) => s.name).join(", ");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DongWorkx//Booking demo//EN",
    "BEGIN:VEVENT",
    `UID:${booking.id}@dongworkx.demo`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART:${icsDate(booking.date, booking.minutes)}`,
    `DTEND:${icsDate(booking.date, booking.minutes + Math.max(booking.totalMinutes, 30))}`,
    `SUMMARY:${icsEscape(`DongWorkx ${branch.town}: ${names}`)}`,
    `LOCATION:${icsEscape(`${branch.street}, ${branch.locality}`)}`,
    `DESCRIPTION:${icsEscape(`Booking ${booking.id}. Questions? Call ${site.phone}.`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(booking: Booking) {
  const blob = new Blob([bookingIcs(booking)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dongworkx-${booking.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
