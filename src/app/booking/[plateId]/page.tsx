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
}: {
  params: Promise<{ plateId: string }>;
}) {
  const { plateId } = await params;
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
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href={`/catalog/${plate.id}`} className="hover:text-foreground">
          ← กลับรายละเอียดป้าย
        </Link>
      </div>

      <Card className="border-border/80">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>จองทะเบียน</CardTitle>
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
              ยอดชำระ {formatThb(plate.price)}
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
              หลังโอนเงิน คุณจะอัปโหลดสลิปในขั้นตอนถัดไป (ยังไม่เปิดใช้ในเดโม)
            </p>
            <Button type="button" className="w-full" disabled>
              ส่งคำขอจอง (เดโม)
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
