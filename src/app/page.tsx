import Link from "next/link";

import { PlateSearchForm } from "@/components/home/PlateSearchForm";
import { PlateGrid } from "@/components/plates/PlateGrid";
import { buttonVariants } from "@/components/ui/button";
import { listPlates } from "@/lib/data/mock-plates";
import {
  PLATE_CATEGORY_LABELS,
  type PlateCategory,
} from "@/lib/types/plate";
import { cn } from "@/lib/utils";

const categories = Object.entries(PLATE_CATEGORY_LABELS) as [
  PlateCategory,
  string,
][];

export default function HomePage() {
  const featured = listPlates({ availableOnly: true }).slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-muted/40 to-background">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full bg-primary/[0.06] blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <p className="text-sm font-medium tracking-wide text-primary">
            จองทะเบียนรถออนไลน์
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]">
            ค้นหาทะเบียน
            <span className="text-primary"> ในไม่กี่คลิก</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            ดูหมวดทะเบียน ราคา และสถานะว่าง/จองแล้ว จากนั้นกดจองและแนบหลักฐานโอนได้ในขั้นตอนเดียว
          </p>
          <div className="mt-8">
            <PlateSearchForm />
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            <span className="w-full text-xs font-medium text-muted-foreground sm:w-auto sm:py-1.5">
              หมวดยอดนิยม
            </span>
            {categories.slice(0, 6).map(([key, label]) => (
              <Link
                key={key}
                href={`/catalog?category=${key}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-full border-border/80 bg-background/80"
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">ทะเบียนว่างล่าสุด</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              ตัวอย่างข้อมูลจำลอง — เชื่อม API จริงได้ในขั้นถัดไป
            </p>
          </div>
          <Link
            href="/catalog"
            className={cn(
              "text-sm font-medium text-primary underline-offset-4 hover:underline"
            )}
          >
            ดูทั้งหมด
          </Link>
        </div>
        <PlateGrid plates={featured} className="mt-8" />
      </section>

      <section className="border-t border-border bg-muted/25 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-medium uppercase text-primary">
              ขั้นตอนการจอง
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              จองทะเบียนให้เสร็จใน 3 ขั้นตอน
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ออกแบบ flow ให้เข้าใจง่าย ตั้งแต่เลือกป้ายจนถึงยืนยันการชำระเงิน
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
          {[
            {
              title: "เลือกทะเบียน",
              body: "กรองตามหมวด ราคา หรือคำค้น แล้วเปิดรายละเอียดป้าย",
            },
            {
              title: "กรอกข้อมูลรถ",
              body: "ชื่อเจ้าของ เลขตัวถัง และประเภทรถ เพื่อเตรียมจอง",
            },
            {
              title: "ชำระและอัปโหลดสลิป",
              body: "โอนเงินตามยอด แล้วแนบสลิปเพื่อยืนยันการจอง",
            },
          ].map((s) => (
            <div key={s.title} className="relative rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
              <span
                className="absolute left-6 top-0 h-0.5 w-8 -translate-y-1/2 rounded-full bg-destructive/80"
                aria-hidden
              />
              <h3 className="font-medium text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}
