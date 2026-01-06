import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlane } from "react-icons/fa"
import Hotelcard from '../component/Hotelcard'
import Flightcard from '../component/Flightcard'
import Busescard from '../component/Buscard'
import Trainscard from '../component/Traincard'

const Flights = () => {
  const [tripType, setTripType] = useState("One Way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Business");

  const videoPath = '/formbgvideo.mp4'

  const total = adults + children + infants;
  const displayTravellers = `${total} Traveller${total !== 1 ? 's' : ''}, ${travelClass}`;

  return (
    <>
      {/* Main Search Form */}
      <div className="relative max-w-8xl p-3 sm:p-4 lg:p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl mt-4 mb-6 mx-7">
        <video src={videoPath} type='video/mp4' autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-fill -z-10 rounded-3xl"></video>
        <h2 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
          Search Your Flight
          <FaPlane className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
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
          <div className="lg:col-span-2">
            <label className="block text-xs sm:text-sm text-black font-bold mb-1.5 sm:mb-2">From</label>
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none bg-gray-50 text-sm h-12 sm:h-14 lg:h-16"
            />
          </div>

          {/* To */}
          <div className="lg:col-span-2">
            <label className="block text-xs sm:text-sm text-black font-bold mb-1.5 sm:mb-2">To</label>
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none bg-gray-50 text-sm h-12 sm:h-14 lg:h-16"
            />
          </div>

          {/* Departure */}
          <div className="lg:col-span-2">
            <label className="block text-xs sm:text-sm text-black font-bold mb-1.5 sm:mb-2">Departure</label>
            <DatePicker
              selected={departure}
              onChange={setDeparture}
              dateFormat="EEE, MMM d"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none bg-gray-50 text-sm cursor-pointer text-left h-12 sm:h-14 lg:h-16"
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
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 text-sm cursor-pointer text-left h-12 sm:h-14 lg:h-16 ${tripType === "One Way"
                ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
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
            <div className="relative w-full">
              <button
                onClick={() => setOpen(!open)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 text-sm font-semibold text-gray-800 flex items-center justify-between h-12 sm:h-14 lg:h-16 hover:shadow-md transition-all group"
              >
                <span className="truncate max-w-[70%]">{displayTravellers}</span>
                <svg className="w-4 h-4 flex-shrink-0 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open && (
                <div
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                  className="absolute top-full left-0 right-0 sm:-left-4 md:-left-12 lg:-left-32 xl:-left-48 lg:left-auto lg:right-0 mt-3 w-full sm:w-96 lg:w-[380px] max-w-[95vw] bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border p-4 sm:p-6 z-[9999] max-h-96 overflow-y-auto ">
                  <h3 className="font-semibold text-base sm:text-lg mb-4">Travellers & Class</h3>

                  {/* Counters */}
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

                  {/* Class Selection */}
                  <div className="mt-6 py-3 border-t">
                    <p className="text-sm font-semibold mb-3">Class</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Economy", "Premium Economy", "Business"].map((cls) => (
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

                  {/* Done Button */}
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
          <button className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl font-bold text-sm shadow-xl hover:from-orange-600 hover:to-orange-700 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-200">
            Search Flights
          </button>
        </div>
      </div>
<div className="z-0">

      <Flightcard />
      <Hotelcard />
      <Busescard />
      <Trainscard />
</div>

    </>
  );
};

export default Flights