"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.6212212399882!2d100.64588359999999!3d13.6807813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d607433009525%3A0x477b6812f86a144b!2sFord%20Srinagarindra!5e0!3m2!1sen!2sth!4v1776484127977!5m2!1sen!2sth";

/** พิกัดจาก embed — เปิดแอป/เว็บ Google Maps ได้แม้ iframe ถูกบล็อก */
const MAPS_OPEN_URL =
  "https://www.google.com/maps?q=13.6807813,100.6458836&z=17&hl=th";

interface ContactMapProps {
  className?: string;
}

/** โหลด iframe ฝั่ง client เท่านั้น — ลดปัญหา embed ไม่เรนเดอร์บางเคส */
export function ContactMap({ className }: ContactMapProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div
      className={cn(
        "w-full max-w-[600px] space-y-3 max-lg:mx-auto lg:ml-auto lg:mr-0",
        className
      )}
    >
      <div className="overflow-hidden rounded-xl border border-border/80 bg-muted/30 shadow-sm">
        <div className="relative h-[min(70vw,320px)] w-full sm:h-[450px]">
          {ready ? (
            <iframe
              title="Ford ศรีนครินทร์"
              src={EMBED_SRC}
              className="absolute inset-0 h-full w-full border-0"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center bg-muted/50 text-sm text-muted-foreground"
              aria-hidden
            >
              กำลังโหลดแผนที่…
            </div>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground lg:text-right">
        <a
          href={MAPS_OPEN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          เปิดใน Google Maps
        </a>
        <span className="mx-2 text-border">·</span>
        ถ้าแผนที่ไม่ขึ้น ให้ใช้ลิงก์นี้แทน
      </p>
    </div>
  );
}
