export const flights = [
  {
    id: 1, from: "Bhopal (BHO)", to: "Delhi (DEL)", date: "2025-12-25", departureTime: "08:15", arrivalTime: "09:45", duration: "1h 30m", price: 3200, airline: "IndiGo", stops: 0, travelClass: "Economy"
  },
  {
    id: 2, from: "Delhi (DEL)", to: "Mumbai (BOM)", date: "2025-12-25", departureTime: "10:00", arrivalTime: "12:30", duration: "2h 30m", price: 4500, airline: "Vistara", stops: 0, travelClass: "Economy"
  },

  // Delhi routes (busiest hub)
  { id: 9, from: "Delhi (DEL)", to: "Bengaluru (BLR)", date: "2025-12-25", departureTime: "06:45", arrivalTime: "09:25", duration: "2h 40m", price: 4800, airline: "Air India", stops: 0, travelClass: "Economy" },
  { id: 10, from: "Delhi (DEL)", to: "Hyderabad (HYD)", date: "2025-12-25", departureTime: "11:30", arrivalTime: "14:00", duration: "2h 30m", price: 4200, airline: "IndiGo", stops: 0, travelClass: "Economy" },
  { id: 11, from: "Delhi (DEL)", to: "Chennai (MAA)", date: "2025-12-26", departureTime: "14:20", arrivalTime: "17:20", duration: "3h 00m", price: 5100, airline: "Vistara", stops: 0, travelClass: "Economy" },
  { id: 12, from: "Delhi (DEL)", to: "Kolkata (CCU)", date: "2025-12-26", departureTime: "17:45", arrivalTime: "20:15", duration: "2h 30m", price: 3900, airline: "SpiceJet", stops: 0, travelClass: "Economy" },

  // Mumbai routes
  { id: 13, from: "Mumbai (BOM)", to: "Bengaluru (BLR)", date: "2025-12-27", departureTime: "07:30", arrivalTime: "09:20", duration: "1h 50m", price: 3400, airline: "IndiGo", stops: 0, travelClass: "Economy" },
  { id: 14, from: "Mumbai (BOM)", to: "Hyderabad (HYD)", date: "2025-12-27", departureTime: "12:45", arrivalTime: "14:25", duration: "1h 40m", price: 2900, airline: "Air India Express", stops: 0, travelClass: "Economy" },
  { id: 15, from: "Mumbai (BOM)", to: "Goa (GOI)", date: "2025-12-28", departureTime: "09:00", arrivalTime: "10:20", duration: "1h 20m", price: 2800, airline: "IndiGo", stops: 0, travelClass: "Economy" },

  // Bengaluru routes
  { id: 16, from: "Bengaluru (BLR)", to: "Hyderabad (HYD)", date: "2025-12-28", departureTime: "08:20", arrivalTime: "09:30", duration: "1h 10m", price: 2200, airline: "IndiGo", stops: 0, travelClass: "Economy" },
  { id: 17, from: "Bengaluru (BLR)", to: "Chennai (MAA)", date: "2025-12-29", departureTime: "15:45", arrivalTime: "16:45", duration: "1h 00m", price: 1900, airline: "SpiceJet", stops: 0, travelClass: "Economy" },

  // Other popular routes
  { id: 18, from: "Jaipur (JAI)", to: "Delhi (DEL)", date: "2025-12-29", departureTime: "06:00", arrivalTime: "07:15", duration: "1h 15m", price: 2600, airline: "IndiGo", stops: 0, travelClass: "Economy" },
  { id: 19, from: "Pune (PNQ)", to: "Delhi (DEL)", date: "2025-12-30", departureTime: "19:30", arrivalTime: "22:00", duration: "2h 30m", price: 4400, airline: "Vistara", stops: 0, travelClass: "Business" },
  { id: 20, from: "Ahmedabad (AMD)", to: "Mumbai (BOM)", date: "2025-12-30", departureTime: "08:50", arrivalTime: "10:00", duration: "1h 10m", price: 2400, airline: "IndiGo", stops: 0, travelClass: "Economy" },

  // North-South connects
  { id: 21, from: "Chandigarh (IXC)", to: "Delhi (DEL)", date: "2025-12-25", departureTime: "10:30", arrivalTime: "11:30", duration: "1h 00m", price: 2700, airline: "Vistara", stops: 0, travelClass: "Economy" },
  { id: 22, from: "Lucknow (LKO)", to: "Delhi (DEL)", date: "2025-12-26", departureTime: "13:00", arrivalTime: "14:15", duration: "1h 15m", price: 2900, airline: "Air India", stops: 0, travelClass: "Economy" },

  // South India
  { id: 23, from: "Kochi (COK)", to: "Bengaluru (BLR)", date: "2025-12-27", departureTime: "11:20", arrivalTime: "12:20", duration: "1h 00m", price: 2100, airline: "IndiGo", stops: 0, travelClass: "Economy" },
  { id: 24, from: "Thiruvananthapuram (TRV)", to: "Mumbai (BOM)", date: "2025-12-28", departureTime: "16:45", arrivalTime: "19:00", duration: "2h 15m", price: 3700, airline: "Air India", stops: 1, travelClass: "Economy" },

  // Emerging routes
  { id: 25, from: "Indore (IDR)", to: "Delhi (DEL)", date: "2025-12-29", departureTime: "07:00", arrivalTime: "08:30", duration: "1h 30m", price: 3400, airline: "IndiGo", stops: 0, travelClass: "Economy" },
  { id: 26, from: "Varanasi (VNS)", to: "Delhi (DEL)", date: "2025-12-30", departureTime: "09:15", arrivalTime: "11:00", duration: "1h 45m", price: 3600, airline: "SpiceJet", stops: 0, travelClass: "Economy" },
  { id: 27, from: "Nagpur (NAG)", to: "Mumbai (BOM)", date: "2025-12-25", departureTime: "14:30", arrivalTime: "15:45", duration: "1h 15m", price: 2800, airline: "IndiGo", stops: 0, travelClass: "Economy" },

  // Premium flights
  { id: 28, from: "Delhi (DEL)", to: "Mumbai (BOM)", date: "2025-12-26", departureTime: "18:00", arrivalTime: "20:00", duration: "2h 00m", price: 8500, airline: "Vistara", stops: 0, travelClass: "Business" },
  { id: 29, from: "Bengaluru (BLR)", to: "Mumbai (BOM)", date: "2025-12-27", departureTime: "21:15", arrivalTime: "22:25", duration: "1h 10m", price: 7200, airline: "Air India", stops: 0, travelClass: "Business" },

  // Regional connects
  { id: 30, from: "Raipur (RPR)", to: "Delhi (DEL)", date: "2025-12-28", departureTime: "05:30", arrivalTime: "07:45", duration: "2h 15m", price: 4100, airline: "IndiGo", stops: 1, travelClass: "Economy" },
  { id: 31, from: "Patna (PAT)", to: "Delhi (DEL)", date: "2025-12-29", departureTime: "12:00", arrivalTime: "13:45", duration: "1h 45m", price: 3700, airline: "SpiceJet", stops: 0, travelClass: "Economy" },
  { id: 32, from: "Guwahati (GAU)", to: "Delhi (DEL)", date: "2025-12-30", departureTime: "15:20", arrivalTime: "18:00", duration: "2h 40m", price: 5800, airline: "IndiGo", stops: 0, travelClass: "Economy" }
];
