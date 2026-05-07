"use client";

import { Alert, Button, Pagination, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";

import { getCars } from "@/services/carService";
import { CarFilters, type CarFiltersValue } from "./CarFilters";
import { CarGrid } from "./CarGrid";
import type { Car } from "./types";

const { Title, Text } = Typography;

const PAGE_SIZE = 8;

type Props = {
  initialFilters?: Partial<CarFiltersValue>;
};

export default function CarListingPage({ initialFilters }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);

  const derived = useMemo(() => {
    const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
    const categories = Array.from(new Set(cars.map((c) => c.category))).sort();
    const prices = cars.map((c) => c.price).filter((p) => Number.isFinite(p));
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    return { brands, categories, minPrice, maxPrice };
  }, [cars]);

  const [filters, setFilters] = useState<CarFiltersValue>(() => ({
    q: initialFilters?.q ?? "",
    brand: initialFilters?.brand,
    categories: initialFilters?.categories ?? [],
    priceRange: initialFilters?.priceRange ?? [0, 0],
  }));

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCars();
        if (cancelled) return;
        setCars(data);
      } catch (e) {
        if (cancelled) return;
        setCars([]);
        setError(e instanceof Error ? e.message : "Không thể tải dữ liệu xe.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Initialize slider range once we know dataset min/max.
    setFilters((prev) => {
      const hasIncomingRange =
        Array.isArray(prev.priceRange) &&
        Number.isFinite(prev.priceRange[0]) &&
        Number.isFinite(prev.priceRange[1]) &&
        (prev.priceRange[0] !== 0 || prev.priceRange[1] !== 0);

      return {
        ...prev,
        priceRange: hasIncomingRange ? prev.priceRange : [derived.minPrice, derived.maxPrice],
      };
    });
  }, [derived.minPrice, derived.maxPrice]);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const [minP, maxP] = filters.priceRange;

    return cars.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q)) return false;
      if (filters.brand && c.brand !== filters.brand) return false;
      if (filters.categories.length > 0 && !filters.categories.includes(c.category))
        return false;
      if (Number.isFinite(minP) && c.price < minP) return false;
      if (Number.isFinite(maxP) && c.price > maxP) return false;
      return true;
    });
  }, [cars, filters]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);

  const pagedCars = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  useEffect(() => {
    // If filters reduce results, keep page valid.
    if (page !== safePage) setPage(safePage);
  }, [page, safePage]);

  return (
    <div className="min-h-screen bg-lux-bg text-lux-text">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-6">
        <div className="mb-5">
          <Title level={2} className="!mb-1 !text-lux-text">
            Danh sách xe
          </Title>
          <Text className="!text-lux-muted">
            {loading ? "Đang tải dữ liệu..." : `Tìm thấy ${total} xe`}
          </Text>
        </div>

        {error ? (
          <div className="mb-4">
            <Alert
              type="error"
              showIcon
              message="Có lỗi khi tải dữ liệu"
              description={error}
              action={
                <Button
                  size="small"
                  onClick={() => {
                    setPage(1);
                    setLoading(true);
                    setError(null);
                    void (async () => {
                      try {
                        const data = await getCars();
                        setCars(data);
                      } catch (e) {
                        setCars([]);
                        setError(e instanceof Error ? e.message : "Không thể tải dữ liệu xe.");
                      } finally {
                        setLoading(false);
                      }
                    })();
                  }}
                >
                  Thử lại
                </Button>
              }
            />
          </div>
        ) : null}

        <div className="flex min-w-0 flex-col gap-4 lg:flex-row">
          <CarFilters
            value={filters}
            brands={derived.brands}
            categories={derived.categories}
            minPrice={derived.minPrice}
            maxPrice={derived.maxPrice}
            onChange={(next) => {
              setFilters(next);
              setPage(1);
            }}
          />

          <main className="min-w-0 w-full lg:w-3/4">
            <div className="rounded-xl border border-lux-line bg-lux-card p-3 shadow-[0_10px_24px_rgba(0,0,0,0.3)] sm:p-4">
              <CarGrid cars={pagedCars} loading={loading} />

              <div className="mt-6 flex justify-center overflow-x-auto pb-1">
                <Pagination
                  current={safePage}
                  total={total}
                  pageSize={PAGE_SIZE}
                  showSizeChanger={false}
                  onChange={(p) => setPage(p)}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

