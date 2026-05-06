"use client";

import { Image } from "antd";
import { useMemo, useState } from "react";

type Props = {
  name: string;
  images: string[];
};

function normalizeImages(images: string[]) {
  const cleaned = images
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter(Boolean);
  return cleaned.length ? cleaned : ["/car-placeholder.svg"];
}

export function CarMediaGallery({ name, images }: Props) {
  const list = useMemo(() => normalizeImages(images), [images]);
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-lux-line bg-lux-card">
        <Image.PreviewGroup>
          <Image
            src={list[active]}
            alt={name}
            className="!h-[320px] !w-full object-cover md:!h-[420px]"
            fallback="/car-placeholder.svg"
            preview={{ mask: "Xem toàn màn hình / Zoom" }}
          />
        </Image.PreviewGroup>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {list.slice(0, 12).map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            onClick={() => setActive(idx)}
            className={[
              "overflow-hidden rounded-xl border bg-lux-card transition-colors",
              idx === active
                ? "border-lux-gold/70 shadow-[0_0_0_1px_rgba(201,162,39,0.18)_inset]"
                : "border-lux-line hover:border-lux-gold/40",
            ].join(" ")}
            aria-label={`Xem ảnh ${idx + 1}`}
          >
            {/* AntD Image thumbnail: keep it simple + fallback */}
            <Image
              src={src}
              alt={`${name} thumbnail ${idx + 1}`}
              preview={false}
              fallback="/car-placeholder.svg"
              className="!h-16 !w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

