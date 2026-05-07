"use client";

import { Alert, Button, Card, Switch, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import { getTestDriveRequests, updateTestDriveRequest, type TestDriveRequest } from "@/services/testDriveService";

export function TestDriveManagementTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<TestDriveRequest[]>([]);

  async function reload() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTestDriveRequests();
      setItems(data);
    } catch (e) {
      setItems([]);
      setError(e instanceof Error ? e.message : "Không thể tải danh sách lái thử.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  const columns: ColumnsType<TestDriveRequest> = [
    { title: "Khách hàng", dataIndex: "fullName", key: "fullName", width: 200 },
    { title: "Email", dataIndex: "email", key: "email", width: 220 },
    { title: "SĐT", dataIndex: "phone", key: "phone", width: 140 },
    { title: "Xe", dataIndex: "carName", key: "carName", width: 260 },
    { title: "Ngày mong muốn", dataIndex: "preferredDate", key: "preferredDate", width: 170 },
    {
      title: "Trạng thái",
      key: "arrived",
      width: 210,
      render: (_, r) => (
        <div className="flex items-center gap-2">
          <Tag color={r.arrived ? "green" : "default"}>{r.arrived ? "Đã đến" : "Chưa đến"}</Tag>
          <Switch
            checked={Boolean(r.arrived)}
            onChange={(checked) => {
              const arrivedAt = checked ? new Date().toISOString() : undefined;
              setItems((prev) =>
                prev.map((x) => (x.id === r.id ? { ...x, arrived: checked, arrivedAt } : x))
              );
              void updateTestDriveRequest(r.id, { arrived: checked, arrivedAt }).catch(() => void reload());
            }}
          />
        </div>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      render: (v) => <span className="line-clamp-2">{v || "-"}</span>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 190,
      render: (v) => (v ? new Date(String(v)).toLocaleString() : "-"),
    },
    {
      title: "Đến lúc",
      dataIndex: "arrivedAt",
      key: "arrivedAt",
      width: 190,
      render: (v) => (v ? new Date(String(v)).toLocaleString() : "-"),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xl font-semibold text-lux-text">Đăng ký lái thử</div>
          <div className="text-sm text-lux-muted">
            Danh sách khách hàng gửi từ trang chi tiết xe
          </div>
        </div>
        <Button className="self-start md:self-auto" onClick={() => void reload()} disabled={loading}>
          Tải lại
        </Button>
      </div>

      {error ? (
        <div className="mb-4">
          <Alert
            type="error"
            showIcon
            message="Không thể tải dữ liệu"
            description={error}
            action={
              <Button size="small" onClick={() => void reload()}>
                Thử lại
              </Button>
            }
          />
        </div>
      ) : null}

      <Card
        className="overflow-hidden rounded-2xl border border-lux-line bg-lux-card"
        styles={{ body: { padding: 0 } }}
      >
        <Table<TestDriveRequest>
          rowKey="id"
          columns={columns}
          dataSource={items}
          loading={loading}
          pagination={{ pageSize: 8 }}
          scroll={{ x: 1280 }}
          locale={{ emptyText: loading ? "Đang tải..." : "Chưa có đăng ký lái thử." }}
        />
      </Card>
    </div>
  );
}

