"use client";

import { Alert, Button, Card, Form, Input, message } from "antd";
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
  preferredDate?: string;
  note?: string;
};

const PHONE_REGEX = /^(0|\+84)\d{9,10}$/;

export function TestDriveForm({ carId, carName }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, contextHolder] = message.useMessage();

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
        preferredDate: values.preferredDate,
        note: values.note,
      });

      api.success("Đã gửi đăng ký lái thử. Chúng tôi sẽ liên hệ sớm!");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gửi đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {contextHolder}
      <Card className="rounded-2xl" bodyStyle={{ padding: 20 }}>
        <div className="text-lg font-semibold text-gray-900">Đăng ký lái thử</div>
        <div className="mt-1 text-sm text-gray-600">
          Điền thông tin để nhận tư vấn và đặt lịch lái thử cho{" "}
          <span className="font-medium text-gray-900">{carName}</span>.
        </div>

        {error ? (
          <div className="mt-4">
            <Alert type="error" showIcon message="Không thể gửi đăng ký" description={error} />
          </div>
        ) : null}

        <Form<FormValues>
          layout="vertical"
          className="mt-4"
          onFinish={(v) => void onFinish(v)}
          requiredMark={false}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input placeholder="Nguyễn Văn A" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="name@example.com" />
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
              <Input placeholder="0901234567" />
            </Form.Item>

            <Form.Item label="Ngày mong muốn" name="preferredDate">
              <Input placeholder="VD: 10/05/2026 (hoặc cuối tuần)" />
            </Form.Item>
          </div>

          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea rows={4} placeholder="Bạn muốn lái thử tại đâu? Khung giờ nào?" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            className="!h-11 !rounded-xl !bg-gray-900 hover:!bg-black"
          >
            Gửi đăng ký
          </Button>
        </Form>
      </Card>
    </>
  );
}

