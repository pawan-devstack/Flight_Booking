import React from 'react';

const SortBar = ({
  filteredFlightsLength,
  searchFilters,
  sortBy,
  onSortChange,
  totalFilteredCount,
  currentPage,
  itemsPerPage,
  onPageChange,
  children
}) => {
  return (
    <div className="relative max-w-8xl p-3 sm:p-4 lg:p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl mt-4 mb-6 mx-7">
      {/* Sort Info Bar */}
      <div className="mt-6 mb-3 flex flex-wrap justify-between items-center gap-3">
        <p className="text-xs md:text-sm text-slate-500">
          Showing {filteredFlightsLength} flights
          {searchFilters ? " for your search" : " (all available routes)"}
        </p>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="text-slate-500">Sort by:</span>
          <button
            className={`px-3 py-1 rounded-full border text-xs ${sortBy === "cheapest"
              ? "bg-indigo-500 text-white border-indigo-400"
              : "bg-slate-800 text-slate-300 border-slate-700"
              }`}
            onClick={() => onSortChange("cheapest")}
          >
            Cheapest
          </button>
          <button
            className={`px-3 py-1 rounded-full border text-xs ${sortBy === "earliest"
              ? "bg-indigo-500 text-white border-indigo-400"
              : "bg-slate-800 text-slate-300 border-slate-700"
              }`}
            onClick={() => onSortChange("earliest")}
          >
            Earliest
          </button>
        </div>
      </div>

      {/* Flight List Content (Passed as children) */}
      <div className="space-y-4 pb-10">
        {children}
      </div>

      {/* Pagination Controls */}
      {filteredFlightsLength > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-slate-200">
          <button
            onClick={() => onPageChange('prev')}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-sm font-semibold text-slate-900 bg-white border rounded-xl shadow-sm">
            Page {currentPage} of {Math.ceil(totalFilteredCount / itemsPerPage)}
          </span>

          <button
            onClick={() => onPageChange('next')}
            disabled={currentPage * itemsPerPage >= totalFilteredCount}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SortBar;
