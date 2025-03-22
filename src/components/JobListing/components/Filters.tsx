import type React from "react"

interface FiltersProps {
    filterKeys: string[]
    filtersData: { [key: string]: string[] }
    activeFilters: { [key: string]: string }
    handleFilterChange: (filterKey: string, value: string) => void
    searchFilters: string[]
    removeSearchFilter: (filter: string) => void
    clearAllFilters: () => void
}

const Filters: React.FC<FiltersProps> = ({
                                             filterKeys,
                                             filtersData,
                                             activeFilters,
                                             handleFilterChange,
                                             searchFilters,
                                             removeSearchFilter,
                                             clearAllFilters,
                                         }) => {
    return (
        <>
            <div className="filters-grid">
                {filterKeys.map((filterKey: string) => (
                    <select
                        key={filterKey}
                        className="filter-select"
                        onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                        value={activeFilters[filterKey] || ""}
                    >
                        <option value="">Select {filterKey.replace(/_/g, " ")}</option>
                        {filtersData[filterKey]?.map((value, index) => {
                            if (typeof value !== "string") {
                                return null; // Prevent rendering invalid data
                            }
                            return (
                                <option key={`${filterKey}-${index}`} value={value}>
                                    {value}
                                </option>
                            );
                        })}
                    </select>
                ))}
            </div>

            <div className="active-filters">
                {/* Search filters */}
                {searchFilters.map((filter) => (
                    <div key={`search-${filter}`} className="filter-badge search-filter-badge">
                        <span className="filter-value">{filter}</span>
                        <button
                            className="remove-filter"
                            onClick={() => removeSearchFilter(filter)}
                            aria-label={`Remove search filter ${filter}`}
                        >
                            ×
                        </button>
                    </div>
                ))}

                {/* Dropdown filters */}
                {Object.entries(activeFilters).map(([key, value]) => (
                    <div key={key} className="filter-badge">
                        <span className="filter-label">{key.replace(/_/g, " ")}:</span>
                        <span className="filter-value">{value}</span>
                        <button
                            className="remove-filter"
                            onClick={() => handleFilterChange(key, "")}
                            aria-label={`Remove ${key} filter`}
                        >
                            ×
                        </button>
                    </div>
                ))}

                {/* Show clear all button if any filters are active */}
                {(Object.keys(activeFilters).length > 0 || searchFilters.length > 0) && (
                    <button className="clear-all-filters" onClick={clearAllFilters}>
                        Clear All
                    </button>
                )}
            </div>
        </>
    )
}

export default Filters

