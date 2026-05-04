"use client";

import { Card, Form, InputNumber, Typography } from "antd";
import { useMemo } from "react";

const { Text, Title } = Typography;

type FormValues = {
  price: number;
  downPaymentPercent: number;
  years: number;
  annualInterestRate: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function calcMonthlyPayment(principal: number, annualRatePercent: number, years: number) {
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = clamp(annualRatePercent, 0, 100) / 100 / 12;

  if (monthlyRate === 0) return principal / months;
  // Amortization: M = P * r / (1 - (1+r)^-n)
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

function formatUSD(n: number) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

type Props = {
  defaultPrice?: number;
};

export function FinanceCalculator({ defaultPrice }: Props) {
  const [form] = Form.useForm<FormValues>();

  const values = Form.useWatch([], form);

  const computed = useMemo(() => {
    const price = Number(values?.price ?? defaultPrice ?? 0);
    const dp = clamp(Number(values?.downPaymentPercent ?? 30), 0, 100);
    const years = clamp(Number(values?.years ?? 5), 1, 10);
    const annualRate = clamp(Number(values?.annualInterestRate ?? 10), 0, 30);

    const downPayment = (price * dp) / 100;
    const principal = Math.max(0, price - downPayment);
    const monthly = calcMonthlyPayment(principal, annualRate, years);

    return { price, dp, years, annualRate, downPayment, principal, monthly };
  }, [values, defaultPrice]);

  return (
    <Card className="rounded-2xl" bodyStyle={{ padding: 20 }}>
      <Title level={4} className="!mb-1">
        Công cụ tính trả góp
      </Title>
      <Text type="secondary">
        Ước tính nhanh số tiền trả mỗi tháng (mang tính tham khảo).
      </Text>

      <Form<FormValues>
        form={form}
        layout="vertical"
        className="mt-4"
        initialValues={{
          price: defaultPrice ?? 0,
          downPaymentPercent: 30,
          years: 5,
          annualInterestRate: 10,
        }}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Form.Item
            label="Giá xe ($)"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá xe" }]}
          >
            <InputNumber className="w-full" min={0} step={1000} />
          </Form.Item>

          <Form.Item label="% trả trước" name="downPaymentPercent">
            <InputNumber className="w-full" min={0} max={100} step={1} />
          </Form.Item>

          <Form.Item label="Số năm vay" name="years">
            <InputNumber className="w-full" min={1} max={10} step={1} />
          </Form.Item>

          <Form.Item label="Lãi suất (%/năm)" name="annualInterestRate">
            <InputNumber className="w-full" min={0} max={30} step={0.5} />
          </Form.Item>
        </div>
      </Form>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-xs text-gray-600">Trả trước</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            {formatUSD(computed.downPayment)}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-xs text-gray-600">Số tiền vay</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            {formatUSD(computed.principal)}
          </div>
        </div>
        <div className="rounded-xl border border-gray-900 bg-gray-900 p-4">
          <div className="text-xs text-white/70">Trả mỗi tháng</div>
          <div className="mt-1 text-lg font-semibold text-white">
            {formatUSD(computed.monthly)}
          </div>
        </div>
      </div>
    </Card>
  );
}

