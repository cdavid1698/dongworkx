// SAMPLE CONTENT (C5): popular FI models in the Philippines. Confirm which ones the shop works on.

export type Bike = { id: string; make: string; model: string };

export const bikes: Bike[] = [
  { id: "honda-click-125i", make: "Honda", model: "Click 125i" },
  { id: "honda-click-160", make: "Honda", model: "Click 160" },
  { id: "honda-beat-fi", make: "Honda", model: "BeAT FI" },
  { id: "honda-adv-160", make: "Honda", model: "ADV 160" },
  { id: "honda-pcx-160", make: "Honda", model: "PCX 160" },
  { id: "yamaha-mio-i-125", make: "Yamaha", model: "Mio i 125" },
  { id: "yamaha-mio-gear", make: "Yamaha", model: "Mio Gear" },
  { id: "yamaha-nmax-155", make: "Yamaha", model: "NMAX 155" },
  { id: "yamaha-aerox-155", make: "Yamaha", model: "Aerox 155" },
  { id: "yamaha-sniper-155", make: "Yamaha", model: "Sniper 155" },
  { id: "suzuki-raider-r150-fi", make: "Suzuki", model: "Raider R150 Fi" },
  { id: "suzuki-burgman-street", make: "Suzuki", model: "Burgman Street 125" },
];

export function getBike(id: string | null | undefined): Bike | undefined {
  return bikes.find((b) => b.id === id);
}

export function bikeLabel(bike: Bike): string {
  return `${bike.make} ${bike.model}`;
}
