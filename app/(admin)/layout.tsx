import Link from "next/link";

import { BackButton } from "@/components/layout/BackButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <BackButton className="!rounded-full" label="← Back" fallbackHref="/" />
            <div className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white">
              Admin
            </div>
            <div className="text-sm text-gray-600">Dashboard quản lý dữ liệu</div>
          </div>

          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/admin/cars"
              className="rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Quản lý xe
            </Link>
            <Link
              href="/admin/test-drives"
              className="rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Lái thử
            </Link>
            <Link
              href="/"
              className="rounded-full bg-gray-900 px-4 py-2 text-white hover:bg-black"
            >
              Về trang chủ
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-8">{children}</div>
    </div>
  );
}

