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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <BackButton className="!rounded-full" label="← Back" fallbackHref="/" />
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white">
              AutoCar
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
                  active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
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

