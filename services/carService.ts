import type { Car } from "@/components/cars/types";
import { axiosInstance } from "@/utils/axios";

const CARS_RESOURCE = "/1321";

export async function getCars(): Promise<Car[]> {
  const res = await axiosInstance.get<Car[]>(CARS_RESOURCE);
  return res.data ?? [];
}

export async function getCarById(id: string): Promise<Car | null> {
  try {
    const res = await axiosInstance.get<Car>(`${CARS_RESOURCE}/${id}`);
    return res.data ?? null;
  } catch {
    return null;
  }
}

export type CarCreateInput = Omit<Car, "id">;
export type CarUpdateInput = Partial<Omit<Car, "id">>;

export async function createCar(input: CarCreateInput): Promise<Car> {
  const res = await axiosInstance.post<Car>(CARS_RESOURCE, input);
  return res.data;
}

export async function updateCar(id: string, input: CarUpdateInput): Promise<Car> {
  const res = await axiosInstance.put<Car>(`${CARS_RESOURCE}/${id}`, input);
  return res.data;
}

export async function deleteCar(id: string): Promise<void> {
  await axiosInstance.delete(`${CARS_RESOURCE}/${id}`);
}

