"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import type { LicensePlate } from "@/lib/types/plate";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  plate: LicensePlate;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function AddToCartButton({
  plate,
  className,
  size = "sm",
}: AddToCartButtonProps) {
  const { addPlate, isInCart, hydrated } = useCart();
  const inCart = isInCart(plate.id);
  const canAdd = plate.isAvailable;

  if (!hydrated) {
    return (
      <Button
        type="button"
        size={size}
        variant="secondary"
        className={cn("pointer-events-none opacity-60", className)}
        disabled
      >
        <ShoppingCart data-icon="inline-start" />
        โหลด…
      </Button>
    );
  }

  if (inCart) {
    return (
      <Button
        type="button"
        size={size}
        variant="outline"
        className={cn("border-primary/40 text-primary", className)}
        disabled
      >
        <ShoppingCart data-icon="inline-start" />
        อยู่ในตะกร้า
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size={size}
      variant="secondary"
      className={className}
      disabled={!canAdd}
      title={!canAdd ? "ป้ายไม่ว่าง — ไม่สามารถใส่ตะกร้าได้" : undefined}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!canAdd) return;
        addPlate(plate);
        toast.success("ใส่ตะกร้าแล้ว", {
          description: `${plate.prefix} ${plate.number}`,
        });
      }}
    >
      <ShoppingCart data-icon="inline-start" />
      ใส่ตะกร้า
    </Button>
  );
}
