import React from "react";

const SortBar = ({
  filteredFlightsLength,
  searchFilters,
  sortBy,
  onSortChange,
  totalFilteredCount,
  currentPage,
  itemsPerPage,
  onPageChange,
  children,
}) => {
  return (
    <div className="max-w-7xl mx-auto mt-6 mb-10 px-4">
      {/* Sort Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl border shadow-sm px-5 py-4">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900"></span>{" "}
          flights {searchFilters ? "for your search" : ""}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Sort by</span>

          <button
            onClick={() => onSortChange("cheapest")}
            className={`px-4 py-1.5 rounded-full font-semibold transition
              ${
                sortBy === "cheapest"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            Cheapest
          </button>

          <button
            onClick={() => onSortChange("earliest")}
            className={`px-4 py-1.5 rounded-full font-semibold transition
              ${
                sortBy === "earliest"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            Earliest
          </button>
        </div>
      </div>

      {/* Flight List */}
      <div className="mt-4 space-y-4">
        {children}
      </div>

      {/* Pagination */}
      {filteredFlightsLength > 0 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => onPageChange("prev")}
            disabled={currentPage === 1}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700
                       hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="px-4 py-2 rounded-xl border bg-white text-sm font-semibold">
            Page {currentPage} of {Math.ceil(totalFilteredCount / itemsPerPage)}
          </span>

          <button
            onClick={() => onPageChange("next")}
            disabled={currentPage * itemsPerPage >= totalFilteredCount}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white
                       hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SortBar;
