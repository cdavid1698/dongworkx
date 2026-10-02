import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms", description: "Terms for bookings, parts orders and repairs at DongWorkx." };

export default function TermsPage() {
  return (
    <LegalPage title="Terms">
      <h2>Bookings</h2>
      <p>Prices online are estimates for labour. We confirm the final price after inspection and before any extra work starts. If you can&rsquo;t make your slot, please call {site.phone} so we can give it to another rider.</p>
      <h2>Reservation deposits</h2>
      <p>A deposit, if paid, is deducted from your final bill. It is refundable if you cancel at least 24 hours before your slot.</p>
      <h2>Parts orders</h2>
      <p>Prices include VAT. Shipping costs are shown at checkout. Check that a part fits your bike before ordering; we&rsquo;re happy to confirm fitment by phone.</p>
      <h2>Returns</h2>
      <p>Unused parts in their original packaging can be returned within 7 days. Electrical parts that have been installed can&rsquo;t be returned unless they are faulty.</p>
      <h2>Warranty</h2>
      <p>Labour is covered for 30 days. Parts carry the supplier&rsquo;s warranty.</p>
      <h2>Instalments</h2>
      <p>Skyro and Salmon instalments are offered by those providers under their own terms, subject to their approval.</p>
    </LegalPage>
  );
}
