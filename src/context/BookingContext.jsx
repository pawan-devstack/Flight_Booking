import { createContext, useContext, useEffect, useReducer, useMemo } from "react";

const BookingContext = createContext(null);

const initialState = {
  selectedFlight: null,
  passengers: 1,
  tripType: "oneway", // oneway | roundtrip
  currentStep: 1,     // 1: Search, 2: Payment, 3: Success
  lastBooking: null,
};

function bookingReducer(state, action) {
  switch (action.type) {
    case "SELECT_FLIGHT":
      return { ...state, selectedFlight: action.payload };

    case "SET_PASSENGERS":
      return { ...state, passengers: action.payload };

    case "SET_TRIP_TYPE":
      return { ...state, tripType: action.payload };

    case "SET_STEP":
      return { ...state, currentStep: action.payload };

    case "SET_LAST_BOOKING":
      return { ...state, lastBooking: action.payload };

    case "RESET_BOOKING":
      return { ...initialState };

    default:
      return state;
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  /* Restore last booking on refresh */
  useEffect(() => {
    const saved = localStorage.getItem("last_booking");
    if (saved) {
      dispatch({
        type: "SET_LAST_BOOKING",
        payload: JSON.parse(saved),
      });
    }
  }, []);

  const selectFlight = (flight) => {
    dispatch({ type: "SELECT_FLIGHT", payload: flight });
  };

  const setPassengers = (count) => {
    dispatch({ type: "SET_PASSENGERS", payload: count });
  };

  const setTripType = (type) => {
    dispatch({ type: "SET_TRIP_TYPE", payload: type });
  };

  const setStep = (step) => {
    dispatch({ type: "SET_STEP", payload: step });
  };

  const saveBooking = (booking) => {
    dispatch({ type: "SET_LAST_BOOKING", payload: booking });

    localStorage.setItem("last_booking", JSON.stringify(booking));

    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    all.push(booking);
    localStorage.setItem("bookings", JSON.stringify(all));
  };

  const resetBookingFlow = () => {
    dispatch({ type: "RESET_BOOKING" });
  };

  const value = useMemo(
    () => ({
      selectedFlight: state.selectedFlight,
      passengers: state.passengers,
      tripType: state.tripType,
      currentStep: state.currentStep,
      lastBooking: state.lastBooking,

      selectFlight,
      setPassengers,
      setTripType,
      setStep,
      saveBooking,
      resetBookingFlow,
    }),
    [state]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
};
