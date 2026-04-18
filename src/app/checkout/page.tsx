import { redirect } from "next/navigation";

/** ลำดับธุรกิจ: ตะกร้า → จอง → ชำระ/สลิปบนหน้า /booking — เส้นทางนี้ส่งกลับตะกร้า */
export default function CheckoutRedirectPage() {
  redirect("/cart");
}
