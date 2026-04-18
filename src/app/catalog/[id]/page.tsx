import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPlateById, mockPlates } from "@/lib/data/mock-plates";
import { formatThb } from "@/lib/format";
import {
  PLATE_CATEGORY_LABELS,
  VEHICLE_TYPE_LABELS,
} from "@/lib/types/plate";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return mockPlates.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plate = getPlateById(id);
  if (!plate) return { title: "ไม่พบทะเบียน" };
  return {
    title: `${plate.prefix} ${plate.number}`,
    description: `ทะเบียน${plate.province} ราคา ${formatThb(plate.price)}`,
  };
}

export default async function PlateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plate = getPlateById(id);
  if (!plate) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/catalog" className="hover:text-foreground">
          ← กลับคลังทะเบียน
        </Link>
      </div>

      <Card className="overflow-hidden border-border/80 shadow-sm">
        <CardHeader className="border-b border-border/60 bg-muted/20 pb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {plate.province}
              </p>
              <CardTitle className="mt-2 font-mono text-3xl font-semibold tracking-tight sm:text-4xl">
                <span className="text-primary">{plate.prefix}</span> {plate.number}
              </CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              {plate.isAuction ? (
                <Badge variant="outline" className="border-accent/50">
                  ประมูล
                </Badge>
              ) : null}
              <Badge variant={plate.isAvailable ? "secondary" : "destructive"}>
                {plate.isAvailable ? "ว่าง" : "จองแล้ว"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/70 bg-background p-4">
              <p className="text-xs text-muted-foreground">ราคา</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">
                {formatThb(plate.price)}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background p-4">
              <p className="text-xs text-muted-foreground">ผลรวมเลข</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">
                {plate.digitSum.toLocaleString("th-TH")}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background p-4">
              <p className="text-xs text-muted-foreground">หมวด</p>
              <p className="mt-1 font-medium">{PLATE_CATEGORY_LABELS[plate.category]}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background p-4">
              <p className="text-xs text-muted-foreground">ประเภทรถแนะนำ</p>
              <p className="mt-1 font-medium">{VEHICLE_TYPE_LABELS[plate.vehicleType]}</p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {plate.isAvailable
                ? "กดปุ่มด้านล่างเพื่อเริ่มกรอกข้อมูลจองและแนบหลักฐานโอน"
                : "ป้ายนี้ถูกจองแล้ว — เลือกทะเบียนอื่นได้จากคลัง"}
            </p>
            {plate.isAvailable ? (
              <Link
                href={`/booking/${plate.id}`}
                className={cn(buttonVariants({ size: "lg" }), "justify-center")}
              >
                จองทะเบียนนี้
              </Link>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
