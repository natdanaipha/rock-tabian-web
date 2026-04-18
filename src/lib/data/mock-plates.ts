import type { LicensePlate } from "@/lib/types/plate";
import { computeDigitSum } from "@/lib/utils/digitSum";

const raw: Omit<LicensePlate, "digitSum">[] = [
  {
    id: "6kht-8899",
    prefix: "6ขท",
    number: "8899",
    price: 185_000,
    category: "pair",
    vehicleType: "sedan",
    province: "กรุงเทพมหานคร",
    isAvailable: true,
    isAuction: false,
  },
  {
    id: "1kkr-2345",
    prefix: "1กก",
    number: "2345",
    price: 320_000,
    category: "sequential",
    vehicleType: "sedan",
    province: "นนทบุรี",
    isAvailable: true,
    isAuction: false,
  },
  {
    id: "5ngg-9889",
    prefix: "5งก",
    number: "9889",
    price: 95_000,
    category: "mirror",
    vehicleType: "pickup",
    province: "ชลบุรี",
    isAvailable: false,
    isAuction: false,
  },
  {
    id: "2kkb-1688",
    prefix: "2ขบ",
    number: "1688",
    price: 248_000,
    category: "auspicious",
    vehicleType: "sedan",
    province: "กรุงเทพมหานคร",
    isAvailable: true,
    isAuction: false,
  },
  {
    id: "7kht-7777",
    prefix: "7ขท",
    number: "7777",
    price: 520_000,
    category: "vip",
    vehicleType: "van",
    province: "เชียงใหม่",
    isAvailable: true,
    isAuction: true,
  },
  {
    id: "4kkr-1212",
    prefix: "4กก",
    number: "1212",
    price: 42_000,
    category: "budget",
    vehicleType: "motorcycle",
    province: "ขอนแก่น",
    isAvailable: true,
    isAuction: false,
  },
  {
    id: "3kht-4567",
    prefix: "3ขท",
    number: "4567",
    price: 128_000,
    category: "sequential",
    vehicleType: "pickup",
    province: "สมุทรปราการ",
    isAvailable: false,
    isAuction: false,
  },
  {
    id: "8kkb-9991",
    prefix: "8ขบ",
    number: "9991",
    price: 76_000,
    category: "sandwich",
    vehicleType: "sedan",
    province: "ภูเก็ต",
    isAvailable: true,
    isAuction: false,
  },
  {
    id: "9kkr-8080",
    prefix: "9กก",
    number: "8080",
    price: 158_000,
    category: "mirror",
    vehicleType: "sedan",
    province: "กรุงเทพมหานคร",
    isAvailable: true,
    isAuction: false,
  },
  {
    id: "2kht-1119",
    prefix: "2ขท",
    number: "1119",
    price: 62_000,
    category: "new_batch",
    vehicleType: "pickup",
    province: "นครราชสีมา",
    isAvailable: true,
    isAuction: false,
  },
  {
    id: "1kht-5550",
    prefix: "1ขท",
    number: "5550",
    price: 198_000,
    category: "graphic",
    vehicleType: "sedan",
    province: "กรุงเทพมหานคร",
    isAvailable: false,
    isAuction: true,
  },
  {
    id: "6kkr-3699",
    prefix: "6กก",
    number: "3699",
    price: 88_000,
    category: "auspicious",
    vehicleType: "motorcycle",
    province: "อุบลราชธานี",
    isAvailable: true,
    isAuction: false,
  },
];

export const mockPlates: LicensePlate[] = raw.map((p) => ({
  ...p,
  digitSum: computeDigitSum(p.number),
}));

export function getPlateById(id: string): LicensePlate | undefined {
  return mockPlates.find((p) => p.id === id);
}

export function listPlates(filters?: {
  category?: string;
  q?: string;
  availableOnly?: boolean;
  prefix?: string;
  number?: string;
  digitSum?: number;
  priceRange?: string;
}): LicensePlate[] {
  let list = [...mockPlates];
  if (filters?.category && filters.category !== "all") {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters?.availableOnly) {
    list = list.filter((p) => p.isAvailable);
  }
  if (filters?.q?.trim()) {
    const q = filters.q.trim().toLowerCase();
    list = list.filter(
      (p) =>
        `${p.prefix}${p.number}`.toLowerCase().includes(q) ||
        p.province.toLowerCase().includes(q)
    );
  }
  if (filters?.prefix?.trim()) {
    const prefix = filters.prefix.trim().toLowerCase();
    list = list.filter((p) => p.prefix.toLowerCase().includes(prefix));
  }
  if (filters?.number?.trim()) {
    const number = filters.number.trim();
    list = list.filter((p) => p.number.includes(number));
  }
  if (typeof filters?.digitSum === "number" && Number.isFinite(filters.digitSum)) {
    list = list.filter((p) => p.digitSum === filters.digitSum);
  }
  if (filters?.priceRange) {
    list = list.filter((p) => {
      switch (filters.priceRange) {
        case "under-10k":
          return p.price < 10_000;
        case "10k-100k":
          return p.price >= 10_000 && p.price < 100_000;
        case "100k-300k":
          return p.price >= 100_000 && p.price < 300_000;
        case "300k-500k":
          return p.price >= 300_000 && p.price < 500_000;

        // Backward-compatibility with previous filter values
        case "under-5k":
        case "under-100k":
          return p.price < 5_000;
        case "5k-50k":
          return p.price >= 5_000 && p.price <= 50_000;
        case "50k-100k":
          return p.price >= 50_001 && p.price <= 100_000;
        case "over-500k":
          return p.price > 500_000;
        default:
          return true;
      }
    });
  }
  return list.sort((a, b) => a.price - b.price);
}
