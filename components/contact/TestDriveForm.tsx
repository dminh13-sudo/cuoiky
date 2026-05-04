"use client";

import { Alert, Button, Card, Form, Input, Select, message } from "antd";
import { useMemo, useState } from "react";

import { createTestDriveRequest } from "@/services/testDriveService";

type Props = {
  carOptions: Array<{ id: string; name: string }>;
};

type FormValues = {
  fullName: string;
  phone: string;
  email?: string;
  carId: string;
  note?: string;
};

const PHONE_REGEX = /^(0|\+84)\d{9,10}$/;

export function TestDriveForm({ carOptions }: Props) {
  const [api, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectOptions = useMemo(
    () => carOptions.map((c) => ({ label: c.name, value: c.id })),
    [carOptions]
  );

  async function onFinish(values: FormValues) {
    try {
      setLoading(true);
      setError(null);

      const picked = carOptions.find((c) => c.id === values.carId);
      await createTestDriveRequest({
        carId: values.carId,
        carName: picked?.name ?? "Unknown",
        fullName: values.fullName,
        phone: values.phone,
        email: values.email ?? "unknown@example.com",
        note: values.note,
      });

      api.success("Đã gửi yêu cầu lái thử. Chúng tôi sẽ liên hệ sớm!");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể gửi yêu cầu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {contextHolder}
      <Card className="rounded-2xl" bodyStyle={{ padding: 20 }}>
        <div className="text-lg font-semibold text-gray-900">Đăng ký lái thử</div>
        <div className="mt-1 text-sm text-gray-600">
          Điền thông tin, chọn mẫu xe để đội ngũ tư vấn xác nhận lịch.
        </div>

        {error ? (
          <div className="mt-4">
            <Alert type="error" showIcon message="Gửi yêu cầu thất bại" description={error} />
          </div>
        ) : null}

        <Form<FormValues>
          layout="vertical"
          requiredMark={false}
          className="mt-4"
          onFinish={(v) => void onFinish(v)}
          initialValues={{ carId: carOptions[0]?.id }}
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  validator: async (_, value) => {
                    if (!value) return;
                    if (!PHONE_REGEX.test(String(value).trim())) {
                      throw new Error("Số điện thoại không hợp lệ (vd: 090xxxxxxx hoặc +8490xxxxxxx)");
                    }
                  },
                },
              ]}
            >
              <Input placeholder="0901234567" />
            </Form.Item>

            <Form.Item
              label="Email (tuỳ chọn)"
              name="email"
              rules={[{ type: "email", message: "Email không hợp lệ" }]}
            >
              <Input placeholder="name@example.com" />
            </Form.Item>
          </div>

          <Form.Item
            label="Chọn dòng xe muốn lái thử"
            name="carId"
            rules={[{ required: true, message: "Vui lòng chọn dòng xe" }]}
          >
            <Select
              showSearch
              placeholder="Chọn xe"
              options={selectOptions}
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea rows={4} placeholder="Khung giờ, địa điểm, yêu cầu thêm..." />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="!h-11 !rounded-xl !bg-gray-900 hover:!bg-black"
          >
            {loading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu"}
          </Button>
        </Form>
      </Card>
    </>
  );
}

