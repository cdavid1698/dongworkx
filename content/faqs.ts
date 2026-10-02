// SAMPLE CONTENT (C5) except where a source is given. Confirm policies with the owner.

export type Faq = { q: string; a: string; source?: string; sample?: true };

export const faqs: Faq[] = [
  { q: "What are your opening hours?", a: "Both branches are open 8:00 AM to 6:00 PM.", source: "C1" },
  { q: "Where are your branches?", a: "Gerona: Mac Arthur Highway, Purok Ilang Ilang, Brgy. Magaspac, Gerona, Tarlac. Guimba: Provincial Road, Saranay District, Guimba, Nueva Ecija.", source: "S4, S5" },
  { q: "Do I need to book, or can I walk in?", a: "Walk-ins are welcome. A booking holds a bay for you, so you can skip the queue, especially on Saturdays.", sample: true },
  { q: "What does an FI diagnostic scan tell you?", a: "We plug a scanner into your bike's ECU to read stored fault codes and watch the sensors live. Then we know whether it's the injector, a sensor, the fuel pump or wiring, before we touch anything.", sample: true },
  { q: "Which bikes do you work on?", a: "Fuel-injected scooters and underbones from Honda, Yamaha, Suzuki and other brands, plus carburettor bikes. Not sure? Call us and tell us your model.", sample: true },
  { q: "How can I pay?", a: "Cash, GCash, Maya, QR Ph, credit or debit card. You can also pay in instalments through Skyro or Salmon.", source: "C3" },
  { q: "Do you ship parts outside Tarlac and Nueva Ecija?", a: "Yes, we ship nationwide. Rates depend on your region and the parcel weight, and you'll see the cost at checkout before you pay.", source: "C4" },
  { q: "Not sure a part fits my bike?", a: "Set your bike with the “My bike” button and the shop will only show parts that fit. You can also send us your model and year and we'll check.", sample: true },
  { q: "Is there a warranty on repairs?", a: "Labour is covered for 30 days. Parts carry the supplier's warranty. Keep your receipt.", sample: true },
  { q: "Can I bring my own parts?", a: "Yes. Labour is charged at the normal rate, but we can only warranty the work, not the part.", sample: true },
];
