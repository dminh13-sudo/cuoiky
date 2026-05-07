"use client";

import Link from "next/link";
import { Card, Empty, Skeleton, Tag } from "antd";

import type { Car } from "./types";
import { formatCurrencyUSD } from "./utils";

type Props = {
  cars: Car[];
  loading: boolean;
};

export function CarGrid({ cars, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="rounded-xl border border-lux-line bg-lux-card p-3">
            <Skeleton.Image active className="!w-full !h-[160px]" />
            <div className="mt-3">
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="rounded-xl border border-lux-line bg-lux-card p-10">
        <Empty description="Không tìm thấy xe phù hợp" />
      </div>
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {cars.map((car) => (
        <Link key={car.id} href={`/product/${car.id}`} className="block">
          <Card
            className="h-full border border-lux-line bg-lux-card text-lux-text transition-shadow hover:shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
            cover={
              // AntD Card cover expects a normal <img> tag.
              // Next/Image is possible, but not required for this assignment.
              <img
                src={car.image}
                alt={car.name}
                className="h-44 w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/car-placeholder.svg";
                }}
              />
            }
          >
            <div className="min-w-0 space-y-2">
              <div className="line-clamp-2 break-words text-base font-semibold">{car.name}</div>
              <div className="flex flex-wrap gap-2">
                <Tag color="blue">{car.brand}</Tag>
                <Tag>{car.category}</Tag>
                <Tag color="green">{car.year}</Tag>
              </div>
              <div className="break-words text-lg font-bold">{formatCurrencyUSD(car.price)}</div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

