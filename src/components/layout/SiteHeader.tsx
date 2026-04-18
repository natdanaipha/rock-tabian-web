"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
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
        <nav className="ml-auto hidden items-center gap-1 md:flex">
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
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <MobileNav />
        </div>
      </div>
      <Separator className="opacity-50" />
    </header>
  );
}
