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
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-4">
        <Title level={3} className="!mb-1">
          Xe nổi bật
        </Title>
        <Text type="secondary">Top lựa chọn được quan tâm nhiều</Text>
      </div>

      <CarGrid cars={cars} loading={false} />
    </div>
  );
}

