"use client";

import { Tabs } from "antd";

type SpecValue = string | number | boolean | null | undefined;
type Specs = Record<string, SpecValue>;

type Props = {
  specs?: Specs;
};

function normalizeSpecs(specs: Specs) {
  return Object.entries(specs).filter(([, v]) => v !== null && v !== undefined && v !== "");
}

function renderSpecValue(v: SpecValue) {
  if (typeof v === "boolean") return v ? "Có" : "Không";
  return String(v);
}

function categorizeKey(key: string) {
  const k = key.toLowerCase();

  // Engine / performance
  if (
    k.includes("engine") ||
    k.includes("động cơ") ||
    k.includes("horse") ||
    k.includes("hp") ||
    k.includes("torque") ||
    k.includes("mã lực") ||
    k.includes("momen") ||
    k.includes("tăng tốc") ||
    k.includes("speed") ||
    k.includes("hộp số") ||
    k.includes("transmission")
  ) {
    return "engine";
  }

  // Interior
  if (
    k.includes("interior") ||
    k.includes("nội thất") ||
    k.includes("seat") ||
    k.includes("ghế") ||
    k.includes("leather") ||
    k.includes("da") ||
    k.includes("cabin")
  ) {
    return "interior";
  }

  // Safety
  if (
    k.includes("safety") ||
    k.includes("an toàn") ||
    k.includes("airbag") ||
    k.includes("túi khí") ||
    k.includes("abs") ||
    k.includes("esp") ||
    k.includes("camera") ||
    k.includes("phanh")
  ) {
    return "safety";
  }

  // Comfort / tiện nghi
  if (
    k.includes("comfort") ||
    k.includes("tiện nghi") ||
    k.includes("ac") ||
    k.includes("điều hòa") ||
    k.includes("audio") ||
    k.includes("loa") ||
    k.includes("screen") ||
    k.includes("màn hình") ||
    k.includes("cruise")
  ) {
    return "comfort";
  }

  return "other";
}

function groupSpecs(entries: Array<[string, SpecValue]>) {
  const grouped: Record<string, Array<[string, SpecValue]>> = {
    engine: [],
    interior: [],
    safety: [],
    comfort: [],
    other: [],
  };

  for (const [k, v] of entries) grouped[categorizeKey(k)].push([k, v]);
  return grouped;
}

function SpecsList({ entries }: { entries: Array<[string, SpecValue]> }) {
  if (entries.length === 0) {
    return <div className="text-lux-muted">Chưa có dữ liệu.</div>;
  }

  return (
    <dl className="divide-y divide-lux-line/60">
      {entries.map(([k, v]) => (
        <div key={k} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-4">
          <dt className="break-words text-sm font-medium text-lux-muted">{k}</dt>
          <dd className="break-words text-sm text-lux-text sm:text-right">{renderSpecValue(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TechnicalSpecsTabs({ specs }: Props) {
  const entries = normalizeSpecs(specs ?? {});
  const grouped = groupSpecs(entries);

  return (
    <Tabs
      defaultActiveKey="engine"
      className="max-w-full"
      tabBarGutter={16}
      items={[
        {
          key: "engine",
          label: "Động cơ",
          children: <SpecsList entries={grouped.engine} />,
        },
        {
          key: "interior",
          label: "Nội thất",
          children: <SpecsList entries={grouped.interior} />,
        },
        {
          key: "safety",
          label: "An toàn",
          children: <SpecsList entries={grouped.safety} />,
        },
        {
          key: "comfort",
          label: "Tiện nghi",
          children: <SpecsList entries={grouped.comfort} />,
        },
        {
          key: "other",
          label: "Khác",
          children: <SpecsList entries={grouped.other} />,
        },
      ]}
    />
  );
}

