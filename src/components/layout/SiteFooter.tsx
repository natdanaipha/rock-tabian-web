import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-medium text-foreground">RockTabian · จองออนไลน์</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            ตัวอย่างหน้าเว็บสำหรับค้นหาและจองทะเบียนรถ โทนสีมินิมอล เน้นความชัดเจนและใช้งานง่าย
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/catalog" className="hover:text-foreground">
            คลังทะเบียน
          </Link>
          <Link href="/guide" className="hover:text-foreground">
            คู่มือ
          </Link>
          <span>โทร 02-000-0000</span>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} RockTabian — ไม่เกี่ยวข้องกับเว็บไซต์ภายนอก
      </div>
    </footer>
  );
}
