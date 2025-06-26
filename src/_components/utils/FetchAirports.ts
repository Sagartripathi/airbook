export type Airport = {
  title: string;
  skyId: string;
  subtitle?: string;
};

const airportMemoCache = new Map<string, Airport[]>();

export async function fetchAirports(query: string): Promise<Airport[]> {
  if (!query || query.length < 2) return [];

  const key = query.toLowerCase();
  if (airportMemoCache.has(key)) {
    return airportMemoCache.get(key)!;
  }

  const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(query)}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const suggestions: Airport[] =
      result?.data?.map((item: any) => ({
        title: item.name ?? "",
        skyId: item.id ?? "",
        subtitle: item.cityName || item.regionName || item.countryName || "",
      })) ?? [];
    //since we only hit max 20 api call for free version , so we are using the concept of caching also
    airportMemoCache.set(key, suggestions);
    return suggestions;
  } catch {
    return [];
  }
}
