import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatThb } from "@/lib/format";
import type { LicensePlate } from "@/lib/types/plate";
import { PLATE_CATEGORY_LABELS, VEHICLE_TYPE_LABELS } from "@/lib/types/plate";
import { cn } from "@/lib/utils";

interface PlateCardProps {
  plate: LicensePlate;
  className?: string;
}

export function PlateCard({ plate, className }: PlateCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-border/80 transition-shadow hover:shadow-md",
        className
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
              {plate.province}
            </p>
            <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
              <span className="text-primary">{plate.prefix}</span>{" "}
              <span>{plate.number}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              ผลรวมเลข {plate.digitSum.toLocaleString("th-TH")} ·{" "}
              {VEHICLE_TYPE_LABELS[plate.vehicleType]}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {plate.isAuction ? (
              <Badge variant="outline" className="border-accent/50 text-accent-foreground">
                ประมูล
              </Badge>
            ) : null}
            <Badge variant={plate.isAvailable ? "secondary" : "destructive"}>
              {plate.isAvailable ? "ว่าง" : "จองแล้ว"}
            </Badge>
          </div>
        </div>
        <p className="mt-4 inline-flex rounded-md bg-muted/80 px-2 py-0.5 text-xs text-muted-foreground">
          {PLATE_CATEGORY_LABELS[plate.category]}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-5 py-3">
        <span className="text-sm font-semibold tabular-nums text-foreground">
          {formatThb(plate.price)}
        </span>
        <Link
          href={`/catalog/${plate.id}`}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          รายละเอียด
        </Link>
      </CardFooter>
    </Card>
  );
}
