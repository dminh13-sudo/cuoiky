"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "antd";

import { BackButton } from "@/components/layout/BackButton";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/cars", label: "Danh sách xe" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/contact", label: "Liên hệ" },
  { href: "/admin/cars", label: "Admin" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-lux-line bg-lux-bg/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <BackButton className="!rounded-full !px-3" label="Back" fallbackHref="/" />
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span className="rounded-lg border border-lux-line bg-lux-surface px-3 py-2 text-sm font-semibold tracking-wide text-lux-text">
              <span className="text-lux-gold">Auto</span>Car
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  active
                    ? "border border-lux-gold/60 bg-lux-surface text-lux-text shadow-[0_0_0_1px_rgba(201,162,39,0.18)_inset]"
                    : "text-lux-muted hover:bg-lux-surface hover:text-lux-text",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <Button size="small" href="/cars">
            Xe
          </Button>
          <Button size="small" href="/admin/cars">
            Admin
          </Button>
        </div>
      </div>
    </header>
  );
}

