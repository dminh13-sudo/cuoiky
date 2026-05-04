import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900">AutoCar</div>
            <div className="mt-1 text-sm text-gray-600">
              Demo UI/UX • Next.js App Router • Ant Design • Tailwind
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link className="rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100" href="/">
              Trang chủ
            </Link>
            <Link className="rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100" href="/cars">
              Danh sách xe
            </Link>
            <Link
              className="rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              href="/admin/cars"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

