import axios from "axios";

import type { Car } from "./types";

const BASE_URL = "https://69cdc9c833a09f831b7c8a17.mockapi.io";

export async function fetchCars(): Promise<Car[]> {
  const res = await axios.get<Car[]>(`${BASE_URL}/1321`, {
    headers: { Accept: "application/json" },
  });
  return res.data ?? [];
}

export async function fetchCarById(id: string): Promise<Car | null> {
  try {
    const res = await axios.get<Car>(`${BASE_URL}/1321/${id}`, {
      headers: { Accept: "application/json" },
    });
    return res.data ?? null;
  } catch {
    return null;
  }
}

