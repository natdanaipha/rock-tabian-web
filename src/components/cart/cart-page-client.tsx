"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/cart-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatThb } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CartPageClient() {
  const { lines, removePlate, clear, hydrated } = useCart();

  const total = lines.reduce((sum, l) => sum + l.price, 0);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-sm text-muted-foreground sm:px-6">
        กำลังโหลดตะกร้า…
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          ตะกร้า
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          ยังไม่มี license plate item ในตะกร้า — หยิบจากคลังทะเบียนได้เลย
        </p>
        <Link
          href="/catalog"
          className={cn(buttonVariants(), "mt-8 inline-flex")}
        >
          ไปคลังทะเบียน
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            ตะกร้า
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            ลำดับขั้น: จองทะเบียน → ชำระและอัปโหลดสลิป รายการในตะกร้าไม่ได้กันสต็อก
            — ตอนจอง/ชำระจริงต้องเช็คว่าป้ายยังว่าง
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => clear()}>
          ล้างตะกร้า
        </Button>
      </div>

      <ul className="mt-8 divide-y divide-border rounded-xl border border-border/80 bg-card">
        {lines.map((line) => (
          <li
            key={line.plateId}
            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {line.province}
              </p>
              <p className="mt-1 font-mono text-lg font-semibold text-foreground">
                <span className="text-primary">{line.prefix}</span> {line.number}
              </p>
              <p className="mt-1 text-sm font-medium tabular-nums text-foreground">
                {formatThb(line.price)}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
              <Link
                href={`/catalog/${line.plateId}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-primary"
                )}
              >
                รายละเอียด
              </Link>
              <Link
                href={`/booking/${line.plateId}?from=cart`}
                className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
              >
                จองทะเบียนนี้
              </Link>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => removePlate(line.plateId)}
                aria-label={`ลบ ${line.prefix} ${line.number} ออกจากตะกร้า`}
              >
                <Trash2 className="size-4" />
                ลบ
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs text-muted-foreground">ยอดรวมในกระเป๋า (อ้างอิง)</p>
          <p className="mt-1 text-xl font-semibold tabular-nums">
            {formatThb(total)}
          </p>
          <p className="mt-2 max-w-md text-xs text-muted-foreground">
            <span className="font-medium text-foreground">จองทะเบียนทั้งหมด</span>{" "}
            = จองครบทุกป้ายในครั้งเดียว ·{" "}
            <span className="font-medium text-foreground">จองทะเบียนนี้</span>{" "}
            = จองทีละรายการจากแถว
          </p>
        </div>
        <Link
          href="/booking/batch"
          className={cn(buttonVariants({ size: "lg" }), "w-full shrink-0 sm:w-auto")}
        >
          จองทะเบียนทั้งหมด
        </Link>
      </div>
    </div>
  );
}
