import { useState, useMemo, useEffect } from "react";
import { FaTrain, FaPlane } from "react-icons/fa"
import { trains } from '../db/trains'
import { useBooking } from "../context/BookingContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Trainlist from "../component/listcard/Trainlist";
import Traincard from '../component/detailscard/Traincard'
import SortBar from "../component/Sortbar";

const Trains = () => {
  const [tripType, setTripType] = useState("One Way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [sortBy, setSortBy] = useState('cheapest');
  const [searchFilters, setSearchFilters] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const { user } = useAuth();
  const { setSelectedTrain, setCurrentStep } = useBooking();
  const [searchParamsUrl] = useSearchParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Sleeper");

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const videoPath = '/bgTrain.mp4'

  const total = adults + children + infants;
  const displayTravellers = `${total} Traveller${total !== 1 ? 's' : ''}, ${travelClass}`;

  const filteredtrains = useMemo(() => {
    let list = [...trains]

    if (searchFilters) {
      const { from, to, date } = searchFilters;
      list = list.filter((f) =>
        (!from || f.from.toLowerCase().includes(from.toLowerCase())) &&
        (!to || f.to.toLowerCase().includes(to.toLowerCase())) &&
        (!date || f.date.includes(date))
      );
    }
    if (sortBy === 'cheapest') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'earliest') {
      list.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return list.slice(indexOfFirstItem, indexOfLastItem);
  }, [searchFilters, sortBy, trains, currentPage, itemsPerPage])

  const totalFilteredCount = useMemo(() => {
    let list = [...trains];
    if (searchFilters) {
      const { from, to, date } = searchFilters;
      list = list.filter((f) =>
        (!from || f.from.toLowerCase().includes(from.toLowerCase())) &&
        (!to || f.to.toLowerCase().includes(to.toLowerCase())) &&
        (!date || f.date.includes(date))
      );
    }
    if (sortBy === 'cheapest') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'earliest') list.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    return list.length;
  }, [searchFilters, sortBy, trains]);

  const handleBook = (Train) => {
    if (!user) {
      alert("Please login first to book a Train!");
      navigate('/login');
      return;
    }

    const newBooking = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      from: Train.from,
      to: Train.to,
      amount: Train.price * total,
      passengers: total,
      paymentMethod: "Credit Card",
      TrainId: Train.id,
      date: Train.date,
      departureTime: Train.departureTime,
      type: 'train'
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setSelectedTrain({
      ...Train,
      ...newBooking
    });

    if (confirm("Booking Successful! Go to My Trips?")) {
      navigate('/bookings');
    } else {
      setCurrentStep(2);
    }
  };

  const handleSearch = () => {
    setSearchFilters({
      from,
      to,
      date: departure ? departure.toISOString().split('T')[0] : null,
    });
    setCurrentPage(1);
  };

  const allCities = useMemo(() => {
    const cities = new Set();
    trains.forEach(f => {
      cities.add(f.from);
      cities.add(f.to);
    });
    return Array.from(cities).sort();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowFromDropdown(true);
      setShowToDropdown(true);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Main Search Form */}
      <div className="max-w-8xl p-3 sm:p-4 lg:p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl mt-4 mb-6 mx-7 z-50">
        <video src={videoPath} type='video/mp4' autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-fill -z-10 rounded-3xl"></video>
        <h2 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
          Search Your Train
          <FaTrain className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 lg:gap-4 items-end mb-4 sm:mb-6 w-full min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">

          {/* Trip Type */}
          <div className="lg:col-span-2 col-span-full md:col-span-1">
            <label className="block text-xs sm:text-sm text-black font-bold mb-1.5 sm:mb-2">Trip Type</label>
            <div className="flex bg-gray-50 rounded-2xl p-0.5 sm:p-1 lg:p-2 border h-12 sm:h-14 lg:h-16">
              <button
                onClick={() => setTripType("One Way")}
                className={`flex-1 py-1.5 px-2 sm:py-2 sm:px-3 lg:py-2 lg:px-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${tripType === "One Way"
                  ? "bg-white shadow-sm text-blue-600 border-2 border-blue-200"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                One Way
              </button>
              <button
                onClick={() => setTripType("Round Trip")}
                className={`flex-1 py-1.5 px-2 sm:py-2 sm:px-3 lg:py-2 lg:px-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${tripType === "Round Trip"
                  ? "bg-white shadow-sm text-blue-600 border-2 border-blue-200"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                Round Trip
              </button>
            </div>
          </div>

          {/* From */}
          <div className="lg:col-span-2 relative">
            <label className="block text-xs sm:text-sm text-black font-bold mb-1.5 sm:mb-2">From</label>
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                const filtered = allCities.filter(city =>
                  city.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFromSuggestions(filtered.slice(0, 6));
                setShowFromDropdown(e.target.value.length > 0);
              }}
              onFocus={() => setShowFromDropdown(from.length > 0)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none bg-gray-50 placeholder:text-gray-500 font-semibold text-sm h-12 sm:h-14 lg:h-16"
            />
            {showFromDropdown && fromSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 mt-1 max-h-60 overflow-y-auto z-[1000]">
                {fromSuggestions.map((city, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setFrom(city);
                      setShowFromDropdown(false);
                      setFromSuggestions([]);
                    }}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm font-medium text-gray-800"
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* To */}
          <div className="lg:col-span-2 relative">
            <label className="block text-xs sm:text-sm text-black font-bold mb-1.5 sm:mb-2">To</label>
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                const filtered = allCities.filter(city =>
                  city.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setToSuggestions(filtered.slice(0, 6));
                setShowToDropdown(e.target.value.length > 0);
              }}
              onFocus={() => setShowToDropdown(to.length > 0)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-400 placeholder:text-gray-500 font-semibold focus:outline-none bg-gray-50 text-sm h-12 sm:h-14 lg:h-16"
            />
            {showToDropdown && toSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 mt-1 max-h-60 overflow-y-auto z-[1000]">
                {toSuggestions.map((city, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setTo(city);
                      setShowToDropdown(false);
                      setToSuggestions([]);
                    }}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm font-medium text-gray-800"
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Departure */}
          <div className="lg:col-span-2">
            <label className="block text-xs sm:text-sm text-black font-bold mb-1.5 sm:mb-2">Departure</label>
            <DatePicker
              selected={departure}
              onChange={setDeparture}
              dateFormat="EEE, MMM d"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-gray-200 placeholder:text-gray-500 font-semibold focus:border-blue-400 focus:outline-none bg-gray-50 text-sm cursor-pointer text-left h-12 sm:h-14 lg:h-16"
              placeholderText="Select date"
              minDate={new Date()}
              popperClassName="z-[9999]"
              calendarClassName="rounded-2xl border-blue-200 shadow-2xl z-[9999]"
            />
          </div>

          {/* Return */}
          <div className="lg:col-span-2">
            <label className="block text-xs sm:text-sm text-black font-bold mb-1.5 sm:mb-2">Return</label>
            <DatePicker
              selected={tripType === "Round Trip" ? returnDate : null}
              onChange={tripType === "Round Trip" ? setReturnDate : undefined}
              dateFormat="EEE, MMM d"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 text-sm cursor-pointer placeholder:text-gray-500 font-semibold text-left h-12 sm:h-14 lg:h-16 ${tripType === "One Way"
                ? "bg-gray-100 border-gray-300 text-gray-800 cursor-not-allowed"
                : "border-gray-200 focus:border-blue-400 focus:outline-none bg-gray-50"
                }`}
              placeholderText={tripType === "One Way" ? "Select Round Trip" : "Select date"}
              minDate={departure}
              disabled={tripType === "One Way"}
              popperClassName="z-[9999]"
              calendarClassName="rounded-2xl border-blue-200 shadow-2xl z-[9999]"
            />
          </div>

          {/* Travellers & Class */}
          <div className="lg:col-span-2 col-span-full md:col-auto">
            <label className="block text-xs sm:text-sm text-black font-bold mb-1.5 sm:mb-2">Travellers & Class</label>
            <div className="relative w-full z-50">
              <button
                onClick={() => setOpen(!open)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 text-sm font-semibold text-gray-800 flex items-center justify-between h-12 sm:h-14 lg:h-16 hover:shadow-md transition-all group"
              >
                <span className="truncate max-w-[70%]">{displayTravellers}</span>
                <svg className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open && (
                <div
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                  className="absolute top-full left-0 right-0 sm:-left-4 md:-left-12 lg:-left-32 xl:-left-48 lg:right-0 mt-3 w-full sm:w-96 lg:w-95 max-w-[95vw] bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border p-4 sm:p-6 z-50 max-h-96 overflow-y-auto ">
                  <h3 className="font-semibold text-base sm:text-lg mb-4">Travellers & Class</h3>
                  {[
                    { label: "Adults", sub: "12 yrs or above", value: adults, set: setAdults },
                    { label: "Children", sub: "2 - 12 yrs", value: children, set: setChildren },
                    { label: "Infants", sub: "0 - 2 yrs", value: infants, set: setInfants },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.sub}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => item.set(Math.max(0, item.value - 1))}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-lg hover:bg-gray-200 rounded-full"
                        >
                          −
                        </button>
                        <span className="w-8 sm:w-10 text-center text-lg font-bold">{item.value}</span>
                        <button
                          onClick={() => item.set(Math.min(9, item.value + 1))}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-lg hover:bg-gray-200 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 py-3 border-t">
                    <p className="text-sm font-semibold mb-3">Class</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["SL", "3A", "2A", "1A", "CC", "2S"].map((cls) => (
                        <button
                          key={cls}
                          onClick={() => setTravelClass(cls)}
                          className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all ${travelClass === cls
                            ? "bg-orange-500 text-white border-orange-500 shadow-md scale-[1.02]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:scale-[1.02]"
                            }`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t flex justify-center">
                    <button
                      onClick={() => setOpen(false)}
                      className="px-8 sm:px-12 py-3 border-2 bg-orange-500 text-white rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center pt-4 sm:pt-6">
          <button onClick={handleSearch} className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl font-bold text-lg shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-200">
            Search trains
          </button>
        </div>
      </div>

      <SortBar
        filteredtrainsLength={filteredtrains.length}
        searchFilters={searchFilters}
        sortBy={sortBy}
        onSortChange={(newSort) => {
          setSortBy(newSort);
          setCurrentPage(1);
        }}
        totalFilteredCount={totalFilteredCount}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(direction) => {
          if (direction === 'prev') {
            setCurrentPage(prev => Math.max(prev - 1, 1));
          } else {
            setCurrentPage(prev => prev + 1);
          }
        }}
      >
        {filteredtrains.length === 0 ? (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-700 px-4 py-8 text-center text-slate-300 text-sm">
            No trains found for this search. Try changing date or route.
          </div>
        ) : (
          filteredtrains.map((Train) => (
            <Trainlist
              key={Train.id}
              train={Train}
              onBook={handleBook}
            />
          ))
        )}

      </SortBar>
      <div>
        <Traincard />
      </div>
    </>
  );
};

export default Trains;
