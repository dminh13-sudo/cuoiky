import Link from "next/link";

import { BackButton } from "@/components/layout/BackButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-lux-bg text-lux-text">
      <div className="border-b border-lux-line bg-lux-bg/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-4 sm:px-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <BackButton className="!rounded-full !px-3" label="Back" fallbackHref="/" />
            <div className="rounded-lg border border-lux-line bg-lux-surface px-3 py-2 text-sm font-semibold tracking-wide text-lux-text">
              <span className="text-lux-gold">Admin</span>
            </div>
            <div className="min-w-0 text-sm text-lux-muted">Dashboard quản lý dữ liệu</div>
          </div>

          <nav className="flex w-full items-center gap-2 overflow-x-auto pb-1 text-sm lg:w-auto lg:overflow-visible lg:pb-0">
            <Link
              href="/admin/cars"
              className="shrink-0 rounded-full px-4 py-2 text-lux-muted hover:bg-lux-surface hover:text-lux-text"
            >
              Quản lý xe
            </Link>
            <Link
              href="/admin/test-drives"
              className="shrink-0 rounded-full px-4 py-2 text-lux-muted hover:bg-lux-surface hover:text-lux-text"
            >
              Lái thử
            </Link>
            <Link
              href="/"
              className="shrink-0 rounded-full border border-lux-gold/50 bg-lux-gold px-4 py-2 font-semibold text-black hover:bg-lux-goldSoft"
            >
              Về trang chủ
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 sm:py-8">{children}</div>
    </div>
  );
}
