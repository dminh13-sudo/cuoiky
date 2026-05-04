import CarListingPage from "@/components/cars/CarListingPage";

type PageProps = {
  searchParams?: Promise<{
    brand?: string;
    categories?: string;
    minPrice?: string;
    maxPrice?: string;
    q?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};

  const initialFilters = {
    q: sp.q ?? "",
    brand: sp.brand,
    categories: sp.categories ? sp.categories.split(",").filter(Boolean) : [],
    priceRange: [
      sp.minPrice ? Number(sp.minPrice) : 0,
      sp.maxPrice ? Number(sp.maxPrice) : 0,
    ] as [number, number],
  };

  return <CarListingPage initialFilters={initialFilters} />;
}

