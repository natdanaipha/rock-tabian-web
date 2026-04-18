"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useCart } from "@/components/cart/cart-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getPlateById } from "@/lib/data/mock-plates";
import { validateCartForPayment } from "@/lib/cart/validate-payment";
import { formatThb } from "@/lib/format";

export function BookingBatchPageClient() {
  const router = useRouter();
  const { lines, hydrated } = useCart();

  const plateIds = useMemo(() => lines.map((l) => l.plateId), [lines]);
  const validation = useMemo(
    () => validateCartForPayment(plateIds),
    [plateIds]
  );

  useEffect(() => {
    if (hydrated && lines.length === 0) {
      router.replace("/cart");
    }
  }, [hydrated, lines.length, router]);

  if (!hydrated || lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-muted-foreground sm:px-6">
        {hydrated ? "กำลังไปตะกร้า…" : "กำลังโหลด…"}
      </div>
    );
  }

  const total = lines.reduce((s, l) => s + l.price, 0);

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-10 sm:px-6">
      <div className="text-sm text-muted-foreground">
        <Link href="/cart" className="hover:text-foreground">
          ← กลับตะกร้า
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          จองทะเบียนทั้งหมดในตะกร้า
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          ส่งคำขอจองและชำระครั้งเดียวสำหรับทุกป้ายในรายการ ({lines.length} รายการ)
        </p>
      </div>

      {validation.issues.length > 0 ? (
        <div
          className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          role="status"
        >
          <p className="font-medium">มีป้ายที่อาจจองไม่ได้</p>
          <p className="mt-1 text-xs text-muted-foreground">
            กลับไปแก้ที่ตะกร้า หรือลบรายการที่ขายแล้ว — ตอนส่งจริงระบบจะปฏิเสธรายการที่ไม่ว่าง
          </p>
        </div>
      ) : null}

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle>รายการป้าย</CardTitle>
          <CardDescription>ยอดรวม {formatThb(total)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 divide-y divide-border px-0 pb-0">
          {lines.map((line) => {
            const live = getPlateById(line.plateId);
            const available = live?.isAvailable ?? false;
            return (
              <div
                key={line.plateId}
                className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 first:pt-0"
              >
                <div>
                  <p className="text-xs text-muted-foreground">{line.province}</p>
                  <p className="font-mono text-lg font-semibold">
                    <span className="text-primary">{line.prefix}</span> {line.number}
                  </p>
                  <p className="mt-0.5 text-sm tabular-nums text-muted-foreground">
                    {formatThb(line.price)}
                  </p>
                </div>
                <Badge variant={available ? "secondary" : "destructive"}>
                  {available ? "ว่าง (ล่าสุด)" : "ไม่ว่าง"}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-border/80">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>1. ข้อมูลติดต่อ (ใช้ร่วมทุกป้าย)</CardTitle>
            <Badge variant="secondary">ตัวอย่างฟอร์ม</Badge>
          </div>
          <CardDescription>
            ยังไม่บันทึกจริง — หากแต่ละป้ายคนละคัน ให้ระบุใน &quot;หมายเหตุ&quot;
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="batch-ownerName">ชื่อ-นามสกุลผู้ติดต่อ</Label>
            <Input id="batch-ownerName" name="ownerName" placeholder="ตามบัตรประชาชน" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch-phone">เบอร์โทรติดต่อ</Label>
            <Input id="batch-phone" name="phone" type="tel" placeholder="08x xxx xxxx" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch-note">หมายเหตุ (ทะเบียนละคัน ฯลฯ)</Label>
            <Input id="batch-note" name="note" placeholder="ไม่บังคับ" />
          </div>
          <Separator />
          <Button type="button" className="w-full" disabled>
            ส่งคำขอจองทะเบียนทั้งหมด ({lines.length} ป้าย) — เดโม
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle>2. ชำระเงินและแนบสลิป (ยอดรวม)</CardTitle>
          <CardDescription>
            โอนครั้งเดียวตามยอดรวม {formatThb(total)} แล้วแนบสลิปหลักฐาน
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="batch-slip">ไฟล์สลิป (รูปหรือ PDF)</Label>
            <Input
              id="batch-slip"
              name="slip"
              type="file"
              accept="image/*,.pdf,application/pdf"
              className="cursor-pointer border-dashed pt-1.5 file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            เมื่อเชื่อม API จะตรวจว่าทุกป้ายยังว่างและยอดโอนตรงก่อนยืนยัน
          </p>
          <Button type="button" className="w-full" disabled>
            ยืนยันการชำระและสลิป (เดโม)
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        ต้องการจองทีละป้าย?{" "}
        <Link href="/cart" className="font-medium text-primary underline-offset-4 hover:underline">
          กลับตะกร้า
        </Link>{" "}
        แล้วใช้ปุ่ม &quot;จองทะเบียนนี้&quot;
      </p>
    </div>
  );
}
