"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  brands: string[];
};

const FALLBACK_BRANDS = ["Toyota", "Mercedes", "Lamborghini", "BMW", "Audi", "Porsche"];

function toBrandSlug(brand: string) {
  return brand
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BrandStrip({ brands }: Props) {
  const router = useRouter();
  const list = (brands.length ? brands : FALLBACK_BRANDS).slice(0, 12);

  return (
    <div className="rounded-2xl border border-lux-line bg-lux-card p-5 shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-lux-text">Hãng xe phổ biến</div>
          <div className="text-sm text-lux-muted">
            Chọn logo để lọc nhanh danh sách xe theo hãng
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {list.map((brand) => {
          const slug = toBrandSlug(brand);
          return (
            <button
              key={brand}
              type="button"
              onClick={() => router.push(`/cars?brand=${encodeURIComponent(brand)}`)}
              className="group flex items-center justify-center gap-3 rounded-xl border border-lux-line bg-lux-surface px-3 py-3 transition-colors hover:border-lux-gold/40 hover:bg-lux-card"
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-lg border border-lux-line bg-lux-card">
                <Image
                  src={`/brands/${slug}.svg`}
                  alt={`${brand} logo`}
                  fill
                  className="object-contain p-1"
                />
              </span>
              <span className="text-sm font-medium text-lux-text group-hover:text-lux-goldSoft">
                {brand}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

