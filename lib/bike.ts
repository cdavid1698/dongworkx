"use client";

import { createLocalStore } from "./store";

/** The rider's bike, remembered across the shop and booking. */
const bikeStore = createLocalStore<string | null>("dw-bike", null);

export const useMyBike = bikeStore.useValue;
export const setMyBike = (id: string | null) => bikeStore.set(id);

const pickerStore = createLocalStore<boolean>("dw-bike-picker", false, { persist: false });
export const useBikePickerOpen = pickerStore.useValue;
export const setBikePickerOpen = (open: boolean) => pickerStore.set(open);
