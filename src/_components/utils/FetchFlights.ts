export async function fetchFlights({
  fromId,
  toId,
  departDate,
  adults = 1,
  stops = "none",
  cabinClass = "ECONOMY",
  currencyCode = "USD",
}: {
  fromId: string;
  toId: string;
  departDate: string;
  adults?: number;
  stops?: string;
  cabinClass?: string;
  currencyCode?: string;
}) {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fromId}&toId=${toId}&departDate=${departDate}&stops=${stops}&pageNo=1&adults=${adults}&cabinClass=${cabinClass}&currency_code=${currencyCode}`;
  console.log(url);
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.log("Flight API response:", data);
    return data?.data?.flightOffers || [];
  } catch (error) {
    console.error("Flight API error:", error);
    return [];
  }
}
