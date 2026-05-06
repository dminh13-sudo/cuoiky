"use client";

import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { UploadFile } from "antd/es/upload/interface";
import { useEffect, useMemo, useState } from "react";

import type { Car } from "@/components/cars/types";
import { formatCurrencyUSD } from "@/components/cars/utils";
import { createCar, deleteCar, getCars, updateCar } from "@/services/carService";

type CarFormValues = {
  name: string;
  brand: string;
  category: string;
  year: number;
  price: number;
  image: string;
  description?: string;
  isFeatured?: boolean;
};

function normalizeUploadToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Không đọc được file ảnh."));
    reader.readAsDataURL(file);
  });
}

export function CarManagementTable() {
  const [api, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cars, setCars] = useState<Car[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<Car | null>(null);
  const [saving, setSaving] = useState(false);

  const [form] = Form.useForm<CarFormValues>();

  const derivedBrands = useMemo(
    () => Array.from(new Set(cars.map((c) => c.brand))).filter(Boolean).sort(),
    [cars]
  );
  const derivedCategories = useMemo(
    () => Array.from(new Set(cars.map((c) => c.category))).filter(Boolean).sort(),
    [cars]
  );

  async function reload() {
    try {
      setLoading(true);
      setError(null);
      const data = await getCars();
      setCars(data);
    } catch (e) {
      setCars([]);
      setError(e instanceof Error ? e.message : "Không thể tải danh sách xe.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  function openCreate() {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({
      name: "",
      brand: derivedBrands[0] ?? "",
      category: derivedCategories[0] ?? "",
      year: new Date().getFullYear(),
      price: 0,
      image: "",
      description: "",
      isFeatured: false,
    });
    setOpenModal(true);
  }

  function openEdit(car: Car) {
    setEditing(car);
    form.setFieldsValue({
      name: car.name,
      brand: car.brand,
      category: car.category,
      year: car.year,
      price: car.price,
      image: car.image,
      description: car.description,
      isFeatured: Boolean(car.isFeatured),
    });
    setOpenModal(true);
  }

  async function onDelete(id: string) {
    try {
      await deleteCar(id);
      api.success("Đã xoá xe.");
      await reload();
    } catch (e) {
      api.error(e instanceof Error ? e.message : "Xoá xe thất bại.");
    }
  }

  async function onSubmit(values: CarFormValues) {
    try {
      setSaving(true);
      if (editing) {
        await updateCar(editing.id, values);
        api.success("Đã cập nhật xe.");
      } else {
        await createCar(values);
        api.success("Đã tạo xe mới.");
      }
      setOpenModal(false);
      await reload();
    } catch (e) {
      api.error(e instanceof Error ? e.message : "Lưu xe thất bại.");
    } finally {
      setSaving(false);
    }
  }

  const columns: ColumnsType<Car> = [
    {
      title: "Xe",
      dataIndex: "name",
      key: "name",
      render: (_, car) => (
        <div className="flex items-center gap-3">
          <img
            src={car.image || "/car-placeholder.svg"}
            alt={car.name}
            className="h-12 w-16 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/car-placeholder.svg";
            }}
          />
          <div>
            <div className="font-semibold text-lux-text">{car.name}</div>
            <div className="text-xs text-lux-muted">
              {car.brand} • {car.category} • {car.year}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 140,
      render: (v) => <span className="font-medium">{formatCurrencyUSD(Number(v))}</span>,
    },
    {
      title: "Nổi bật",
      dataIndex: "isFeatured",
      key: "isFeatured",
      width: 110,
      render: (v) => (v ? "Yes" : "No"),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 180,
      render: (_, car) => (
        <Space>
          <Button size="small" onClick={() => openEdit(car)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xoá xe này?"
            description="Thao tác này không thể hoàn tác."
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => void onDelete(car.id)}
          >
            <Button size="small" danger>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xl font-semibold text-lux-text">Quản lý xe</div>
          <div className="text-sm text-lux-muted">Quản lý danh sách xe</div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => void reload()} disabled={loading}>
            Tải lại
          </Button>
          <Button type="primary" onClick={openCreate}>
            Thêm xe
          </Button>
        </div>
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

      <Card className="rounded-2xl border border-lux-line bg-lux-card" styles={{ body: { padding: 0 } }}>
        <Table<Car>
          rowKey="id"
          columns={columns}
          dataSource={cars}
          loading={loading}
          pagination={{ pageSize: 8 }}
          locale={{
            emptyText: loading ? "Đang tải..." : "Không có dữ liệu xe.",
          }}
        />
      </Card>

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title={editing ? "Cập nhật xe" : "Thêm xe mới"}
        okText={editing ? "Lưu" : "Tạo"}
        cancelText="Huỷ"
        confirmLoading={saving}
        onOk={() => form.submit()}
        className="admin-light-modal"
        classNames={{
          content: "!bg-white !text-[#111]",
          header: "!bg-white !border-b !border-black/10",
          title: "!text-[#111]",
          body: "!bg-white !text-[#111]",
          footer: "!bg-white !border-t !border-black/10",
          close: "!text-[#111]",
        }}
        styles={{
          content: {
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 18,
            boxShadow: "0 18px 46px rgba(0,0,0,0.25)",
          },
          header: {
            background: "transparent",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
          },
          body: {
            background: "transparent",
          },
          footer: {
            background: "transparent",
            borderTop: "1px solid rgba(0,0,0,0.10)",
          },
        }}
      >
        <Form<CarFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={(v) => void onSubmit(v)}
        >
          <Form.Item
            label="Tên xe"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên xe" }]}
          >
            <Input placeholder="VD: Lamborghini Aventador SVJ" className="!rounded-xl" />
          </Form.Item>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Form.Item
              label="Hãng"
              name="brand"
              rules={[{ required: true, message: "Vui lòng nhập hãng" }]}
            >
              <Select
                showSearch
                placeholder="Chọn/nhập hãng"
                options={derivedBrands.map((b) => ({ label: b, value: b }))}
              />
            </Form.Item>

            <Form.Item
              label="Loại xe"
              name="category"
              rules={[{ required: true, message: "Vui lòng nhập loại xe" }]}
            >
              <Select
                showSearch
                placeholder="Chọn/nhập loại"
                options={derivedCategories.map((c) => ({ label: c, value: c }))}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Form.Item
              label="Năm"
              name="year"
              rules={[{ required: true, message: "Vui lòng nhập năm" }]}
            >
              <InputNumber className="w-full !rounded-xl" min={1900} max={2100} />
            </Form.Item>

            <Form.Item
              label="Giá ($)"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <InputNumber className="w-full !rounded-xl" min={0} step={1000} />
            </Form.Item>
          </div>

          <Form.Item
            label="Ảnh xe (URL hoặc upload)"
            name="image"
            rules={[{ required: true, message: "Vui lòng nhập ảnh" }]}
          >
            <Input placeholder="https://..." className="!rounded-xl" />
          </Form.Item>

          <Form.Item label="Upload ảnh (tự chuyển base64)">
            <Upload
              accept="image/*"
              maxCount={1}
              beforeUpload={async (file) => {
                const dataUrl = await normalizeUploadToDataUrl(file as File);
                form.setFieldValue("image", dataUrl);
                return false;
              }}
              onRemove={() => {
                const current = form.getFieldValue("image");
                if (typeof current === "string" && current.startsWith("data:image")) {
                  form.setFieldValue("image", "");
                }
              }}
              fileList={[] as UploadFile[]}
            >
              <Button>Chọn ảnh</Button>
            </Upload>
            <div className="mt-2 text-xs text-lux-muted">
              Lưu ý: Mock API thường không lưu file thật; upload sẽ chuyển sang base64 để dùng luôn.
            </div>
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} placeholder="Mô tả ngắn..." className="!rounded-xl" />
          </Form.Item>

          <Form.Item label="Nổi bật" name="isFeatured" valuePropName="checked">
            {/* Using native checkbox keeps dependencies minimal */}
            <input type="checkbox" className="h-4 w-4" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

