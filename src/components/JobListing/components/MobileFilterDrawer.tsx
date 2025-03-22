import type React from "react"

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filterKeys: string[]
  filtersData: { [key: string]: string[] }
  activeFilters: { [key: string]: string }
  handleFilterChange: (filterKey: string, value: string) => void
  handleSearchChange: (search: string) => void
  searchTerm: string
  clearAllFilters: () => void
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filterKeys,
  filtersData,
  activeFilters,
  handleFilterChange,
  handleSearchChange,
  searchTerm,
  clearAllFilters,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`fixed right-0 top-0 w-4/5 max-w-sm bg-white h-full shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "transform translate-x-0" : "transform translate-x-full"}`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {filterKeys.map((filterKey) => (
            <div key={filterKey} className="mb-4">
              <label htmlFor={`mobile-${filterKey}`} className="block text-sm font-medium text-gray-700 mb-1">
                {filterKey.replace(/_/g, " ")}
              </label>
              <select
                id={`mobile-${filterKey}`}
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                value={activeFilters[filterKey] || ""}
              >
                <option value="">Select {filterKey.replace(/_/g, " ")}</option>
                {filtersData[filterKey]?.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {Object.keys(activeFilters).length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Active Filters:</h3>
              {Object.entries(activeFilters).map(([key, value]) => (
                <div
                  key={key}
                  className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                >
                  <span>
                    {key.replace(/_/g, " ")}: {value}
                  </span>
                  <button
                    className="ml-2 text-blue-600 hover:text-blue-800"
                    onClick={() => handleFilterChange(key, "")}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                className="mt-2 w-full bg-red-100 text-red-800 rounded-md px-3 py-2 text-sm font-medium"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileFilterDrawer

