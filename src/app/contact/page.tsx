import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อ",
  description: "ที่อยู่และช่องทางติดต่อ บริษัท ออโต้ แกลเลอรี่ ซีคอน จำกัด",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">ติดต่อ</h1>

      <p className="mt-6 text-base font-medium text-foreground">
        บริษัท ออโต้ แกลเลอรี่ ซีคอน จำกัด
      </p>

      <address className="mt-4 not-italic text-sm leading-relaxed text-muted-foreground">
        446 ถนนศรีนครินทร์ แขวงหนองบอน เขตประเวศ กรุงเทพมหานคร 10250
      </address>

      <dl className="mt-10 space-y-5 text-sm">
        <div>
          <dt className="font-medium text-foreground">โทรศัพท์</dt>
          <dd className="mt-1">
            <a
              href="tel:+6623456789"
              className="inline-flex min-h-11 min-w-[11rem] items-center rounded-lg text-base font-semibold tabular-nums text-primary underline-offset-4 hover:underline sm:min-h-0 sm:text-sm"
            >
              02-345-6789
            </a>
            <span className="mt-1 block text-xs text-muted-foreground sm:hidden">
              แตะเบอร์เพื่อโทรออก
            </span>
            <span className="mt-1 hidden text-xs text-muted-foreground sm:inline">
              คลิกเบอร์เพื่อโทร (ถ้าอุปกรณ์รองรับ)
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Line</dt>
          <dd className="mt-1">
            <a
              href="https://line.me/R/ti/p/@ford.thai"
              className="text-primary underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ford.thai
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Facebook</dt>
          <dd className="mt-1 text-muted-foreground">ฟอร์ดศรีนครินทร์</dd>
        </div>
      </dl>
    </div>
  );
}
