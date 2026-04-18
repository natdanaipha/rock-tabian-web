import type { Metadata } from "next";

import { BookingBatchPageClient } from "@/components/cart/booking-batch-page-client";

export const metadata: Metadata = {
  title: "จองทะเบียนทั้งหมดในตะกร้า",
  description: "จอง ทะเบียน ทุกรายการในตะกร้าในครั้งเดียว",
};

export default function BookingBatchPage() {
  return <BookingBatchPageClient />;
}
