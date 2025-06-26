interface FlightResultCardProps {
  airlineLogo: string;
  airlineName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  route: string;
  price: string;
  currency: string;
  tripType: string;
}

export default function FlightResultCard({
  airlineLogo,
  airlineName,
  departureTime,
  arrivalTime,
  duration,
  stops,
  route,
  price,
  currency,
  tripType,
}: FlightResultCardProps) {
  return (
    <div className="m-1 mx-auto flex w-full max-w-4xl flex-row justify-evenly gap-4 rounded-xl border border-gray-700 bg-gray-900 p-4 md:flex-row md:items-center md:px-8 lg:gap-20">
      {/* Airline Logo & Name */}
      <div className="flex w-[150px] flex-col items-center md:flex-row md:items-center md:gap-3">
        <div className="mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-white md:mb-0">
          <img
            src={airlineLogo}
            alt={airlineName}
            className="h-8 w-8 object-contain"
          />
        </div>
        <span className="text-center text-sm text-gray-300 md:text-left">
          {airlineName}
        </span>
      </div>
      {/* Flight Times & Route */}
      <div className="flex flex-1 flex-col items-start justify-center space-y-2 md:px-8">
        <span className="text-center text-lg font-semibold text-white">
          {departureTime} – {arrivalTime}
        </span>
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
          <span className="text-sm text-white">{duration}</span>
          <span className="text-sm text-gray-400">
            {stops === "none"
              ? "Non-stop"
              : `${stops} ${+stops > 1 ? "stops" : "stop"}`}
          </span>
          <span className="text-sm text-gray-400">{route}</span>
        </div>
      </div>
      {/* Price & Trip Type */}
      <div className="flex min-w-[110px] flex-col items-center md:items-end">
        <span className="text-lg font-bold text-green-400">
          {currency} {price}
        </span>
        <span className="text-xs text-gray-400">{tripType} </span>
      </div>
    </div>
  );
}
