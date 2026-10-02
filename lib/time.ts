"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

/** Date and time in Manila (UTC+8, no daylight saving). */
export type ManilaNow = { date: string; minutes: number; weekday: number };

export function manilaNow(at: Date = new Date()): ManilaNow {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: site.timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23", weekday: "short",
  }).formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
    weekday: weekdays.indexOf(get("weekday")),
  };
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export function formatDateLong(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-PH", {
    weekday: "long", day: "numeric", month: "long", timeZone: "UTC",
  });
}

export function formatDateParts(isoDate: string): { weekday: string; day: string; month: string } {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return {
    weekday: d.toLocaleDateString("en-PH", { weekday: "short", timeZone: "UTC" }),
    day: d.toLocaleDateString("en-PH", { day: "numeric", timeZone: "UTC" }),
    month: d.toLocaleDateString("en-PH", { month: "short", timeZone: "UTC" }),
  };
}

export type OpenStatus = { open: boolean; label: string };

export function openStatus(now: ManilaNow): OpenStatus {
  const { open, close } = site.hours;
  if (now.minutes >= open && now.minutes < close) {
    return { open: true, label: `Open now · until ${formatMinutes(close)}` };
  }
  return { open: false, label: `Closed · opens ${formatMinutes(open)}${now.minutes >= close ? " tomorrow" : ""}` };
}

// A minute-resolution clock shared by every component that shows live status.
let cached: ManilaNow | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    timer = setInterval(() => {
      cached = manilaNow();
      listeners.forEach((l) => l());
    }, 30_000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot(): ManilaNow {
  if (!cached) cached = manilaNow();
  return cached;
}

/** Current Manila time, or null during server render and hydration. */
export function useManilaNow(): ManilaNow | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
