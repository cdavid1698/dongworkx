// SAMPLE CONTENT (C5): general FI troubleshooting guidance written for the demo scanner.
// Ask the owner to review the wording before going live.

export type Symptom = {
  id: string;
  label: string;
  tagalog: string;
  checks: string[];
  causes: string[];
  serviceId: string;
  sample: true;
};

export const symptoms: Symptom[] = [
  {
    id: "hard-start",
    label: "Hard to start",
    tagalog: "Hirap mag-start",
    checks: ["fuel pressure", "injector spray", "crank sensor"],
    causes: ["Clogged fuel injector", "Weak fuel pump", "Dirty throttle body"],
    serviceId: "fi-tuneup",
    sample: true,
  },
  {
    id: "check-engine",
    label: "Check-engine light on",
    tagalog: "Umiilaw ang check engine",
    checks: ["ECU fault codes", "sensor voltages", "wiring"],
    causes: ["Faulty sensor (O2, TPS or temperature)", "Loose coupler or damaged wiring", "Injector circuit fault"],
    serviceId: "fi-scan",
    sample: true,
  },
  {
    id: "fuel-thirsty",
    label: "Using more fuel",
    tagalog: "Malakas sa gasolina",
    checks: ["air-fuel mix", "O2 sensor", "air filter"],
    causes: ["Dirty air filter", "Worn O2 sensor", "Injector dripping or spraying unevenly"],
    serviceId: "fi-tuneup",
    sample: true,
  },
  {
    id: "rough-idle",
    label: "Rough or dying idle",
    tagalog: "Namamatay sa menor",
    checks: ["idle air valve", "throttle body", "vacuum leaks"],
    causes: ["Carbon on the throttle body", "Idle setting lost after battery change", "Cracked intake hose"],
    serviceId: "throttle-body",
    sample: true,
  },
  {
    id: "no-power",
    label: "Weak on acceleration",
    tagalog: "Walang hatak",
    checks: ["injector flow", "CVT belt & rollers", "clutch"],
    causes: ["Worn drive belt or flat-spotted rollers", "Partly clogged injector", "Slipping clutch lining"],
    serviceId: "cvt-cleaning",
    sample: true,
  },
];
