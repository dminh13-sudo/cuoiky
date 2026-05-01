import { notFound } from "next/navigation";

import { fetchCarById } from "@/components/cars/api";
import CarHeroImage from "@/components/cars/CarHeroImage";
import { formatCurrencyUSD } from "@/components/cars/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const car = await fetchCarById(id);

  if (!car) notFound();

  const specsEntries = Object.entries(car.specs ?? {}).filter(
    ([, v]) => v !== null && v !== undefined && v !== ""
  );

  const features = (car.features ?? []).filter(Boolean);
  const colors = (car.colors ?? []).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <CarHeroImage
              src={car.image}
              alt={car.name}
              className="h-[320px] w-full object-cover md:h-[420px]"
            />
          </div>

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
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Thông số kỹ thuật
            </h2>
            {specsEntries.length ? (
              <dl className="mt-4 divide-y divide-gray-100">
                {specsEntries.map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-sm font-medium text-gray-600">{k}</dt>
                    <dd className="text-sm text-gray-900">
                      {typeof v === "boolean" ? (v ? "Có" : "Không") : String(v)}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="mt-4 text-gray-500">
                Chưa có dữ liệu thông số kỹ thuật.
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5">
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
          </section>
        </div>
      </div>
    </div>
  );
}

