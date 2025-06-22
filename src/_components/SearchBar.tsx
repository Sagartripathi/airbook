import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaExchangeAlt,
  FaCircle,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";

export default function SearchBar() {
  const [tripType, setTripType] = useState("Round trip");
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState("Economy");
  const [from, setFrom] = useState("Kathmandu");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const handleTripTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTripType(value);
    if (value === "One way") setReturnDate(null);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-900">
      <div className="flex w-full flex-col items-center bg-gray-900 py-12">
        <h1 className="mb-8 text-5xl font-bold text-white">Flights</h1>
      </div>
      <div className="z-10 mt-[-3rem] flex w-full max-w-2xl flex-col gap-6 rounded-2xl bg-gray-800 p-6 shadow-lg md:p-8">
        {/* Top Controls */}
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <select
              className="bg-transparent text-lg font-medium text-gray-200 focus:outline-none"
              value={tripType}
              onChange={handleTripTypeChange}
            >
              <option>Round trip</option>
              <option>One way</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-300">
              <FaUser />
            </span>
            <input
              type="number"
              min={1}
              className="w-16 rounded-md border border-gray-300 bg-transparent px-3 text-lg font-medium text-gray-200 focus:outline-none"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            />
          </div>
          <div>
            <select
              className="bg-transparent text-lg font-medium text-gray-200 focus:outline-none"
              value={cabin}
              onChange={(e) => setCabin(e.target.value)}
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
          </div>
        </div>

        <div className="flex w-full items-center gap-2">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-900 px-4 py-4">
            <FaCircle className="text-xl text-blue-400" />
            <input
              className="w-full bg-transparent text-lg font-semibold text-white focus:outline-none"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From"
            />
          </div>
          <button
            type="button"
            className="mx-1 rounded-full bg-gray-700 p-2 text-blue-400"
            onClick={handleSwap}
            aria-label="Swap"
          >
            <FaExchangeAlt className="text-lg" />
          </button>
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-900 px-4 py-4">
            <FaMapMarkerAlt className="text-xl text-blue-400" />
            <input
              className="w-full bg-transparent text-lg font-semibold text-white focus:outline-none"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Where to?"
            />
          </div>
        </div>

        {/* Date Pickers */}
        {tripType === "One way" ? (
          <div className="relative mt-2 flex w-full items-center rounded-xl bg-gray-900 px-4 py-4">
            <span className="absolute left-4">
              <MdOutlineCalendarToday className="text-2xl text-white" />
            </span>
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
              <span className="absolute left-4">
                <MdOutlineCalendarToday className="text-2xl text-white" />
              </span>
              <DatePicker
                selected={departure}
                onChange={(date) => setDeparture(date)}
                className="w-full bg-transparent pl-10 text-xl font-semibold text-white focus:outline-none"
                placeholderText="Departure"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="relative flex w-full items-center rounded-xl bg-gray-900 px-4 py-4">
              <span className="absolute left-4">
                <MdOutlineCalendarToday className="text-2xl text-white" />
              </span>
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
      </div>
    </div>
  );
}
