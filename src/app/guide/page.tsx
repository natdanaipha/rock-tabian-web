import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "วิธีจอง",
};

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">วิธีจองทะเบียน</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        3 ขั้น: <span className="text-foreground">ใส่ตะกร้า</span> →{" "}
        <span className="text-foreground">จอง</span> →{" "}
        <span className="text-foreground">โอนแล้วแนบสลิป</span>
      </p>
      <ol className="mt-8 list-decimal space-y-5 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary marker:font-semibold">
        <li>
          <span className="font-medium text-foreground">หยิบใส่ตะกร้า</span> — เลือกจากคลังหรือหน้าแรก
          กด <span className="font-medium text-foreground">ใส่ตะกร้า</span> ได้หลายใบ
        </li>
        <li>
          <span className="font-medium text-foreground">กดจองจากตะกร้า</span> — เปิดไอคอนตะกร้า
          แล้วเลือก <span className="font-medium text-foreground">จองทะเบียนทั้งหมด</span> หรือ{" "}
          <span className="font-medium text-foreground">จองทะเบียนนี้</span> ทีละใบ
        </li>
        <li>
          <span className="font-medium text-foreground">กรอกฟอร์ม โอนเงิน อัปโหลดสลิป</span> — ทำบนหน้าจองตามลำดับ
          จากนั้นรอทีมงานแจ้งผล
        </li>
      </ol>
      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        ตะกร้าไม่ได้กันป้ายไว้ — ถ้าคนอื่นจองไปก่อน อาจจองไม่สำเร็จจนกว่าจะชำระและยืนยันได้จริง
        <br />
        เว็บตัวอย่างยังไม่บันทึกจอง/สลิปจริง
      </p>
    </div>
  );
}
