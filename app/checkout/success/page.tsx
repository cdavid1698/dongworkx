import type { Metadata } from "next";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";

export const metadata: Metadata = { title: "Order placed" };

export default async function SuccessPage(props: PageProps<"/checkout/success">) {
  const { order } = await props.searchParams;
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <OrderSuccess orderId={typeof order === "string" ? order : undefined} />
    </div>
  );
}
