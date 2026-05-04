import { notFound } from "next/navigation";

import { getCarById } from "@/services/carService";
import { formatCurrencyUSD } from "@/components/cars/utils";
import { CarMediaGallery } from "@/components/product/CarMediaGallery";
import { FinanceCalculator } from "@/components/product/FinanceCalculator";
import { TechnicalSpecsTabs } from "@/components/product/TechnicalSpecsTabs";
import { TestDriveForm } from "@/components/product/TestDriveForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) notFound();

  const features = (car.features ?? []).filter(Boolean);
  const colors = (car.colors ?? []).filter(Boolean);

  const galleryImages = Array.from(
    new Set(
      [
        // Best-effort support for APIs that return multiple images
        ...(Array.isArray((car as any).images) ? ((car as any).images as string[]) : []),
        ...(Array.isArray((car as any).gallery) ? ((car as any).gallery as string[]) : []),
        car.image,
      ].filter(Boolean)
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CarMediaGallery name={car.name} images={galleryImages} />

          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="text-sm text-gray-500">
                {car.brand} • {car.category} • {car.year}
              </div>
              <h1 className="mt-1 text-2xl font-semibold text-gray-900">
                {car.name}
              </h1>
              <div className="mt-3 text-3xl font-bold text-gray-900">
                {formatCurrencyUSD(car.price)}
              </div>

              {car.description ? (
                <p className="mt-4 leading-relaxed text-gray-700">
                  {car.description}
                </p>
              ) : (
                <p className="mt-4 text-gray-500">Mô tả đang được cập nhật.</p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-gray-900">Màu sắc</h2>
              {colors.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-3 text-gray-500">Chưa có dữ liệu màu sắc.</div>
              )}
            </div>

            <FinanceCalculator defaultPrice={car.price} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">Thông số kỹ thuật</h2>
            <div className="mt-3">
              <TechnicalSpecsTabs specs={car.specs} />
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-gray-900">Tính năng</h2>
              {features.length ? (
                <ul className="mt-4 space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2 text-gray-800">
                      <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-gray-900" />
                      <span className="text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 text-gray-500">Chưa có dữ liệu tính năng.</div>
              )}
            </div>

            <TestDriveForm carId={car.id} carName={car.name} />
          </section>
        </div>
      </div>
    </div>
  );
}

