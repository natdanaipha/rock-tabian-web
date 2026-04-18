import type { Metadata } from "next";

import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "ตะกร้า",
  description: "รายการ license plate item ที่หยิบใส่ตะกร้า",
};

export default function CartPage() {
  return <CartPageClient />;
}
