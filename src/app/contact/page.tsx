import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อ",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">ติดต่อ</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        นี่เป็นหน้าเดโมสำหรับแสดงดีไซน์เท่านั้น กรุณาแทนที่ด้วย Line Official, เบอร์โทร
        และที่อยู่จริงของธุรกิจคุณ
      </p>
      <dl className="mt-10 space-y-4 text-sm">
        <div>
          <dt className="font-medium text-foreground">โทรศัพท์</dt>
          <dd className="mt-1 text-muted-foreground">02-000-0000</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">อีเมล</dt>
          <dd className="mt-1 text-muted-foreground">hello@example.com</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Line</dt>
          <dd className="mt-1 text-muted-foreground">@your_line_id</dd>
        </div>
      </dl>
    </div>
  );
}
