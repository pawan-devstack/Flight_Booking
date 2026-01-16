import { useBooking } from "../../context/BookingContext";
import { FaTrain } from "react-icons/fa";

const TrainList = ({ train, onBook }) => {
  const { selectedTrain } = useBooking();

  const isSelected = selectedTrain && selectedTrain.id === train.id;

  return (
    <div
      className={`rounded-2xl border p-4 md:p-5 bg-white shadow-sm hover:shadow-xl transition
      flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${isSelected ? "border-orange-500 ring-2 ring-orange-200" : "border-slate-200"
        }`}
    >
      {/* Train Info Section */}
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-sm font-semibold text-orange-700">
          <FaTrain />
        </div>
        <div>
          <p className="text-sm text-slate-500">{train.number}</p>
          <p className="text-lg font-semibold text-slate-900">
            {train.name} {/* e.g. Shatabdi Express */}
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>{train.from}</span>
            <span className="text-slate-400">→</span>
            <span>{train.to}</span>
          </div>
          <p className="text-xs mt-1 text-slate-500">
            {train.date} • {train.travelClass || "SL"}
          </p>
        </div>
      </div>

      {/* Timing & Duration Section */}
      <div className="flex-1 flex justify-between items-center gap-6">
        <div className="text-center">
          <p className="text-base font-semibold text-slate-900">{train.departureTime}</p>
          <p className="text-xs text-slate-500">Departure</p>
        </div>

        <div className="hidden md:flex flex-col items-center text-xs text-slate-500">
          <span className="mb-1">{train.duration}</span>
          <div className="h-0.5 w-20 bg-slate-200 rounded-full">
            <div className="h-full w-1/2 bg-orange-500 rounded-full" />
          </div>
          <span className="mt-1">Fastest</span>
        </div>

        <div className="text-center">
          <p className="text-base font-semibold text-slate-900">{train.arrivalTime}</p>
          <p className="text-xs text-slate-500">Arrival</p>
        </div>
      </div>

      {/* Price & Action Section */}
      <div className="w-full md:w-auto flex md:flex-col items-end justify-between gap-2">
        <div className="text-right">
          <p className="text-xl font-bold text-emerald-600">₹{train.price.toLocaleString()}</p>
          <p className="text-xs text-slate-500">per traveller</p>
        </div>
        <button
          onClick={() => {
            alert(`train booked!\n\n${train.airline}\n${train.from} → ${train.to}\nPrice: ₹${train.price}`);
            onBook(train);
          }}
          className={`px-4 py-2 rounded-full text-sm font-semibold w-full md:w-auto
          ${isSelected
              ? "bg-emerald-600 text-white"
              : "bg-orange-600 hover:bg-orange-700 text-white"
            }`}
        >
          {isSelected ? "Selected" : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default TrainList;
