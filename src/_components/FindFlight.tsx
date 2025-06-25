import { FaChevronDown } from "react-icons/fa";

export default function FlightResultCard({
  airlineLogo,
  airlineName,
  departureTime,
  arrivalTime,
  duration,
  stops,
  route,
  co2,
  co2Percent,
  price,
  currency,
  tripType,
}: any) {
  return (
    <div className="m-1 mx-auto flex w-full max-w-4xl flex-col items-center gap-4 rounded-xl border border-gray-700 bg-gray-900 p-4 md:flex-row md:items-center md:justify-between">
      {/* Airline Logo & Name */}
      <div className="flex min-w-[80px] flex-col items-center md:flex-row md:items-center md:gap-3">
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
      <div className="flex flex-1 flex-col items-center md:items-start">
        <span className="text-center text-lg font-semibold text-white md:text-left">
          {departureTime} – {arrivalTime}
        </span>
        <div className="mt-1 flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
          <span className="text-sm text-white">{duration}</span>
          <span className="text-sm text-gray-400">{stops}</span>
          <span className="text-sm text-gray-400">{route}</span>
        </div>
      </div>
      {/* CO2 Info */}
      <div className="flex flex-col items-center md:items-end">
        <span className="text-sm text-white">{co2}</span>
        <span className="mt-1 rounded bg-green-900 px-2 py-0.5 text-xs text-green-400">
          {co2Percent} emissions
        </span>
      </div>
      {/* Price & Trip Type */}
      <div className="flex min-w-[110px] flex-col items-center md:items-end">
        <span className="text-lg font-bold text-green-400">
          {currency} {price}
        </span>
        <span className="text-xs text-gray-400">{tripType}</span>
      </div>
    </div>
  );
}
