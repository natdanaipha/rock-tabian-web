import Link from "next/link";
import { Search } from "lucide-react";

import { PlateGrid } from "@/components/plates/PlateGrid";
import { buttonVariants } from "@/components/ui/button";
import { listPlates, mockPlates } from "@/lib/data/mock-plates";
import {
  PLATE_CATEGORY_LABELS,
  type PlateCategory,
} from "@/lib/types/plate";
import { cn } from "@/lib/utils";

const categoryKeys = Object.keys(PLATE_CATEGORY_LABELS) as PlateCategory[];
const priceOptions = [
  { value: "", label: "ราคาทั้งหมด" },
  { value: "under-10k", label: "ต่ำกว่า 10,000" },
  { value: "10k-100k", label: "10,000 - 100,000" },
  { value: "100k-300k", label: "100,000 - 300,000" },
  { value: "300k-500k", label: "300,000 - 500,000" },
  { value: "over-500k", label: "มากกว่า 500,000" },
] as const;

function isPlateCategory(v: string | undefined): v is PlateCategory {
  return !!v && categoryKeys.includes(v as PlateCategory);
}

function buildCatalogHref(opts: {
  category?: string;
  prefix?: string;
  number?: string;
  digitSum?: string;
  priceRange?: string;
}) {
  const p = new URLSearchParams();
  if (opts.category?.trim()) p.set("category", opts.category.trim());
  if (opts.prefix?.trim()) p.set("prefix", opts.prefix.trim());
  if (opts.number?.trim()) p.set("number", opts.number.trim());
  if (opts.digitSum?.trim()) p.set("digitSum", opts.digitSum.trim());
  if (opts.priceRange?.trim()) p.set("priceRange", opts.priceRange.trim());
  const s = p.toString();
  return s ? `/catalog?${s}` : "/catalog";
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
        <section className="overflow-hidden rounded-xl border border-border/80">
          <div className="bg-zinc-700 px-4 py-2.5 text-sm font-medium text-white">
            ค้นหาทะเบียน
          </div>
          <form method="get" className="space-y-4 bg-muted/10 p-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_0.8fr_1.3fr]">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">ทะเบียน</span>
                <select
                  name="category"
                  defaultValue={category ?? ""}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <option value="">ทะเบียนทั้งหมด</option>
                  {categoryKeys.map((key) => (
                    <option key={key} value={key}>
                      {PLATE_CATEGORY_LABELS[key]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">อักษร</span>
                <input
                  name="prefix"
                  defaultValue={sp.prefix ?? ""}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">เลขทะเบียน</span>
                <input
                  name="number"
                  defaultValue={sp.number ?? ""}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">ผลรวม</span>
                <input
                  name="digitSum"
                  inputMode="numeric"
                  defaultValue={sp.digitSum ?? ""}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">ราคา</span>
                <select
                  name="priceRange"
                  defaultValue={sp.priceRange ?? ""}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {priceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "h-9 cursor-pointer px-5"
                )}
              >
                <Search className="size-4" />
                ค้นหา
              </button>
              <Link
                href={buildCatalogHref({})}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9")}
              >
                ล้างตัวกรอง
              </Link>
              <span className="ml-auto text-xs text-muted-foreground">
                ข้อมูลตัวอย่าง {mockPlates.length.toLocaleString("th-TH")} ป้าย
              </span>
            </div>
          </form>
        </section>
      </div>

      <PlateGrid plates={plates} className="mt-8" />
    </div>
  );
}
