"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { CartProvider } from "@/components/cart/cart-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster position="bottom-center" richColors closeButton />
    </CartProvider>
  );
}
