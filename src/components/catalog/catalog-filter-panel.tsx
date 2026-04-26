"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
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

function countActiveFilters(p: {
  category: string;
  prefix: string;
  number: string;
  digitSum: string;
  priceRange: string;
}) {
  let n = 0;
  if (p.category.trim()) n += 1;
  if (p.prefix.trim()) n += 1;
  if (p.number.trim()) n += 1;
  if (p.digitSum.trim()) n += 1;
  if (p.priceRange.trim()) n += 1;
  return n;
}

export type CatalogFilterPanelProps = {
  defaultCategory: string;
  defaultPrefix: string;
  defaultNumber: string;
  defaultDigitSum: string;
  defaultPriceRange: string;
  totalSamplePlates: number;
};

export function CatalogFilterPanel({
  defaultCategory,
  defaultPrefix,
  defaultNumber,
  defaultDigitSum,
  defaultPriceRange,
  totalSamplePlates,
}: CatalogFilterPanelProps) {
  const activeFilterCount = useMemo(
    () =>
      countActiveFilters({
        category: defaultCategory,
        prefix: defaultPrefix,
        number: defaultNumber,
        digitSum: defaultDigitSum,
        priceRange: defaultPriceRange,
      }),
    [
      defaultCategory,
      defaultPrefix,
      defaultNumber,
      defaultDigitSum,
      defaultPriceRange,
    ],
  );

  const [open, setOpen] = useState(() => activeFilterCount > 0);

  return (
    <section className="overflow-hidden rounded-xl border border-border/80">
      <div
        className={cn(
          "flex min-h-10 items-center justify-between gap-2 bg-zinc-700 px-4 py-2.5 text-sm font-medium text-white",
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <h2 className="shrink-0 font-medium">ค้นหาทะเบียน</h2>
          {!open && activeFilterCount > 0 ? (
            <span className="truncate text-xs font-normal text-white/80 md:hidden">
              ใช้ {activeFilterCount} เงื่อนไข
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group md:hidden -mr-1 inline-flex shrink-0 items-center justify-center rounded-md p-1.5 text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
          aria-expanded={open}
          aria-controls="catalog-filter-form"
        >
          <span
            className={cn(
              "inline-flex will-change-transform",
              !open && "animate-catalog-chevron-hint",
              "motion-reduce:animate-none",
              "group-hover:animate-none",
            )}
          >
            <ChevronDown
              className={cn("size-5 transition-transform duration-200", open && "rotate-180")}
            />
          </span>
          <span className="sr-only">{open ? "ย่อตัวกรอง" : "ขยายตัวกรอง"}</span>
        </button>
      </div>
      <form
        id="catalog-filter-form"
        method="get"
        className={cn(
          "space-y-4 bg-muted/10 p-4",
          !open && "max-md:hidden",
        )}
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_0.8fr_1.3fr]">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">ทะเบียน</span>
            <select
              name="category"
              defaultValue={defaultCategory}
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
              defaultValue={defaultPrefix}
              className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">เลขทะเบียน</span>
            <input
              name="number"
              defaultValue={defaultNumber}
              className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">ผลรวม</span>
            <input
              name="digitSum"
              inputMode="numeric"
              defaultValue={defaultDigitSum}
              className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">ราคา</span>
            <select
              name="priceRange"
              defaultValue={defaultPriceRange}
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
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-9 cursor-pointer px-5",
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
            ข้อมูลตัวอย่าง {totalSamplePlates.toLocaleString("th-TH")} ป้าย
          </span>
        </div>
      </form>
    </section>
  );
}
