import type { Metadata } from "next";
import { BookingFlow } from "@/components/book/BookingFlow";
import type { BranchId } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a repair",
  description: "Book a motorcycle repair or FI diagnostic scan at DongWorkx Gerona or Guimba. Pick a time between 8 AM and 6 PM.",
};

export default async function BookPage(props: PageProps<"/book">) {
  const sp = await props.searchParams;
  const service = typeof sp.service === "string" ? sp.service : undefined;
  const branch = sp.branch === "gerona" || sp.branch === "guimba" ? (sp.branch as BranchId) : undefined;
  return <BookingFlow key={`${service}-${branch}`} initialServiceId={service} initialBranch={branch} />;
}
