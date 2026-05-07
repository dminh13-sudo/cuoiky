import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-lux-line bg-lux-bg/60 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-wide text-lux-text">
              <span className="text-lux-gold">Auto</span>Car Showroom
            </div>
            <div className="mt-1 text-sm text-lux-muted">
              Sự thành công của bạn là niềm vui của chúng tôi
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1 text-sm sm:gap-2">
            <Link
              className="rounded-full px-4 py-2 text-lux-muted hover:bg-lux-surface hover:text-lux-text"
              href="/"
            >
              Trang chủ
            </Link>
            <Link
              className="rounded-full px-4 py-2 text-lux-muted hover:bg-lux-surface hover:text-lux-text"
              href="/cars"
            >
              Danh sách xe
            </Link>
            <Link
              className="rounded-full px-4 py-2 text-lux-muted hover:bg-lux-surface hover:text-lux-text"
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

