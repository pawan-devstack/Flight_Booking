import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { flights } from '../db/flights'; // ← Your data file
import Flightcard from '../component/Flightcard';

const FlightResults = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departure = searchParams.get('departure') || '';

  console.log('Params:', { from, to, departure }); // Debug
  console.log('Flights data:', flights?.length || 0); // Debug

  const filteredFlights = useMemo(() => {
    if (!flights || flights.length === 0) return [];
    
    return flights.filter(flight => {
      const matchFrom = from ? flight.from.includes(from) : true;
      const matchTo = to ? flight.to.includes(to) : true;
      const matchDate = departure ? flight.date.includes(departure) : true;
      return matchFrom && matchTo && matchDate;
    });
  }, [from, to, departure]);

  const paginatedFlights = filteredFlights.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (filteredFlights.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">No Flights Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Try different dates or routes: <strong>{from} → {to}</strong>
          </p>
          <a href="/" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700">
            New Search
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 mb-12 shadow-2xl">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            {filteredFlights.length} Flights Found
          </h1>
          <p className="text-2xl text-gray-700">
            {from} <span className="text-blue-600 font-semibold">→</span> {to} 
            {departure && ` on ${departure}`}
          </p>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {paginatedFlights.map(flight => (
            <Flightcard key={flight.id} flight={flight} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 text-lg font-semibold">
          <button 
            onClick={() => setCurrentPage(p => Math.max(p-1, 1))}
            disabled={currentPage === 1}
            className="px-8 py-4 bg-gray-200 text-gray-800 rounded-2xl hover:bg-gray-300 disabled:opacity-50 px-6 py-3"
          >
            ← Previous
          </button>
          <span className="px-8 py-4 bg-white shadow-lg rounded-2xl">
            Page {currentPage} ({filteredFlights.length} flights)
          </span>
          <button 
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage * itemsPerPage >= filteredFlights.length}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
