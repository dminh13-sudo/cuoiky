import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-lux-text">Bảo hành & Bảo dưỡng định kỳ</h1>
        <p className="mt-2 text-lux-muted">
          Thông tin tham khảo về bảo hành và lịch bảo dưỡng để xe luôn vận hành tối ưu.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-lux-line bg-lux-card p-6 shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
          <h2 className="text-lg font-semibold text-lux-text">Bảo hành</h2>
          <ul className="mt-3 space-y-2 text-sm text-lux-muted">
            <li>- Thời hạn bảo hành tùy theo hãng và model xe.</li>
            <li>- Áp dụng cho lỗi kỹ thuật do nhà sản xuất, theo điều kiện bảo hành.</li>
            <li>- Khuyến nghị lưu giữ hóa đơn/bảo dưỡng định kỳ để đối soát khi cần.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-lux-line bg-lux-card p-6 shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
          <h2 className="text-lg font-semibold text-lux-text">Bảo dưỡng định kỳ</h2>
          <ul className="mt-3 space-y-2 text-sm text-lux-muted">
            <li>- Thay dầu/kiểm tra cơ bản: mỗi 5.000–10.000 km (tùy khuyến nghị hãng).</li>
            <li>- Lọc gió điều hòa, lọc gió động cơ: kiểm tra theo chu kỳ.</li>
            <li>- Má phanh, lốp, nước làm mát: kiểm tra định kỳ để đảm bảo an toàn.</li>
          </ul>
        </section>
      </div>

      <div className="mt-6 rounded-2xl border border-lux-line bg-lux-surface p-5">
        <div className="text-sm text-lux-muted">
          Bạn cần hỗ trợ đặt lịch bảo dưỡng/bảo hành? Vui lòng quay lại trang liên hệ để đặt lịch nhanh.
        </div>
        <div className="mt-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full border border-lux-gold/40 bg-lux-gold px-4 py-2 text-sm font-semibold text-black hover:bg-lux-goldSoft"
          >
            Đi tới trang liên hệ
          </Link>
        </div>
      </div>
    </main>
  );
}

