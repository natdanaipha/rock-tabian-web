import { PlateCard } from "@/components/plates/PlateCard";
import type { LicensePlate } from "@/lib/types/plate";
import { cn } from "@/lib/utils";

interface PlateGridProps {
  plates: LicensePlate[];
  className?: string;
}

export function PlateGrid({ plates, className }: PlateGridProps) {
  if (plates.length === 0) {
    return (
      <p className={cn("rounded-xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground", className)}>
        ไม่พบทะเบียนที่ตรงกับเงื่อนไข ลองเปลี่ยนหมวดหรือคำค้น
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {plates.map((plate) => (
        <li key={plate.id}>
          <PlateCard plate={plate} />
        </li>
      ))}
    </ul>
  );
}
