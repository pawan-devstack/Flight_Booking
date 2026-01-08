import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

const CheapestFlightDeals = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState(null); // New filter state
    const containerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai']; // Filter cities

    const fetchFlights = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:3000/flights');
            setFlights(res.data.flights || res.data);
        } catch (err) {
            console.error('API Error:', err);
            setFlights([
                { id: 1, from: 'Delhi (DEL)', to: 'Bhatinda', price: '₹3,248', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', duration: '1h 45m ✈️', location: 'Direct • 5h ago' },
                { id: 2, from: 'Mumbai (BOM)', to: 'Goa (GOI)', price: '₹2,999', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop', duration: '1h 15m ✈️', location: 'Direct • 2h ago' },
                { id: 3, from: 'Bangalore (BLR)', to: 'Delhi (DEL)', price: '₹4,199', image: 'https://images.unsplash.com/photo-1488448015082-6f72d30486f5?w=400&h=300&fit=crop', duration: '2h 30m ✈️', location: '1 stop • 4h ago' },
                { id: 4, from: 'Chennai (MAA)', to: 'Hyderabad (HYD)', price: '₹1,899', image: 'https://images.unsplash.com/photo-1571896349840-fd50b4eece8f?w=400&h=300&fit=crop', duration: '1h 20m ✈️', location: 'Direct • 1h ago' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Filter flights based on selected city
    const filteredFlights = selectedCity
        ? flights.filter(flight =>
            flight.from.includes(selectedCity) || flight.to.includes(selectedCity)
        )
        : flights;

    const handleCityFilter = (city) => {
        setSelectedCity(city === selectedCity ? null : city);
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    const updateScrollButtons = () => {
        const container = containerRef.current;
        if (!container) return;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scrollBy = (direction) => {
        const container = containerRef.current;
        if (!container) return;
        container.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        updateScrollButtons();
        const handleScroll = updateScrollButtons;
        container.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateScrollButtons);
        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, [filteredFlights.length]);

    if (loading) return <div className="py-20 text-center text-gray-500">Loading flights...</div>;

    return (
        <div className="max-w-8xl p-3 sm:p-4 lg:p-6 bg-white rounded-3xl shadow-2xl mt-4 mb-6 mx-7">
            <div className="max-w-7xl mx-auto relative rounded-3xl">
                {/* Header */}
                <div className='flex justify-between items-center py-10'>
                    <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                        🛩️ Cheapest Flight Deals ({filteredFlights.length})
                    </h2>
                    <div className="flex items-center gap-2 text-sm font-medium">
                        {cities.map(city => (
                            <button
                                key={city}
                                onClick={() => handleCityFilter(city)}
                                className={`px-4 py-3 rounded-2xl transition-all duration-300 group hover:bg-orange-50 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden ${selectedCity === city
                                        ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-2xl scale-105'
                                        : 'text-gray-700 hover:text-orange-600'
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredFlights.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No flights available for {selectedCity || 'selected filters'}.{' '}
                        <button
                            onClick={() => setSelectedCity(null)}
                            className="text-orange-500 hover:text-orange-600 font-semibold"
                        >
                            Clear filter
                        </button>
                    </div>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => scrollBy('left')}
                            disabled={!canScrollLeft}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg border-2 z-20 transition-all duration-300 flex items-center justify-center -ml-12 lg:-ml-16 ${canScrollLeft
                                    ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl hover:scale-105 hover:-translate-x-1 text-gray-700 shadow-lg'
                                    : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                                }`}
                        >
                            <FaChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => scrollBy('right')}
                            disabled={!canScrollRight}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg border-2 z-20 transition-all duration-300 flex items-center justify-center -mr-12 lg:-mr-16 ${canScrollRight
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400 hover:border-emerald-500 hover:shadow-xl hover:scale-105 hover:translate-x-1 shadow-emerald-200 text-white'
                                    : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                                }`}
                        >
                            <FaChevronRight className="w-5 h-5" />
                        </button>

                        <div
                            ref={containerRef}
                            className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] lg:pl-16 lg:pr-16"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {filteredFlights.map((flight) => (
                                <div
                                    key={flight.id}
                                    className="min-w-70 max-w-75 shrink-0 h-85 rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl hover:scale-[1.03] hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 cursor-pointer snap-center group"
                                >
                                    <div className="h-3/6 w-full relative overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                                        <img
                                            src={flight.image}
                                            alt={`${flight.from} to ${flight.to}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 group-hover:brightness-[1.05]"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-3 right-3 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-3 py-1.5 rounded-2xl text-sm font-bold shadow-2xl">
                                            {flight.price}
                                        </div>
                                    </div>
                                    <div className="p-5 space-y-3 flex-1 flex flex-col">
                                        <h3 className="font-bold text-sm leading-tight line-clamp-2 text-gray-900 group-hover:text-emerald-600 transition-colors">
                                            {flight.from} → {flight.to}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-1 bg-emerald-100 px-2 py-1 rounded-lg">
                                                <span className="text-emerald-500 text-lg">✈️</span>
                                                <span className="font-semibold">{flight.duration}</span>
                                            </div>
                                            <span className="w-px h-4 bg-gray-300" />
                                            <span className="text-xs">{flight.location}</span>
                                        </div>
                                        <button className="mt-auto w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-sm">
                                            View More
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheapestFlightDeals;
