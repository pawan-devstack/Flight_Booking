import { useBooking } from "../../context/BookingContext";

const FlightList = ({ flight, onBook }) => {
  const { selectedFlight } = useBooking();

  const isSelected = selectedFlight && selectedFlight.id === flight.id;

  return (
    <div
      className={`rounded-2xl border p-4 md:p-5 bg-white shadow-sm hover:shadow-xl transition
      flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
        isSelected ? "border-indigo-500 ring-2 ring-indigo-200" : "border-slate-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-700">
          {flight.airline[0]}
        </div>
        <div>
          <p className="text-sm text-slate-500">{flight.airline}</p>
          <p className="text-lg font-semibold text-slate-900">
            {flight.from} <span className="text-slate-400">→</span> {flight.to}
          </p>
          <p className="text-xs mt-1 text-slate-500">
            {flight.date} • {flight.travelClass} • {flight.stops === 0 ? "Non‑stop" : `${flight.stops} stop`}
          </p>
        </div>
      </div>

      <div className="flex-1 flex justify-between items-center gap-6">
        <div className="text-center">
          <p className="text-base font-semibold text-slate-900">{flight.departureTime}</p>
          <p className="text-xs text-slate-500">Departure</p>
        </div>

        <div className="hidden md:flex flex-col items-center text-xs text-slate-500">
          <span className="mb-1">{flight.duration}</span>
          <div className="h-0.5 w-20 bg-slate-200 rounded-full">
            <div className="h-full w-1/2 bg-indigo-500 rounded-full" />
          </div>
          <span className="mt-1">{flight.stops === 0 ? "Direct" : `${flight.stops} stops`}</span>
        </div>

        <div className="text-center">
          <p className="text-base font-semibold text-slate-900">{flight.arrivalTime}</p>
          <p className="text-xs text-slate-500">Arrival</p>
        </div>
      </div>

      <div className="w-full md:w-auto flex md:flex-col items-end justify-between gap-2">
        <div className="text-right">
          <p className="text-xl font-bold text-emerald-600">₹{flight.price.toLocaleString()}</p>
          <p className="text-xs text-slate-500">per passenger</p>
        </div>
        <button
          onClick={() => onBook(flight)}
          className={`px-4 py-2 rounded-full text-sm font-semibold w-full md:w-auto
          ${isSelected ? "bg-emerald-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
        >
          {isSelected ? "Selected" : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default FlightList;
