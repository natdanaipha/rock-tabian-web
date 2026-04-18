export type PlateCategory =
  | "auspicious"
  | "sequential"
  | "pair"
  | "mirror"
  | "sandwich"
  | "vip"
  | "budget"
  | "new_batch"
  | "graphic";

export type VehicleType = "sedan" | "pickup" | "van" | "motorcycle";

export interface LicensePlate {
  id: string;
  prefix: string;
  number: string;
  digitSum: number;
  price: number;
  category: PlateCategory;
  vehicleType: VehicleType;
  province: string;
  isAvailable: boolean;
  isAuction: boolean;
  imageUrl?: string;
}

export const PLATE_CATEGORY_LABELS: Record<PlateCategory, string> = {
  auspicious: "ผลรวมดี",
  sequential: "เลขเรียง",
  pair: "เลขคู่",
  mirror: "เลขสลับ",
  sandwich: "เลขหาบ",
  vip: "VIP",
  budget: "ราคาถูก",
  new_batch: "หมวดใหม่",
  graphic: "กราฟิก / ประมูล",
};

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  sedan: "รถเก๋ง",
  pickup: "กระบะ",
  van: "รถตู้",
  motorcycle: "จักรยานยนต์",
};
