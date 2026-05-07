"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button, Select, Slider, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

type Props = {
  brands: string[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
};

function clampPriceRange(value: [number, number], min: number, max: number): [number, number] {
  const safeMax = Math.max(min + 1, max);
  const low = Math.max(min, Math.min(value[0], safeMax));
  const high = Math.max(low, Math.min(value[1], safeMax));
  return [low, high];
}

export function HomeHero({ brands, categories, minPrice, maxPrice }: Props) {
  const router = useRouter();

  const normalizedMin = Number.isFinite(minPrice) ? minPrice : 0;
  const normalizedMax = Number.isFinite(maxPrice) ? maxPrice : 0;
  const sliderMax = Math.max(normalizedMin + 1, normalizedMax);

  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    normalizedMin,
    normalizedMax,
  ]);

  const brandOptions = useMemo(
    () => brands.map((b) => ({ label: b, value: b })),
    [brands]
  );
  const categoryOptions = useMemo(
    () => categories.map((c) => ({ label: c, value: c })),
    [categories]
  );

  function goSearch(next?: {
    brand?: string;
    category?: string;
    priceRange?: [number, number];
  }) {
    const b = next?.brand ?? brand;
    const c = next?.category ?? category;
    const pr = clampPriceRange(next?.priceRange ?? priceRange, normalizedMin, sliderMax);

    const qs = new URLSearchParams();
    if (b) qs.set("brand", b);
    if (c) qs.set("categories", c);
    if (Number.isFinite(pr[0])) qs.set("minPrice", String(pr[0]));
    if (Number.isFinite(pr[1])) qs.set("maxPrice", String(pr[1]));

    router.push(qs.size ? `/cars?${qs.toString()}` : "/cars");
  }

  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div
        className={[
          "absolute inset-0 transition-transform duration-1000 will-change-transform",
          "scale-[1.06]",
        ].join(" ")}
      >
        <Image
          src="/hero-car.svg"
          alt="Car showroom banner"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/85" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-64px)] w-full max-w-7xl flex-col justify-end px-3 pb-8 pt-16 sm:px-4 sm:pb-12 sm:pt-20 lg:min-h-[82vh]">
        <div className="max-w-2xl">
          <Title className="!mb-3 !text-3xl !text-white sm:!text-5xl" level={1}>
            Showroom xe cao cấp.
          </Title>
          <Text className="text-sm !text-white/80 sm:text-base">
            Tìm kiếm theo hãng, loại xe và ngân sách. Chọn xe phù hợp và xem chi tiết ngay.
          </Text>
        </div>

        <div className="mt-6 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur sm:mt-8 sm:p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="md:col-span-1">
              <Text className="!text-white/90" strong>
                Hãng xe
              </Text>
              <Select
                className="mt-2 w-full"
                allowClear
                placeholder="Chọn hãng"
                value={brand}
                options={brandOptions}
                onChange={(v) => setBrand(v)}
                onClear={() => setBrand(undefined)}
              />
            </div>

            <div className="md:col-span-1">
              <Text className="!text-white/90" strong>
                Loại xe
              </Text>
              <Select
                className="mt-2 w-full"
                allowClear
                placeholder="Chọn loại"
                value={category}
                options={categoryOptions}
                onChange={(v) => setCategory(v)}
                onClear={() => setCategory(undefined)}
              />
            </div>

            <div className="md:col-span-1">
              <Text className="!text-white/90" strong>
                Khoảng giá
              </Text>
              <div className="mt-2 rounded-xl bg-white/5 px-3 py-2">
                <Slider
                  range
                  min={normalizedMin}
                  max={sliderMax}
                  value={clampPriceRange(priceRange, normalizedMin, sliderMax)}
                  onChange={(v) =>
                    setPriceRange(clampPriceRange(v as [number, number], normalizedMin, sliderMax))
                  }
                />
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>${normalizedMin.toLocaleString("en-US")}</span>
                  <span>${normalizedMax.toLocaleString("en-US")}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 md:flex md:items-end">
              <Button
                type="primary"
                className="!h-11 !w-full !rounded-xl !font-semibold"
                onClick={() => goSearch()}
              >
                Tìm xe ngay
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/70">
            <span className="rounded-full bg-white/10 px-3 py-1">
              Mẹo: click logo hãng bên dưới để lọc nhanh
            </span>
            <button
              type="button"
              className="rounded-full bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
              onClick={() => {
                setBrand(undefined);
                setCategory(undefined);
                setPriceRange([normalizedMin, sliderMax]);
              }}
            >
              Xoá bộ lọc
            </button>
            <button
              type="button"
              className="rounded-full bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
              onClick={() => goSearch({ brand: "Toyota" })}
            >
              Toyota
            </button>
            <button
              type="button"
              className="rounded-full bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
              onClick={() => goSearch({ brand: "Mercedes" })}
            >
              Mercedes
            </button>
            <button
              type="button"
              className="rounded-full bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
              onClick={() => goSearch({ brand: "Lamborghini" })}
            >
              Lamborghini
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

