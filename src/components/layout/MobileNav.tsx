"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/catalog", label: "ค้นหาทะเบียน" },
  { href: "/guide", label: "วิธีจอง" },
  { href: "/contact", label: "ติดต่อ" },
];

export function MobileNav() {
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
    <Sheet>
      <SheetTrigger
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-foreground outline-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:hidden"
        aria-label="เปิดเมนู"
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(100%,20rem)] px-5">
        <SheetHeader>
          <SheetTitle className="text-left">เมนู</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "bg-primary/15 text-primary"
                  : "text-foreground hover:bg-primary/10 focus-visible:bg-primary/15 active:bg-primary/15"
              }`}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
