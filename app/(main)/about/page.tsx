const STATS = [
  { label: "Xe đã bán", value: "1000+" },
  { label: "Năm kinh nghiệm", value: "10+" },
  { label: "Khách hàng hài lòng", value: "98%" },
  { label: "Đối tác bảo dưỡng", value: "25+" },
];

const CORE_VALUES = [
  {
    title: "Uy tín & minh bạch",
    desc: "Hồ sơ xe rõ ràng, tư vấn trung thực và chính sách hậu mãi nhất quán.",
  },
  {
    title: "Chất lượng xe",
    desc: "Kiểm định kỹ lưỡng, ưu tiên xe có lịch sử bảo dưỡng đầy đủ và tình trạng tốt.",
  },
  {
    title: "Dịch vụ hậu mãi",
    desc: "Hỗ trợ bảo dưỡng, chăm sóc xe và tư vấn phụ kiện theo nhu cầu sử dụng.",
  },
];

const TEAM = [
  { name: "Đỗ Đạt Minh", role: "Tư vấn bán hàng", exp: "—", specialty: "Tư vấn chọn xe & trải nghiệm" },
  { name: "Hồng Ngọc Minh Tài", role: "Kỹ thuật viên", exp: "—", specialty: "Kiểm định & hậu mãi" },
];

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 sm:py-10">
      <div className="rounded-2xl border border-lux-line bg-lux-card p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold text-lux-text">Hồ sơ năng lực Showroom AutoCar</h1>
          <p className="mt-3 text-lux-muted">
            AutoCar hướng tới trải nghiệm mua xe cao cấp minh bạch, nhanh gọn và tin cậy. Chúng tôi
            tập trung vào chất lượng xe, hậu mãi rõ ràng và quy trình tư vấn chuyên nghiệp.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-lux-line bg-lux-surface p-5 shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
            >
              <div className="text-3xl font-bold text-lux-text">{s.value}</div>
              <div className="mt-1 text-sm text-lux-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-lux-line bg-lux-card p-6 shadow-[0_10px_24px_rgba(0,0,0,0.3)] lg:col-span-1">
          <div className="text-lg font-semibold text-lux-text">Giá trị cốt lõi</div>
          <div className="mt-2 text-sm text-lux-muted">
            Những nguyên tắc giúp chúng tôi giữ vững chất lượng dịch vụ.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:col-span-2 md:grid-cols-3">
          {CORE_VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-lux-line bg-lux-card p-6 shadow-[0_10px_24px_rgba(0,0,0,0.3)]"
            >
              <div className="text-base font-semibold text-lux-text">{v.title}</div>
              <div className="mt-2 text-sm text-lux-muted">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-lux-line bg-lux-card p-6 shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
        <div className="text-lg font-semibold text-lux-text">Đội ngũ chuyên gia</div>
        <div className="mt-2 text-sm text-lux-muted">
          Tư vấn viên và kỹ thuật viên giàu kinh nghiệm, hỗ trợ từ chọn xe đến hậu mãi.
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {TEAM.map((m) => (
            <div key={m.name} className="rounded-2xl border border-lux-line bg-lux-surface p-5">
              <div className="text-base font-semibold text-lux-text">{m.name}</div>
              <div className="mt-1 text-sm text-lux-muted">{m.role}</div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-lux-card px-3 py-1 font-semibold text-lux-text ring-1 ring-lux-line">
                  Kinh nghiệm: {m.exp}
                </span>
                <span className="rounded-full bg-lux-card px-3 py-1 font-semibold text-lux-text ring-1 ring-lux-line">
                  {m.specialty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
