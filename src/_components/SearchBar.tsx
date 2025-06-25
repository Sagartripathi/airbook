import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaExchangeAlt,
  FaCircle,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import FindFlight from "./FindFlight";

const suggestions = [
  {
    skyId: "IND",
    entityId: "95673608",
    presentation: {
      title: "Indianapolis",
      suggestionTitle: "Indianapolis (IND)",
      subtitle: "United States",
    },
    navigation: {
      entityId: "95673608",
      entityType: "AIRPORT",
      localizedName: "Indianapolis",
      relevantFlightParams: {
        skyId: "IND",
        entityId: "95673608",
        flightPlaceType: "AIRPORT",
        localizedName: "Indianapolis",
      },
      relevantHotelParams: {
        entityId: "27542857",
        entityType: "CITY",
        localizedName: "Indianapolis",
      },
    },
  },
  {
    skyId: "DEL",
    entityId: "95673498",
    presentation: {
      title: "Indira Gandhi International ",
      suggestionTitle: "Indira Gandhi International  (DEL)",
      subtitle: "India",
    },
    navigation: {
      entityId: "95673498",
      entityType: "AIRPORT",
      localizedName: "Indira Gandhi International ",
      relevantFlightParams: {
        skyId: "DEL",
        entityId: "95673498",
        flightPlaceType: "AIRPORT",
        localizedName: "Indira Gandhi International ",
      },
      relevantHotelParams: {
        entityId: "27540706",
        entityType: "CITY",
        localizedName: "New Delhi",
      },
    },
  },
  {
    skyId: "IN",
    entityId: "29475284",
    presentation: {
      title: "India",
      suggestionTitle: "India",
      subtitle: "",
    },
    navigation: {
      entityId: "29475284",
      entityType: "COUNTRY",
      localizedName: "India",
      relevantFlightParams: {
        skyId: "IN",
        entityId: "29475284",
        flightPlaceType: "COUNTRY",
        localizedName: "India",
      },
      relevantHotelParams: {
        entityId: "29475284",
        entityType: "COUNTRY",
        localizedName: "India",
      },
    },
  },
  {
    skyId: "ID",
    entityId: "29475321",
    presentation: {
      title: "Indonesia",
      suggestionTitle: "Indonesia",
      subtitle: "",
    },
    navigation: {
      entityId: "29475321",
      entityType: "COUNTRY",
      localizedName: "Indonesia",
      relevantFlightParams: {
        skyId: "ID",
        entityId: "29475321",
        flightPlaceType: "COUNTRY",
        localizedName: "Indonesia",
      },
      relevantHotelParams: {
        entityId: "29475321",
        entityType: "COUNTRY",
        localizedName: "Indonesia",
      },
    },
  },
  {
    skyId: "IDR",
    entityId: "128667504",
    presentation: {
      title: "Indore",
      suggestionTitle: "Indore (IDR)",
      subtitle: "India",
    },
    navigation: {
      entityId: "128667504",
      entityType: "AIRPORT",
      localizedName: "Indore",
      relevantFlightParams: {
        skyId: "IDR",
        entityId: "128667504",
        flightPlaceType: "AIRPORT",
        localizedName: "Indore",
      },
      relevantHotelParams: {
        entityId: "27542801",
        entityType: "CITY",
        localizedName: "Indore",
      },
    },
  },
  {
    skyId: "BOM",
    entityId: "95673320",
    presentation: {
      title: "Mumbai",
      suggestionTitle: "Mumbai (BOM)",
      subtitle: "India",
    },
    navigation: {
      entityId: "95673320",
      entityType: "AIRPORT",
      localizedName: "Mumbai",
      relevantFlightParams: {
        skyId: "BOM",
        entityId: "95673320",
        flightPlaceType: "AIRPORT",
        localizedName: "Mumbai",
      },
      relevantHotelParams: {
        entityId: "27539520",
        entityType: "CITY",
        localizedName: "Mumbai",
      },
    },
  },
  {
    skyId: "HYD",
    entityId: "128668073",
    presentation: {
      title: "Hyderabad",
      suggestionTitle: "Hyderabad (HYD)",
      subtitle: "India",
    },
    navigation: {
      entityId: "128668073",
      entityType: "AIRPORT",
      localizedName: "Hyderabad",
      relevantFlightParams: {
        skyId: "HYD",
        entityId: "128668073",
        flightPlaceType: "AIRPORT",
        localizedName: "Hyderabad",
      },
      relevantHotelParams: {
        entityId: "27542764",
        entityType: "CITY",
        localizedName: "Hyderabad",
      },
    },
  },
  {
    skyId: "NDC",
    entityId: "129055570",
    presentation: {
      title: "Nanded",
      suggestionTitle: "Nanded (NDC)",
      subtitle: "India",
    },
    navigation: {
      entityId: "129055570",
      entityType: "AIRPORT",
      localizedName: "Nanded",
      relevantFlightParams: {
        skyId: "NDC",
        entityId: "129055570",
        flightPlaceType: "AIRPORT",
        localizedName: "Nanded",
      },
      relevantHotelParams: {
        entityId: "27545097",
        entityType: "CITY",
        localizedName: "Nanded",
      },
    },
  },
];

// async function fetchAirports(query: string): Promise<string[]> {
//   if (!query) return [];
//     const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(query)}&locale=en-US`;
//     const options = {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": "876166b337mshbeb626c58ef91c3p1781f8jsnca8519f586fe",
//         "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
//       },
//     };
//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     console.log("result", result);
//     return result.data?.map((item) => item.presentation.suggestionTitle) || [];
//   } catch (error) {
//     return [];
//   }
// }

// Simulate fetchAirports with your format
async function fetchAirports(query: string) {
  await new Promise((res) => setTimeout(res, 100)); // Simulate async
  return {
    data: suggestions
      .filter(
        (s) =>
          s.presentation.suggestionTitle
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          s.presentation.title.toLowerCase().includes(query.toLowerCase()) ||
          s.skyId.toLowerCase().includes(query.toLowerCase()),
      )
      .map((s) => s.presentation.suggestionTitle),
  };
}

export default function SearchBar() {
  const [tripType, setTripType] = useState("Round trip");
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState("Economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState<Date | null>(null);
  const [fromSuggestions, setFromSuggestions] = useState(suggestions);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [toSuggestions, setToSuggestions] = useState(suggestions);
  const [showSuggestions, setShowToSuggestions] = useState(false);
  const fromDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const toDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFrom(value);
    setShowFromSuggestions(true);

    if (fromDebounceRef.current) clearTimeout(fromDebounceRef.current);
    if (value.length >= 3) {
      fromDebounceRef.current = setTimeout(async () => {
        const result = await fetchAirports(value);
        setFromSuggestions(result);
      }, 1000);
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTo(value);
    setShowToSuggestions(true);

    if (toDebounceRef.current) clearTimeout(toDebounceRef.current);
    if (value.length >= 3) {
      toDebounceRef.current = setTimeout(async () => {
        setToSuggestions(await fetchAirports(value));
      }, 1000);
    } else {
      setToSuggestions([]);
    }
  };

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
          <div className="relative flex flex-1 items-center gap-3 rounded-xl bg-gray-900 px-4 py-4">
            <FaCircle className="text-xl text-blue-400" />
            <input
              className="w-full bg-transparent text-lg font-semibold text-white focus:outline-none"
              value={from}
              onChange={handleFromChange}
              placeholder="From"
              autoComplete="off"
              onFocus={() => setShowFromSuggestions(true)}
              onBlur={() =>
                setTimeout(() => setShowFromSuggestions(false), 100)
              }
            />
            {showFromSuggestions && fromSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 z-10 mt-1 max-h-56 w-full overflow-y-auto rounded bg-gray-800 shadow">
                {fromSuggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer px-4 py-2 text-white hover:bg-gray-700"
                    onMouseDown={() => {
                      setFrom(s.presentation.suggestionTitle);
                      setShowFromSuggestions(false);
                    }}
                  >
                    {s.presentation.suggestionTitle}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            className="mx-1 rounded-full bg-gray-700 p-2 text-blue-400"
            onClick={handleSwap}
            aria-label="Swap"
          >
            <FaExchangeAlt className="text-lg" />
          </button>
          <div className="relative flex-1">
            <div className="flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-4">
              <FaMapMarkerAlt className="text-xl text-blue-400" />
              <input
                className="w-full bg-transparent text-lg font-semibold text-white focus:outline-none"
                value={to}
                onChange={handleToChange}
                placeholder="To"
                autoComplete="off"
                onFocus={() => setShowToSuggestions(true)}
                onBlur={() =>
                  setTimeout(() => setShowToSuggestions(false), 100)
                }
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 z-10 mt-1 max-h-56 w-full overflow-y-auto rounded bg-gray-800 shadow">
                {toSuggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer px-4 py-2 text-white hover:bg-gray-700"
                    onMouseDown={() => {
                      setTo(s.presentation.suggestionTitle);
                      setShowToSuggestions(false);
                    }}
                  >
                    {s.presentation.suggestionTitle}
                  </li>
                ))}
              </ul>
            )}
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
        {/* Search Button */}
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-xl font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
          onClick={() => {
            FindFlight();
          }}
        >
          Search
        </button>
      </div>
      <FindFlight
        airlineLogo="https://companieslogo.com/img/orig/INDIGO.NS-77f45585.png?t=1745724543"
        airlineName="IndiGo"
        departureTime="4:40 PM"
        arrivalTime="6:20 PM"
        duration="1 hr 55 min"
        stops="Nonstop"
        route="KTM–DEL"
        co2="71 kg CO2e"
        co2Percent="-24%"
        price="28,523"
        currency="NPR"
        tripType="round trip"
      />

      <FindFlight
        airlineLogo="https://c8.alamy.com/comp/KW3RE3/the-royal-nepal-airlines-logo-represents-the-national-airline-of-nepal-KW3RE3.jpg"
        airlineName="IndiGo"
        departureTime="4:40 PM"
        arrivalTime="6:20 PM"
        duration="1 hr 55 min"
        stops="Nonstop"
        route="KTM–DEL"
        co2="71 kg CO2e"
        co2Percent="-24%"
        price="28,523"
        currency="NPR"
        tripType="round trip"
      />
    </div>
  );
}
