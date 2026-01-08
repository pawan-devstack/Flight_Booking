import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState("oneway"); // "oneway" | "roundtrip"
  const [currentStep, setCurrentStep] = useState(1);  // 1: Search, 2: Payment, 3: Success

  const [lastBooking, setLastBooking] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("last_booking");
    if (saved) {
      setLastBooking(JSON.parse(saved));
    }
  }, []);

  const saveBooking = (booking) => {
    setLastBooking(booking);
    localStorage.setItem("last_booking", JSON.stringify(booking));

    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    all.push(booking);
    localStorage.setItem("bookings", JSON.stringify(all));
  };

  const resetBookingFlow = () => {
    setSelectedFlight(null);
    setPassengers(1);
    setTripType("oneway");
    setCurrentStep(1);
  };

  const value = {
    selectedFlight,
    setSelectedFlight,
    passengers,
    setPassengers,
    tripType,
    setTripType,
    currentStep,
    setCurrentStep,
    lastBooking,
    saveBooking,
    resetBookingFlow,
  };

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
