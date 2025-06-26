import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaExchangeAlt,
  FaCircle,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";

import { fetchFlights } from "./utils/FetchFlights";
import FlightResultCard from "./FlightResultCard";
import Dropdown from "./utils/Dropdown";
import { fetchAirports } from "./utils/FetchAirports";

type Airport = { title: string; skyId: string; subtitle?: string };

const tripTypeOptions = [
  { label: "Round trip", value: "round_trip" },
  { label: "One way", value: "one_way" },
];

const cabinOptions = [
  { label: "Economy", value: "economy" },
  { label: "Business", value: "business" },
  { label: "First", value: "first" },
];

const stopsOptions = [
  { label: "None", value: "none" },
  { label: "1 stop", value: "1" },
  { label: "2 stops", value: "2" },
  { label: "3 stops", value: "3" },
];

export default function SearchBar() {
  const [tripType, setTripType] = useState("one_way");
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState("economy");
  const [stops, setStops] = useState("none");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [fromSuggestions, setFromSuggestions] = useState<Airport[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Airport[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [flightResults, setFlightResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fromDebounce = useRef<NodeJS.Timeout | null>(null);
  const toDebounce = useRef<NodeJS.Timeout | null>(null);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFrom(value);
    setShowFromSuggestions(true);

    if (fromDebounce.current) clearTimeout(fromDebounce.current);
    if (value.length >= 2) {
      fromDebounce.current = setTimeout(async () => {
        const suggestions = await fetchAirports(value);
        setFromSuggestions(suggestions);
      }, 500);
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTo(value);
    setShowToSuggestions(true);

    //i am performing debounching operation
    if (toDebounce.current) clearTimeout(toDebounce.current);
    if (value.length >= 3) {
      toDebounce.current = setTimeout(async () => {
        const suggestions = await fetchAirports(value);
        setToSuggestions(suggestions);
      }, 500);
    } else {
      setToSuggestions([]);
    }
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = async () => {
    const fromObj = fromSuggestions.find((item) => item.title === from);
    const toObj = toSuggestions.find((item) => item.title === to);

    if (!fromObj || !toObj || !departure) return;

    setLoading(true);

    //calling fetchflight component
    const flights = await fetchFlights({
      fromId: fromObj.skyId,
      toId: toObj.skyId,
      departDate: departure.toISOString().split("T")[0],
      adults: passengers,
      cabinClass: cabin.toUpperCase(),
      stops,
      currencyCode: "USD",
    });

    setFlightResults(flights);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-900">
      <div className="flex w-full flex-col items-center bg-gray-900 py-12">
        <h1 className="mb-8 text-5xl font-bold text-white">Flights</h1>
      </div>

      <div className="z-10 mt-[-3rem] flex w-full max-w-2xl flex-col gap-6 rounded-2xl bg-gray-800 p-6 shadow-lg md:p-8">
        <div className="flex flex-col flex-wrap items-center gap-4 md:flex-row">
          <Dropdown
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            options={tripTypeOptions}
          />

          <div className="flex items-center gap-2">
            <FaUser className="text-xl text-gray-300" />
            <input
              type="number"
              min={1}
              className="w-16 rounded-md border border-gray-300 bg-transparent px-3 text-lg font-medium text-gray-200 focus:outline-none"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            />
          </div>

          <Dropdown
            value={cabin}
            onChange={(e) => setCabin(e.target.value)}
            options={cabinOptions}
          />

          <Dropdown
            value={stops}
            onChange={(e) => setStops(e.target.value)}
            options={stopsOptions}
          />
        </div>

        <div className="flex w-full items-center gap-2">
          <div className="relative flex flex-1 items-center gap-3 rounded-xl bg-gray-900 px-4 py-4">
            <FaCircle className="text-xl text-blue-400" />
            <input
              value={from}
              onChange={handleFromChange}
              onFocus={() => setShowFromSuggestions(true)}
              onBlur={() =>
                setTimeout(() => setShowFromSuggestions(false), 200)
              }
              placeholder="From"
              className="w-full bg-transparent text-lg font-semibold text-white focus:outline-none"
              autoComplete="off"
            />
            {/* showing suggestion of airport */}
            {showFromSuggestions && fromSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 z-10 mt-1 max-h-56 w-full overflow-y-auto rounded bg-gray-800 shadow">
                {fromSuggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer px-4 py-2 text-white hover:bg-gray-700"
                    onMouseDown={() => {
                      setFrom(s.title);
                      setShowFromSuggestions(false);
                    }}
                  >
                    <div>{s.title}</div>
                    <div className="text-sm text-gray-400">{s.subtitle}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="mx-1 rounded-full bg-gray-700 p-2 text-blue-400"
            onClick={handleSwap}
          >
            <FaExchangeAlt className="text-lg" />
          </button>

          <div className="relative flex-1">
            <div className="flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-4">
              <FaMapMarkerAlt className="text-xl text-blue-400" />
              <input
                value={to}
                onChange={handleToChange}
                onFocus={() => setShowToSuggestions(true)}
                onBlur={() =>
                  setTimeout(() => setShowToSuggestions(false), 200)
                }
                placeholder="To"
                className="w-full bg-transparent text-lg font-semibold text-white focus:outline-none"
                autoComplete="off"
              />
            </div>
            {showToSuggestions && toSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 z-10 mt-1 max-h-56 w-full overflow-y-auto rounded bg-gray-800 shadow">
                {toSuggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer px-4 py-2 text-white hover:bg-gray-700"
                    onMouseDown={() => {
                      setTo(s.title);
                      setShowToSuggestions(false);
                    }}
                  >
                    <div>{s.title}</div>
                    <div className="text-sm text-gray-400">{s.subtitle}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {tripType === "one_way" ? (
          <div className="relative mt-2 flex w-full items-center rounded-xl bg-gray-900 px-4 py-4">
            <MdOutlineCalendarToday className="absolute left-4 text-2xl text-white" />
            <DatePicker
              selected={departure}
              onChange={(date) => setDeparture(date)}
              className="w-full bg-transparent pl-10 text-xl font-semibold text-white focus:outline-none"
              placeholderText="Departure"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        ) : (
          <div className="mt-2 flex w-full flex-col gap-2">
            <div className="relative flex w-full items-center rounded-xl bg-gray-900 px-4 py-4">
              <MdOutlineCalendarToday className="absolute left-4 text-2xl text-white" />
              <DatePicker
                selected={departure}
                onChange={(date) => setDeparture(date)}
                className="w-full bg-transparent pl-10 text-xl font-semibold text-white focus:outline-none"
                placeholderText="Departure"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="relative flex w-full items-center rounded-xl bg-gray-900 px-4 py-4">
              <MdOutlineCalendarToday className="absolute left-4 text-2xl text-white" />
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                className="w-full bg-transparent pl-10 text-xl font-semibold text-white focus:outline-none"
                placeholderText="Return"
                dateFormat="yyyy-MM-dd"
                minDate={departure || undefined}
              />
            </div>
          </div>
        )}

        <button
          className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-xl font-semibold text-white hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="mt-10 w-full max-w-4xl px-4">
        {loading && <p className="text-white">Loading flights...</p>}

        {!loading &&
          flightResults.map((flight, idx) => {
            const segment = flight.segments?.[0];
            const leg = segment?.legs?.[0];

            const carrierData =
              leg?.carriersData?.[0] ||
              segment?.carriersData?.[0] ||
              (flight.priceBreakdown?.carrierTaxBreakdown?.[0]?.carrier ?? {});

            const basePrice = Number(flight.priceBreakdown?.total?.units ?? 0);
            const price = (basePrice * passengers).toFixed(2);
            const currency =
              flight.priceBreakdown?.total?.currencyCode ?? "USD";

            const departureTimeObj = segment?.departureTime
              ? new Date(segment.departureTime)
              : null;
            const arrivalTimeObj = segment?.arrivalTime
              ? new Date(segment.arrivalTime)
              : null;

            // Format times in 12-hour AM/PM format
            const departureTime = departureTimeObj
              ? departureTimeObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "";

            const arrivalTime = arrivalTimeObj
              ? arrivalTimeObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "";

            // Calculate duration using arrival - departure
            let duration = "";
            if (departureTimeObj && arrivalTimeObj) {
              const diffMs =
                arrivalTimeObj.getTime() - departureTimeObj.getTime();
              const durationMinutes = Math.floor(diffMs / (1000 * 60));
              const hours = Math.floor(durationMinutes / 60);
              const minutes = durationMinutes % 60;
              duration = `${hours}h ${minutes}m`;
            }

            const route = segment
              ? `${segment.departureAirport?.cityName ?? ""} → ${
                  segment.arrivalAirport?.cityName ?? ""
                }`
              : "";

            return (
              <FlightResultCard
                key={idx}
                airlineLogo={
                  carrierData.logo || carrierData.logoUrl || carrierData.image
                }
                airlineName={carrierData.name}
                departureTime={departureTime}
                arrivalTime={arrivalTime}
                duration={duration}
                stops={stops}
                route={route}
                price={price}
                currency={currency}
                tripType={tripType}
              />
            );
          })}
      </div>
    </div>
  );
}
