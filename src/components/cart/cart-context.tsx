"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { CART_STORAGE_KEY } from "@/lib/cart/constants";
import type { CartLine } from "@/lib/types/cart";
import type { LicensePlate } from "@/lib/types/plate";

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "remove"; plateId: string }
  | { type: "removeMany"; plateIds: string[] }
  | { type: "clear" };

function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      if (lines.some((l) => l.plateId === action.line.plateId)) return lines;
      return [...lines, action.line];
    }
    case "remove":
      return lines.filter((l) => l.plateId !== action.plateId);
    case "removeMany": {
      const drop = new Set(action.plateIds);
      return lines.filter((l) => !drop.has(l.plateId));
    }
    case "clear":
      return [];
    default:
      return lines;
  }
}

function parseStoredLines(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(isCartLine);
  } catch {
    return [];
  }
}

function isCartLine(v: unknown): v is CartLine {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.plateId === "string" &&
    typeof o.prefix === "string" &&
    typeof o.number === "string" &&
    typeof o.price === "number" &&
    typeof o.province === "string" &&
    typeof o.addedAt === "number"
  );
}

interface CartContextValue {
  lines: CartLine[];
  hydrated: boolean;
  addPlate: (plate: LicensePlate) => void;
  removePlate: (plateId: string) => void;
  removePlates: (plateIds: string[]) => void;
  clear: () => void;
  isInCart: (plateId: string) => boolean;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);
  const skipNextPersist = useRef(true);

  useEffect(() => {
    const stored = parseStoredLines(
      typeof window !== "undefined"
        ? window.localStorage.getItem(CART_STORAGE_KEY)
        : null
    );
    dispatch({ type: "hydrate", lines: stored });
    skipNextPersist.current = true;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      return;
    }
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota / private mode */
    }
  }, [lines, hydrated]);

  const addPlate = useCallback((plate: LicensePlate) => {
    dispatch({
      type: "add",
      line: {
        plateId: plate.id,
        prefix: plate.prefix,
        number: plate.number,
        price: plate.price,
        province: plate.province,
        addedAt: Date.now(),
      },
    });
  }, []);

  const removePlate = useCallback((plateId: string) => {
    dispatch({ type: "remove", plateId });
  }, []);

  const removePlates = useCallback((plateIds: string[]) => {
    dispatch({ type: "removeMany", plateIds });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const isInCart = useCallback(
    (plateId: string) => lines.some((l) => l.plateId === plateId),
    [lines]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      hydrated,
      addPlate,
      removePlate,
      removePlates,
      clear,
      isInCart,
      itemCount: lines.length,
    }),
    [
      lines,
      hydrated,
      addPlate,
      removePlate,
      removePlates,
      clear,
      isInCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
