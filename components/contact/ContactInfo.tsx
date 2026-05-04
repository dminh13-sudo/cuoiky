import Link from "next/link";

type Props = {
  address: string;
  hotline: string;
  openHours: string;
  mapEmbedUrl: string;
};

export function ContactInfo({ address, hotline, openHours, mapEmbedUrl }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-lg font-semibold text-gray-900">Thông tin liên hệ</div>
      <div className="mt-1 text-sm text-gray-600">
        Kết nối trực tiếp để được tư vấn nhanh và đặt lịch lái thử.
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-xs font-medium text-gray-600">Hotline</div>
          <div className="mt-1 text-base font-semibold text-gray-900">{hotline}</div>
          <div className="mt-2">
            <Link
              href={`tel:${hotline.replace(/\s+/g, "")}`}
              className="inline-flex rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
            >
              Gọi ngay
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-xs font-medium text-gray-600">Địa chỉ showroom</div>
          <div className="mt-1 text-sm text-gray-900">{address}</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-xs font-medium text-gray-600">Giờ mở cửa</div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Mở cửa: {openHours}
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
              Hỗ trợ đặt lịch nhanh
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
        <iframe
          title="Showroom map"
          src={mapEmbedUrl}
          className="h-[320px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

