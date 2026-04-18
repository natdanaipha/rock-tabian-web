import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "วิธีจอง",
};

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">วิธีจองทะเบียน</h1>
      <ol className="mt-8 list-decimal space-y-6 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary marker:font-semibold">
        <li>
          <span className="font-medium text-foreground">เลือกป้าย</span> จากหน้าแรกหรือคลัง
          ทะเบียน แล้วเปิดรายละเอียดเพื่อตรวจสอบราคาและสถานะ
        </li>
        <li>
          <span className="font-medium text-foreground">กรอกข้อมูล</span> เจ้าของรถ เลขตัวถัง
          และช่องทางติดต่อให้ครบถ้วน
        </li>
        <li>
          <span className="font-medium text-foreground">ชำระเงิน</span> ตามเลขบัญชีที่แจ้ง
          จากนั้นอัปโหลดสลิปเพื่อยืนยัน
        </li>
        <li>
          <span className="font-medium text-foreground">รออัปเดตสถานะ</span> ทีมงานจะประมวลผล
          และแจ้งผลทางช่องทางที่คุณระบุ
        </li>
      </ol>
    </div>
  );
}
