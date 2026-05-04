import Link from "next/link";

import type { Car } from "@/components/cars/types";
import { getCars } from "@/services/carService";

import { BrandStrip } from "@/components/home/BrandStrip";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { HomeHero } from "@/components/home/HomeHero";

function pickFeaturedCars(cars: Car[], take: number) {
  const explicit = cars.filter((c) => c.isFeatured);
  if (explicit.length >= 3) return explicit.slice(0, take);

  return [...cars]
    .sort((a, b) => {
      const yearDiff = (b.year ?? 0) - (a.year ?? 0);
      if (yearDiff !== 0) return yearDiff;
      return (b.price ?? 0) - (a.price ?? 0);
    })
    .slice(0, take);
}

export default async function Page() {
  const cars = await getCars();

  const brands = Array.from(new Set(cars.map((c) => c.brand).filter(Boolean))).sort();
  const categories = Array.from(new Set(cars.map((c) => c.category).filter(Boolean))).sort();
  const prices = cars.map((c) => c.price).filter((p) => Number.isFinite(p));
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const featuredCars = pickFeaturedCars(cars, 6);

  return (
    <main className="min-h-screen bg-gray-50">
      <HomeHero
        brands={brands}
        categories={categories}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-8">
        <BrandStrip brands={brands} />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10">
        <FeaturedCars cars={featuredCars} />

        <div className="mt-8 flex justify-center">
          <Link
            href="/cars"
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            Xem tất cả xe
          </Link>
        </div>
      </section>
    </main>
  );
}