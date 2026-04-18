"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PlateSearchForm() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/catalog${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(ev) => setQ(ev.target.value)}
          placeholder="ค้นหา เช่น 6ขท หรือ จังหวัด"
          className="h-11 border-border/80 bg-background pl-10 shadow-sm"
          name="q"
          autoComplete="off"
        />
      </div>
      <Button type="submit" size="lg" className="h-11 shrink-0 px-6">
        ค้นหา
      </Button>
    </form>
  );
}
