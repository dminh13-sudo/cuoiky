"use client";

import { Alert, Button, Card, DatePicker, Divider, Form, Input, message } from "antd";
import { useState } from "react";

import { createTestDriveRequest } from "@/services/testDriveService";

type Props = {
  carId: string;
  carName: string;
};

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  preferredDate?: { format: (fmt: string) => string } | null;
  note?: string;
};

const PHONE_REGEX = /^(0|\+84)\d{9,10}$/;

export function TestDriveForm({ carId, carName }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, contextHolder] = message.useMessage();
  const [form] = Form.useForm<FormValues>();

  async function onFinish(values: FormValues) {
    try {
      setSubmitting(true);
      setError(null);

      await createTestDriveRequest({
        carId,
        carName,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        preferredDate: values.preferredDate ? values.preferredDate.format("DD/MM/YYYY") : undefined,
        note: values.note,
      });

      api.success("Đã gửi đăng ký lái thử. Chúng tôi sẽ liên hệ sớm!");
      form.resetFields();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gửi đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {contextHolder}
      <Card
        className="rounded-2xl !border !border-lux-line !bg-lux-card text-lux-text shadow-[0_10px_24px_rgba(0,0,0,0.3)]"
        styles={{ body: { padding: 20 } }}
      >
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-lg font-semibold text-lux-text">Đăng ký lái thử</div>
            <div className="mt-1 text-sm text-lux-muted">
              Điền thông tin để nhận tư vấn và đặt lịch lái thử cho{" "}
              <span className="font-medium text-lux-text">{carName}</span>.
            </div>
          </div>
          <div className="hidden rounded-full border border-lux-gold/40 bg-lux-surface px-3 py-1 text-xs font-semibold text-lux-goldSoft md:inline-flex">
            Ưu tiên phản hồi nhanh
          </div>
        </div>

        {error ? (
          <div className="mt-4">
            <Alert type="error" showIcon message="Không thể gửi đăng ký" description={error} />
          </div>
        ) : null}

        <Form<FormValues>
          form={form}
          layout="vertical"
          className="mt-4"
          onFinish={(v) => void onFinish(v)}
          requiredMark={false}
        >
          <Divider className="!my-3 !border-lux-line/60" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input placeholder="Nguyễn Văn A" className="!rounded-xl" />
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

            <Form.Item label="Ngày mong muốn" name="preferredDate">
              <DatePicker
                className="w-full !rounded-xl"
                format="DD/MM/YYYY"
                placeholder="Chọn ngày"
              />
            </Form.Item>
          </div>

          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea
              rows={4}
              placeholder="Bạn muốn lái thử tại đâu? Khung giờ nào?"
              className="!rounded-xl"
            />
          </Form.Item>

          <Button
            htmlType="submit"
            loading={submitting}
            className="!h-11 !w-full !rounded-xl !border !border-lux-gold/40 !bg-lux-gold !font-semibold !text-black hover:!bg-lux-goldSoft"
          >
            Gửi đăng ký
          </Button>

          <div className="mt-3 text-xs text-lux-muted">
            Bằng việc gửi đăng ký, bạn đồng ý để chúng tôi liên hệ xác nhận lịch lái thử.
          </div>
        </Form>
      </Card>
    </>
  );
}

