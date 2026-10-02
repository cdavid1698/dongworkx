"use client";

import { useSyncExternalStore } from "react";

/** A tiny localStorage-backed store usable from any client component. */
export function createLocalStore<T>(key: string, initial: T, { persist = true }: { persist?: boolean } = {}) {
  let value: T = initial;
  let loaded = false;
  const listeners = new Set<() => void>();

  function load() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    if (!persist) return;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) value = JSON.parse(raw) as T;
    } catch {
      // Storage blocked or corrupt; keep the initial value.
    }
  }

  function get(): T {
    load();
    return value;
  }

  function set(next: T | ((prev: T) => T)) {
    load();
    value = typeof next === "function" ? (next as (prev: T) => T)(value) : next;
    try {
      if (persist) window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota or privacy-mode errors; state still lives in memory.
    }
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      loaded = false;
      load();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function useValue(): T {
    return useSyncExternalStore(subscribe, get, () => initial);
  }

  return { get, set, useValue };
}

const noopSubscribe = () => () => {};

/** True after hydration. Use it to render client-only details without mismatches. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
