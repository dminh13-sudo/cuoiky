"use client";

import { Alert, Button, Card, DatePicker, Divider, Form, Input, Select, message } from "antd";
import { useMemo, useState } from "react";

import { createTestDriveRequest } from "@/services/testDriveService";

type Props = {
  carOptions: Array<{ id: string; name: string }>;
};

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  carId: string;
  preferredDate?: { format: (fmt: string) => string } | null;
  note?: string;
};

const PHONE_REGEX = /^(0|\+84)\d{9,10}$/;

export function TestDriveForm({ carOptions }: Props) {
  const [api, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm<FormValues>();

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
        email: values.email,
        preferredDate: values.preferredDate ? values.preferredDate.format("DD/MM/YYYY") : undefined,
        note: values.note,
      });

      api.success("Đã gửi yêu cầu lái thử. Chúng tôi sẽ liên hệ sớm!");
      form.resetFields();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể gửi yêu cầu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {contextHolder}
      <Card
        className="rounded-2xl !border !border-lux-line !bg-lux-card text-lux-text shadow-[0_10px_24px_rgba(0,0,0,0.3)]"
        styles={{ body: { padding: 20 } }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-lux-text">Đăng ký lái thử</div>
            <div className="mt-1 text-sm text-lux-muted">
              Điền thông tin, chọn mẫu xe để đội ngũ tư vấn xác nhận lịch.
            </div>
          </div>
          <div className="hidden rounded-full border border-lux-gold/40 bg-lux-surface px-3 py-1 text-xs font-semibold text-lux-goldSoft md:inline-flex">
            Tư vấn 1-1
          </div>
        </div>

        {error ? (
          <div className="mt-4">
            <Alert type="error" showIcon message="Gửi yêu cầu thất bại" description={error} />
          </div>
        ) : null}

        <Form<FormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          className="mt-4"
          onFinish={(v) => void onFinish(v)}
          initialValues={{ carId: carOptions[0]?.id }}
        >
          <Divider className="!my-3 !border-lux-line/60" />
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input placeholder="Nguyễn Văn A" className="!rounded-xl" />
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
              <Input placeholder="0901234567" className="!rounded-xl" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="name@example.com" className="!rounded-xl" />
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

          <Form.Item label="Ngày mong muốn" name="preferredDate">
            <DatePicker className="w-full !rounded-xl" format="DD/MM/YYYY" placeholder="Chọn ngày" />
          </Form.Item>

          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea
              rows={4}
              placeholder="Khung giờ, địa điểm, yêu cầu thêm..."
              className="!rounded-xl"
            />
          </Form.Item>

          <Button
            htmlType="submit"
            loading={loading}
            className="!h-11 !w-full !rounded-xl !border !border-lux-gold/40 !bg-lux-gold !font-semibold !text-black hover:!bg-lux-goldSoft"
          >
            {loading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu"}
          </Button>

          <div className="mt-3 text-xs text-lux-muted">
            Thông tin của bạn được dùng để xác nhận lịch lái thử và hỗ trợ tư vấn nhanh hơn.
          </div>
        </Form>
      </Card>
    </>
  );
}

