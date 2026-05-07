import Link from "next/link";

type Props = {
  address: string;
  hotline: string;
  openHours: string;
  mapEmbedUrl: string;
};

export function ContactInfo({ address, hotline, openHours, mapEmbedUrl }: Props) {
  return (
    <div className="min-w-0 rounded-2xl border border-lux-line bg-lux-card p-4 shadow-[0_10px_24px_rgba(0,0,0,0.3)] sm:p-5">
      <div className="text-lg font-semibold text-lux-text">Thông tin liên hệ</div>
      <div className="mt-1 text-sm text-lux-muted">
        Kết nối trực tiếp để được tư vấn nhanh và đặt lịch lái thử.
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        <div className="rounded-xl border border-lux-line bg-lux-surface p-4">
          <div className="text-xs font-medium text-lux-muted">Hotline</div>
          <div className="mt-1 break-words text-base font-semibold text-lux-text">{hotline}</div>
          <div className="mt-2">
            <Link
              href={`tel:${hotline.replace(/\s+/g, "")}`}
              className="inline-flex rounded-full border border-lux-gold/40 bg-lux-gold px-4 py-2 text-sm font-semibold text-black hover:bg-lux-goldSoft"
            >
              Gọi ngay
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-lux-line bg-lux-surface p-4">
          <div className="text-xs font-medium text-lux-muted">Địa chỉ showroom</div>
          <div className="mt-1 break-words text-sm text-lux-text">{address}</div>
        </div>

        <div className="rounded-xl border border-lux-line bg-lux-surface p-4">
          <div className="text-xs font-medium text-lux-muted">Giờ mở cửa</div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-lux-card px-3 py-1 text-xs font-semibold text-lux-goldSoft ring-1 ring-lux-line">
              Mở cửa: {openHours}
            </span>
            <span className="inline-flex items-center rounded-full bg-lux-card px-3 py-1 text-xs font-semibold text-lux-text ring-1 ring-lux-line">
              Hỗ trợ đặt lịch nhanh
            </span>
            <Link
              href="/warranty"
              className="inline-flex items-center rounded-full bg-lux-card px-3 py-1 text-xs font-semibold text-lux-text ring-1 ring-lux-line hover:bg-lux-surface"
            >
              Bảo hành/Bảo dưỡng định kỳ
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-lux-line">
        <iframe
          title="Showroom map"
          src={mapEmbedUrl}
          className="h-[240px] w-full sm:h-[320px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

