"use client";

import { Card, Divider, Form, InputNumber, Slider, Typography } from "antd";
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
    const months = Math.max(1, Math.round(years * 12));
    const totalPaid = monthly * months;
    const totalInterest = Math.max(0, totalPaid - principal);

    return { price, dp, years, annualRate, downPayment, principal, monthly, months, totalPaid, totalInterest };
  }, [values, defaultPrice]);

  return (
    <Card
      className="rounded-2xl !border !border-lux-line !bg-lux-card text-lux-text shadow-[0_10px_24px_rgba(0,0,0,0.3)]"
      styles={{ body: { padding: 20 } }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <Title level={4} className="!mb-1 !text-lux-text">
            Công cụ tính trả góp
          </Title>
          <Text className="!text-lux-muted">
            Ước tính nhanh số tiền trả mỗi tháng (mang tính tham khảo).
          </Text>
        </div>
        <div className="hidden rounded-full border border-lux-gold/40 bg-lux-surface px-3 py-1 text-xs font-semibold text-lux-goldSoft md:inline-flex">
          Tính nhanh • Minh bạch
        </div>
      </div>

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
        <Divider className="!my-3 !border-lux-line/60" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Form.Item
            label="Giá xe ($)"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá xe" }]}
          >
            <InputNumber<number>
              className="w-full !rounded-xl"
              min={0}
              step={1000}
              formatter={(v) => {
                const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
                if (!Number.isFinite(n)) return "";
                return `$${Math.round(n).toLocaleString("en-US")}`;
              }}
              parser={(v) => Number(String(v ?? "").replace(/[^\d.-]/g, ""))}
            />
          </Form.Item>

          <Form.Item label="% trả trước" name="downPaymentPercent">
            <div className="grid grid-cols-1 gap-2">
              <Slider min={0} max={100} step={1} />
              <InputNumber className="w-full !rounded-xl" min={0} max={100} step={1} />
            </div>
          </Form.Item>

          <Form.Item label="Số năm vay" name="years">
            <div className="grid grid-cols-1 gap-2">
              <Slider min={1} max={10} step={1} />
              <InputNumber className="w-full !rounded-xl" min={1} max={10} step={1} />
            </div>
          </Form.Item>

          <Form.Item label="Lãi suất (%/năm)" name="annualInterestRate">
            <div className="grid grid-cols-1 gap-2">
              <Slider min={0} max={30} step={0.5} />
              <InputNumber className="w-full !rounded-xl" min={0} max={30} step={0.5} />
            </div>
          </Form.Item>
        </div>
      </Form>

      <Divider className="!my-4 !border-lux-line/60" />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-lux-line bg-lux-surface p-4">
          <div className="text-xs text-lux-muted">Trả trước</div>
          <div className="mt-1 text-lg font-semibold text-lux-text">
            {formatUSD(computed.downPayment)}
          </div>
        </div>
        <div className="rounded-xl border border-lux-line bg-lux-surface p-4">
          <div className="text-xs text-lux-muted">Số tiền vay</div>
          <div className="mt-1 text-lg font-semibold text-lux-text">
            {formatUSD(computed.principal)}
          </div>
        </div>
        <div className="rounded-xl border border-lux-gold/40 bg-lux-card p-4 shadow-[0_0_0_1px_rgba(201,162,39,0.18)_inset]">
          <div className="text-xs text-lux-muted">Trả mỗi tháng</div>
          <div className="mt-1 text-lg font-semibold text-lux-goldSoft">
            {formatUSD(computed.monthly)}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-lux-line bg-lux-surface p-4">
          <div className="text-xs text-lux-muted">Tổng lãi (ước tính)</div>
          <div className="mt-1 text-base font-semibold text-lux-text">
            {formatUSD(computed.totalInterest)}
          </div>
          <div className="mt-1 text-xs text-lux-muted">
            {computed.months} tháng • Lãi suất {computed.annualRate}%/năm
          </div>
        </div>
        <div className="rounded-xl border border-lux-line bg-lux-surface p-4">
          <div className="text-xs text-lux-muted">Tổng phải trả (ước tính)</div>
          <div className="mt-1 text-base font-semibold text-lux-text">
            {formatUSD(computed.totalPaid)}
          </div>
          <div className="mt-1 text-xs text-lux-muted">
            Không bao gồm phí/thuế/đăng ký.
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-lux-muted">
        Lưu ý: Kết quả chỉ mang tính tham khảo. Lãi suất/ưu đãi thực tế phụ thuộc ngân hàng và hồ sơ khách hàng.
      </div>
    </Card>
  );
}

