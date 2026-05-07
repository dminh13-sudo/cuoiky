import { notFound } from "next/navigation";

import { getCarById } from "@/services/carService";
import { formatCurrencyUSD } from "@/components/cars/utils";
import { CarMediaGallery } from "@/components/product/CarMediaGallery";
import { FinanceCalculator } from "@/components/product/FinanceCalculator";
import { TechnicalSpecsTabs } from "@/components/product/TechnicalSpecsTabs";
import { TestDriveForm } from "@/components/product/TestDriveForm";
import type { Car } from "@/components/cars/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

function buildFallbackSpecs(car: Car) {
  const specs: Record<string, string | number | boolean> = {};

  // Basic
  specs["Hãng"] = car.brand;
  specs["Dòng xe"] = car.category;
  specs["Năm sản xuất"] = car.year;
  if (car.fuelType) specs["Nhiên liệu"] = car.fuelType;

  // Reasonable generic defaults (display-only) when API lacks structured specs
  specs["Hộp số"] = "Tự động";
  specs["Dẫn động"] = "RWD/AWD (tùy phiên bản)";
  specs["Mức tiêu thụ (ước tính)"] = "7–10 L/100km (tùy điều kiện)";
  specs["Số chỗ"] = "5";

  // Safety / comfort placeholders
  specs["ABS"] = true;
  specs["ESP"] = true;
  specs["Camera lùi"] = true;
  specs["Điều hòa"] = "Tự động";
  specs["Màn hình trung tâm"] = "10–12 inch (tùy phiên bản)";

  return specs;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) notFound();

  const features = (car.features ?? []).filter(Boolean);
  const colors = (car.colors ?? []).filter(Boolean);

  const carMedia = car as Car & { images?: unknown; gallery?: unknown };
  const extraImages = Array.isArray(carMedia.images)
    ? carMedia.images.filter((x): x is string => typeof x === "string")
    : [];
  const extraGallery = Array.isArray(carMedia.gallery)
    ? carMedia.gallery.filter((x): x is string => typeof x === "string")
    : [];

  const galleryImages = Array.from(
    new Set(
      [
        // Best-effort support for APIs that return multiple images
        ...extraImages,
        ...extraGallery,
        car.image,
      ].filter(Boolean)
    )
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <CarMediaGallery name={car.name} images={galleryImages} />

        <div className="min-w-0 space-y-4">
          <div className="rounded-2xl border border-lux-line bg-lux-card p-4 shadow-[0_10px_24px_rgba(0,0,0,0.3)] sm:p-5">
            <div className="text-sm text-lux-muted">
              {car.brand} • {car.category} • {car.year}
            </div>
            <h1 className="mt-1 break-words text-2xl font-semibold text-lux-text">{car.name}</h1>
            <div className="mt-3 break-words text-2xl font-bold text-lux-text sm:text-3xl">
              {formatCurrencyUSD(car.price)}
            </div>

            {car.description ? (
              <p className="mt-4 leading-relaxed text-lux-muted">{car.description}</p>
            ) : (
              <p className="mt-4 text-lux-muted">Mô tả đang được cập nhật.</p>
            )}
          </div>

          <div className="rounded-2xl border border-lux-line bg-lux-card p-4 shadow-[0_10px_24px_rgba(0,0,0,0.3)] sm:p-5">
            <h2 className="text-lg font-semibold text-lux-text">Màu sắc</h2>
            {colors.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {colors.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-lux-line bg-lux-surface px-3 py-1 text-sm text-lux-text"
                  >
                    {c}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-3 text-lux-muted">Chưa có dữ liệu màu sắc.</div>
            )}
          </div>

          <FinanceCalculator defaultPrice={car.price} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="min-w-0 rounded-2xl border border-lux-line bg-lux-card p-4 shadow-[0_10px_24px_rgba(0,0,0,0.3)] sm:p-5">
          <h2 className="text-lg font-semibold text-lux-text">Thông số kỹ thuật</h2>
          <div className="mt-3">
            <TechnicalSpecsTabs specs={car.specs ?? buildFallbackSpecs(car)} />
          </div>
        </section>

        <section className="min-w-0 space-y-6">
          <div className="rounded-2xl border border-lux-line bg-lux-card p-4 shadow-[0_10px_24px_rgba(0,0,0,0.3)] sm:p-5">
            <h2 className="text-lg font-semibold text-lux-text">Tính năng</h2>
            {features.length ? (
              <ul className="mt-4 space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex gap-2 text-lux-text">
                    <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-lux-gold" />
                    <span className="text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 text-lux-muted">Chưa có dữ liệu tính năng.</div>
            )}
          </div>

          <TestDriveForm carId={car.id} carName={car.name} />
        </section>
      </div>
    </div>
  );
}

