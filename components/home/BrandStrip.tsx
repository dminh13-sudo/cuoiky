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
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-gray-900">Hãng xe phổ biến</div>
          <div className="text-sm text-gray-600">
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
              className="group flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 transition-colors hover:bg-white"
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-lg border border-gray-200 bg-white">
                <Image
                  src={`/brands/${slug}.svg`}
                  alt={`${brand} logo`}
                  fill
                  className="object-contain p-1"
                />
              </span>
              <span className="text-sm font-medium text-gray-900 group-hover:text-black">
                {brand}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

