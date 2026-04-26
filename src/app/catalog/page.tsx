import { CatalogFilterPanel } from "@/components/catalog/catalog-filter-panel";
import { PlateGrid } from "@/components/plates/PlateGrid";
import { listPlates, mockPlates } from "@/lib/data/mock-plates";
import {
  PLATE_CATEGORY_LABELS,
  type PlateCategory,
} from "@/lib/types/plate";

const categoryKeys = Object.keys(PLATE_CATEGORY_LABELS) as PlateCategory[];

function isPlateCategory(v: string | undefined): v is PlateCategory {
  return !!v && categoryKeys.includes(v as PlateCategory);
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    prefix?: string;
    number?: string;
    digitSum?: string;
    priceRange?: string;
  }>;
}) {
  const sp = await searchParams;
  const category = isPlateCategory(sp.category) ? sp.category : undefined;
  const parsedDigitSum = Number.parseInt(sp.digitSum ?? "", 10);
  const digitSum = Number.isFinite(parsedDigitSum) ? parsedDigitSum : undefined;
  const plates = listPlates({
    q: sp.q, // keep backward compatibility for old links
    category,
    prefix: sp.prefix,
    number: sp.number,
    digitSum,
    priceRange: sp.priceRange,
  });

  const filterKey = [
    sp.category ?? "",
    sp.prefix ?? "",
    sp.number ?? "",
    sp.digitSum ?? "",
    sp.priceRange ?? "",
  ].join("|");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          คลังทะเบียน
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          กำลังแสดง {plates.length.toLocaleString("th-TH")} รายการ
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-b border-border pb-6">
        <CatalogFilterPanel
          key={filterKey}
          defaultCategory={category ?? ""}
          defaultPrefix={sp.prefix ?? ""}
          defaultNumber={sp.number ?? ""}
          defaultDigitSum={sp.digitSum ?? ""}
          defaultPriceRange={sp.priceRange ?? ""}
          totalSamplePlates={mockPlates.length}
        />
      </div>

      <PlateGrid plates={plates} className="mt-8" />
    </div>
  );
}
