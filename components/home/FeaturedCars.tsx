"use client";

import { Typography } from "antd";

import { CarGrid } from "@/components/cars/CarGrid";
import type { Car } from "@/components/cars/types";

const { Title, Text } = Typography;

type Props = {
  cars: Car[];
};

export function FeaturedCars({ cars }: Props) {
  return (
    <div className="rounded-2xl border border-lux-line bg-lux-card p-5 shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
      <div className="mb-4">
        <Title level={3} className="!mb-1 !text-lux-text">
          Xe nổi bật
        </Title>
        <Text className="!text-lux-muted">Top lựa chọn được quan tâm nhiều</Text>
      </div>

      <CarGrid cars={cars} loading={false} />
    </div>
  );
}

