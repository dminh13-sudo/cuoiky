import { axiosInstance } from "@/utils/axios";

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
};

export async function createTestDriveRequest(input: TestDriveRequestInput) {
  const payload = {
    ...input,
    createdAt: new Date().toISOString(),
  };

  const res = await axiosInstance.post("/test-drives", payload);
  return res.data;
}

export async function getTestDriveRequests(): Promise<TestDriveRequest[]> {
  const res = await axiosInstance.get<TestDriveRequest[]>("/test-drives");
  return res.data ?? [];
}

