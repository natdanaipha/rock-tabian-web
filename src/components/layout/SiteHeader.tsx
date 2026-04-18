"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/components/cart/cart-context";
import { MobileNav } from "@/components/layout/MobileNav";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/catalog", label: "ค้นหาทะเบียน" },
  { href: "/guide", label: "วิธีจอง" },
  { href: "/contact", label: "ติดต่อ" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/catalog") {
      return (
        pathname === "/catalog" ||
        pathname.startsWith("/catalog/") ||
        pathname.startsWith("/booking/")
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const cartActive =
    pathname === "/cart" || pathname === "/booking/batch";

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="RockTabian Home">
          <Image
            src="/rocktabianLogo.png"
            alt="RockTabian"
            width={132}
            height={34}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-1">
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  isActive(item.href) && "bg-primary/15 text-primary"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/cart"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "relative shrink-0",
              cartActive && "bg-primary/15 text-primary"
            )}
            aria-current={cartActive ? "page" : undefined}
            aria-label={`ตะกร้า${itemCount > 0 ? ` (${itemCount})` : ""}`}
          >
            <ShoppingCart className="size-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-primary px-1 text-[0.65rem] font-semibold leading-none text-primary-foreground">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </Link>
          <MobileNav />
        </div>
      </div>
      <Separator className="opacity-50" />
    </header>
  );
}
