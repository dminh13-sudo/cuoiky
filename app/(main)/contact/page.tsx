import { ContactInfo } from "@/components/contact/ContactInfo";
import { TestDriveForm } from "@/components/contact/TestDriveForm";
import { getCars } from "@/services/carService";

export default async function Page() {
  const cars = await getCars();
  const carOptions = cars.map((c) => ({ id: c.id, name: c.name }));

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-lux-text">Liên hệ & Đăng ký lái thử</h1>
        <p className="mt-2 text-lux-muted">
          Chúng tôi phản hồi nhanh trong giờ mở cửa. Bạn có thể đặt lịch lái thử ngay bên dưới.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ContactInfo
          hotline="0999 999 999"
          address="Showroom AutoCar, Phường Trấn Biên, TP. Đồng Nai"
          openHours="8:00 - 21:00"
          mapEmbedUrl="https://www.google.com/maps?q=TP.%20%C4%90%E1%BB%93ng%20Nai&output=embed"
        />

        <TestDriveForm carOptions={carOptions} />
      </div>
    </main>
  );
}