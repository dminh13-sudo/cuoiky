export type Car = {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  category: string;
  fuelType?: string;
  image: string;
  description?: string;
  isFeatured?: boolean;
  specs?: Record<string, string | number | boolean | null | undefined>;
  features?: string[];
  colors?: string[];
};

