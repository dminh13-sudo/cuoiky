"use client";

import { Checkbox, Input, Select, Slider, Typography } from "antd";

const { Title, Text } = Typography;

export type CarFiltersValue = {
  q: string;
  brand?: string;
  categories: string[];
  priceRange: [number, number];
};

type Props = {
  value: CarFiltersValue;
  brands: string[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
  onChange: (next: CarFiltersValue) => void;
};

export function CarFilters({
  value,
  brands,
  categories,
  minPrice,
  maxPrice,
  onChange,
}: Props) {
  const normalizedMin = Number.isFinite(minPrice) ? minPrice : 0;
  const normalizedMax = Number.isFinite(maxPrice) ? maxPrice : 0;

  return (
    <aside className="w-full lg:w-1/4 lg:pr-6">
      <div className="rounded-xl border border-lux-line bg-lux-card p-4 shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
        <Title level={4} className="!mb-4 !text-lux-text">
          Bộ lọc
        </Title>

        <div className="space-y-5">
          <div>
            <Text strong className="!text-lux-text">
              Tìm kiếm
            </Text>
            <Input.Search
              className="mt-2"
              allowClear
              placeholder="Nhập tên xe..."
              value={value.q}
              onChange={(e) => onChange({ ...value, q: e.target.value })}
              onSearch={(q) => onChange({ ...value, q })}
            />
          </div>

          <div>
            <Text strong className="!text-lux-text">
              Hãng xe
            </Text>
            <Select
              className="mt-2 w-full"
              allowClear
              placeholder="Chọn hãng"
              value={value.brand}
              options={brands.map((b) => ({ label: b, value: b }))}
              onChange={(brand) => onChange({ ...value, brand })}
            />
          </div>

          <div>
            <Text strong className="!text-lux-text">
              Khoảng giá
            </Text>
            <div className="mt-2 px-2">
              <Slider
                range
                min={normalizedMin}
                max={normalizedMax}
                value={value.priceRange}
                onChange={(priceRange) =>
                  onChange({
                    ...value,
                    priceRange: priceRange as [number, number],
                  })
                }
              />
              <div className="flex items-center justify-between text-xs text-lux-muted">
                <span>${normalizedMin.toLocaleString("en-US")}</span>
                <span>${normalizedMax.toLocaleString("en-US")}</span>
              </div>
            </div>
          </div>

          <div>
            <Text strong className="!text-lux-text">
              Loại xe
            </Text>
            <Checkbox.Group
              className="mt-2 flex flex-col gap-2"
              options={categories.map((c) => ({ label: c, value: c }))}
              value={value.categories}
              onChange={(categories) =>
                onChange({ ...value, categories: categories as string[] })
              }
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

