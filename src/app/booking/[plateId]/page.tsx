import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getPlateById } from "@/lib/data/mock-plates";
import { formatThb } from "@/lib/format";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plateId: string }>;
}) {
  const { plateId } = await params;
  const plate = getPlateById(plateId);
  if (!plate) return { title: "ไม่พบทะเบียน" };
  return { title: `จอง ${plate.prefix} ${plate.number}` };
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ plateId: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { plateId } = await params;
  const { from: fromParam } = await searchParams;
  const fromCart = fromParam === "cart";
  const plate = getPlateById(plateId);
  if (!plate) notFound();
  if (!plate.isAvailable) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <h1 className="text-lg font-semibold">ป้ายนี้ไม่ว่าง</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          กรุณาเลือกทะเบียนอื่นจากคลัง
        </p>
        <Link
          href="/catalog"
          className={cn(buttonVariants(), "mt-6 inline-flex justify-center")}
        >
          ไปคลังทะเบียน
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-8 px-4 py-10 sm:px-6">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        {fromCart ? (
          <Link href="/cart" className="hover:text-foreground">
            ← กลับตะกร้า
          </Link>
        ) : null}
        <Link href={`/catalog/${plate.id}`} className="hover:text-foreground">
          {fromCart ? "รายละเอียดป้าย" : "← กลับรายละเอียดป้าย"}
        </Link>
      </div>

      <Card className="border-border/80">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>1. จองทะเบียน</CardTitle>
            <Badge variant="secondary">ตัวอย่างฟอร์ม</Badge>
          </div>
          <CardDescription>
            กรอกข้อมูลเบื้องต้น — ยังไม่บันทึกจริง (รอเชื่อม API)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4">
            <p className="font-mono text-xl font-semibold text-primary">
              {plate.prefix} {plate.number}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{plate.province}</p>
            <p className="mt-2 text-sm font-medium tabular-nums">
              ยอดที่ต้องชำระ {formatThb(plate.price)}
            </p>
          </div>

          <form className="space-y-4" action="#" method="get">
            <div className="space-y-2">
              <Label htmlFor="ownerName">ชื่อ-นามสกุลเจ้าของรถ</Label>
              <Input id="ownerName" name="ownerName" placeholder="ตามบัตรประชาชน" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">เบอร์โทรติดต่อ</Label>
              <Input id="phone" name="phone" type="tel" placeholder="08x xxx xxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chassis">เลขตัวถัง (chassis)</Label>
              <Input id="chassis" name="chassis" placeholder="ไม่บังคับในขั้นตอนนี้" />
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              หลังส่งคำขอจองแล้ว ให้ดำเนินการชำระและแนบสลิปในขั้นที่ 2 ด้านล่าง
            </p>
            <Button type="button" className="w-full" disabled>
              ส่งคำขอจอง (เดโม)
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle>2. ชำระเงินและแนบสลิป</CardTitle>
          <CardDescription>
            อัปโหลดหลักฐานการโอนตามยอดด้านบน — ระบบจะตรวจว่าป้ายยังว่างและยอดถูกต้องเมื่อเชื่อม API (เดโม)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-slip">ไฟล์สลิป (รูปหรือ PDF)</Label>
            <Input
              id="payment-slip"
              name="slip"
              type="file"
              accept="image/*,.pdf,application/pdf"
              className="cursor-pointer border-dashed pt-1.5 file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            โอนแล้วแนบสลิปภายในเวลาที่กำหนด — คำสั่งซื้อจะสมบูรณ์หลังตรวจสลิปและสต็อกป้าย
          </p>
          <Button type="button" className="w-full" disabled>
            ยืนยันการชำระและสลิป (เดโม)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
