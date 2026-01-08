import { useBooking } from "../../context/BookingContext";
import { FaBus, FaStar } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";


const BusList = ({ bus, onBook }) => {
  // Context se selected item uthaya (assuming aapne context me 'selectedBus' ya generic state rakha hai)
  const { selectedBus } = useBooking();

  const isSelected = selectedBus && selectedBus.id === bus.id;

  return (
    <div
      className={`rounded-2xl border p-4 md:p-5 bg-white shadow-sm hover:shadow-xl transition-all duration-300
      flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
        isSelected ? "border-orange-500 ring-2 ring-orange-200" : "border-slate-200 hover:border-orange-200"
      }`}
    >
      {/* --- Left Section: Operator & Route --- */}
      <div className="flex items-start gap-4">
        {/* Operator Logo/Icon */}
        <div className="h-12 w-12 shrink-0 rounded-xl bg-orange-100 flex items-center justify-center text-xl text-orange-600">
           <FaBus />
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">{bus.operator}</h3>
            {/* Rating Badge */}
            <span className="flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
              {bus.rating} <FaStar className="w-2 h-2" />
            </span>
          </div>

          <p className="text-sm font-medium text-slate-600 mt-0.5">
            {bus.from} <span className="text-slate-400">→</span> {bus.to}
          </p>
          
          <p className="text-xs mt-1.5 text-slate-500 flex items-center gap-2">
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {bus.type} {/* e.g. "Volvo AC Sleeper" */}
            </span>
          </p>
        </div>
      </div>

      {/* --- Middle Section: Timing & Duration --- */}
      <div className="flex-1 flex justify-between items-center gap-4 px-2 md:px-6 border-t md:border-t-0 border-dashed pt-3 md:pt-0 mt-2 md:mt-0">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-900">{bus.departureTime}</p>
          <p className="text-xs text-slate-500">Departure</p>
        </div>

        {/* Duration Line */}
        <div className="hidden sm:flex flex-col items-center w-full max-w-[120px]">
          <span className="text-xs text-slate-500 mb-1">{bus.duration}</span>
          <div className="relative w-full h-[2px] bg-slate-200">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            </div>
          </div>
          <span className="text-[10px] text-orange-600 font-medium mt-1">
             {bus.seatsAvailable} Seats Left
          </span>
        </div>

        <div className="text-center">
          <p className="text-lg font-bold text-slate-900">{bus.arrivalTime}</p>
          <p className="text-xs text-slate-500">Arrival</p>
        </div>
      </div>

      {/* --- Right Section: Price & Action --- */}
      <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0">
        <div className="text-left md:text-right">
          <p className="text-xl font-bold text-slate-900">₹{bus.price.toLocaleString()}</p>
          <p className="text-xs text-slate-500 line-through">₹{(bus.price + 200).toLocaleString()}</p>
        </div>
        
        <button
          onClick={() => onBook(bus)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold w-full md:w-auto justify-center transition-all shadow-sm hover:shadow-md
          ${isSelected 
            ? "bg-green-600 text-white hover:bg-green-700" 
            : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          <MdEventSeat className="text-lg" />
          {isSelected ? "Selected" : "Select Seat"}
        </button>
      </div>
    </div>
  );
};

export default BusList;
