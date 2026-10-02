import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy notice", description: "How DongWorkx handles your personal data." };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice">
      <p>
        {site.name} respects your privacy and follows the Data Privacy Act of 2012 (Republic Act No. 10173). This notice explains what we
        collect when you book a repair or buy parts, and why.
      </p>
      <h2>What we collect</h2>
      <p>Your name, mobile number, email (optional), delivery address for shipped orders, your bike model, and booking or order details.</p>
      <h2>Why we use it</h2>
      <p>To confirm and manage your booking or order, contact you about your bike, arrange delivery, and, if you opt in, send promos.</p>
      <h2>Who we share it with</h2>
      <p>Couriers (for delivery), payment and financing providers you choose (GCash, Maya, card processors, Skyro, Salmon), and no one else unless the law requires it.</p>
      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your data at any time. Email {site.email} or call {site.phone}.
      </p>
    </LegalPage>
  );
}
