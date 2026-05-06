import { testDriveAxios } from "@/utils/testDriveAxios";

export type TestDriveRequestInput = {
  carId: string;
  carName: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate?: string;
  note?: string;
};

export type TestDriveRequest = TestDriveRequestInput & {
  id: string;
  createdAt?: string;
  arrived?: boolean;
  arrivedAt?: string;
};

type MockApiTestDriveRecord = {
  id: string;
  fullname?: string;
  phone?: string;
  email?: string;
  carID?: string;
  preferredDate?: string;
  note?: string;
  createdAt?: string;
  arrived?: boolean;
  arrivedAt?: string;
};

export async function createTestDriveRequest(input: TestDriveRequestInput) {
  const payload: Omit<MockApiTestDriveRecord, "id"> = {
    fullname: input.fullName,
    phone: input.phone,
    email: input.email,
    carID: input.carId,
    preferredDate: input.preferredDate,
    note: input.note,
    createdAt: new Date().toISOString(),
    arrived: false,
  };

  const res = await testDriveAxios.post("/products", payload);
  return res.data;
}

export async function updateTestDriveRequest(
  id: string,
  patch: Partial<Pick<TestDriveRequest, "arrived" | "arrivedAt">>
) {
  const payload: Partial<MockApiTestDriveRecord> = {
    arrived: patch.arrived,
    arrivedAt: patch.arrivedAt,
  };

  const res = await testDriveAxios.put(`/products/${id}`, payload);
  return res.data;
}

export async function getTestDriveRequests(): Promise<TestDriveRequest[]> {
  const res = await testDriveAxios.get<MockApiTestDriveRecord[]>("/products");
  const data = res.data ?? [];

  return data.map((r) => ({
    id: String(r.id),
    carId: String(r.carID ?? ""),
    carName: String(r.carID ?? ""),
    fullName: String(r.fullname ?? ""),
    email: String(r.email ?? ""),
    phone: String(r.phone ?? ""),
    preferredDate: r.preferredDate ? String(r.preferredDate) : undefined,
    note: r.note ? String(r.note) : undefined,
    createdAt: r.createdAt ? String(r.createdAt) : undefined,
    arrived: Boolean(r.arrived),
    arrivedAt: r.arrivedAt ? String(r.arrivedAt) : undefined,
  }));
}

