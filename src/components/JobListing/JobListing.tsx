"use client";

import React, { type KeyboardEvent, useEffect, useState } from "react"
import Banner from "./components/Banner";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import JobList from "./components/JobList";
import Pagination from "./components/Pagination";
import MobileFilterDrawer from "./components/MobileFilterDrawer";

interface BannerConfig {
    enabled: boolean;
    url?: string;
    alt?: string;
    link: string;
}

interface JobListingsProps {
    apiUrl: string;
    itemsPerPage: number;
    filterKeys: string[];
    enableSearch: boolean;
    enablePagination: boolean;
    enableMobileFilter: boolean;
    banners: {
        top: BannerConfig;
        bottom: BannerConfig;
        sidebar: BannerConfig;
    };
}

const JobListings: React.FC<JobListingsProps> = ({ apiUrl, itemsPerPage, filterKeys, enableSearch, enablePagination, enableMobileFilter, banners }) => {
    const [allItems, setAllItems] = useState<Job[]>([]);
    const [filteredItems, setFilteredItems] = useState<Job[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>({});
    const [searchFilters, setSearchFilters] = useState<string[]>([]);
    const [filtersData, setFiltersData] = useState<{ [key: string]: string[] }>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        fetch(`${apiUrl}/items`)
            .then((response) => response.json())
            .then((data: Job[]) => {
                setAllItems(data)
                setFilteredItems(data)
                const filtersData = populateFilters(data)
                setFiltersData(filtersData)
            })
            .catch((err) => console.error("Error fetching items:", err))
    }, [apiUrl])

    const populateFilters = (items: Job[]) => {
        const filtersData: { [key: string]: Set<string> } = {}

        items.forEach((job) => {
            filterKeys.forEach((key) => {
                if (!filtersData[key]) {
                    filtersData[key] = new Set()
                }
                if (job[key as keyof Job]) {
                    filtersData[key].add(job[key as keyof Job])
                }
            })
        })

        // Convert Sets to arrays
        const arrayFiltersData: { [key: string]: string[] } = {}
        Object.keys(filtersData).forEach((key) => {
            arrayFiltersData[key] = Array.from(filtersData[key])
        })

        return arrayFiltersData
    }

    const updateFiltersData = (items: Job[]) => {
        const updatedFiltersData = populateFilters(items)
        setFiltersData(updatedFiltersData)
    }

    const handleFilterChange = (filterKey: string, value: string) => {
        setActiveFilters((prevFilters) => {
            const newFilters = value ? { ...prevFilters, [filterKey]: value } : { ...prevFilters }
            if (!value) {
                delete newFilters[filterKey]
            }

            // Apply both dropdown filters and search filters
            const filtered = applyAllFilters(allItems, newFilters, searchFilters)

            setFilteredItems(filtered)
            setCurrentPage(1)
            updateFiltersData(filtered)
            return newFilters
        })
    }

    const handleSearchChange = (search: string) => {
        setSearchTerm(search)

        // Generate suggestions based on job titles
        if (search) {
            const newSuggestions = allItems
                .map((job) => job.title)
                .filter(
                    (title, index, self) =>
                        title && title.toLowerCase().includes(search.toLowerCase()) && self.indexOf(title) === index,
                )
                .slice(0, 5)

            setSuggestions(newSuggestions)
        } else {
            setSuggestions([])
        }
    }

    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            e.preventDefault()

            // Add the search term as a filter
            const newSearchFilters = [...searchFilters, searchTerm.trim()]
            setSearchFilters(newSearchFilters)

            // Apply all filters
            const filtered = applyAllFilters(allItems, activeFilters, newSearchFilters)
            setFilteredItems(filtered)
            setCurrentPage(1)
            updateFiltersData(filtered)

            // Clear the search input
            setSearchTerm("")
        }
    }

    const removeSearchFilter = (filter: string) => {
        const newSearchFilters = searchFilters.filter((f) => f !== filter)
        setSearchFilters(newSearchFilters)

        // Apply remaining filters
        const filtered = applyAllFilters(allItems, activeFilters, newSearchFilters)
        setFilteredItems(filtered)
        setCurrentPage(1)
        updateFiltersData(filtered)
    }

    const applyAllFilters = (items: Job[], dropdownFilters: { [key: string]: string }, textFilters: string[]) => {
        // First apply dropdown filters
        let filtered = items.filter((job) =>
            Object.entries(dropdownFilters).every(
                ([key, filterValue]) => job[key as keyof Job]?.toLowerCase() === filterValue.toLowerCase(),
            ),
        )

        // Then apply text search filters
        if (textFilters.length > 0) {
            filtered = filtered.filter((job) => {
                // Check if job title contains any of the search filters
                return textFilters.every((filter) => job.title.toLowerCase().includes(filter.toLowerCase()))
            })
        }

        return filtered
    }

    const clearAllFilters = () => {
        setActiveFilters({})
        setSearchFilters([])
        setFilteredItems(allItems)
        setCurrentPage(1)
        updateFiltersData(allItems)
    }

    const toggleMobileFilter = () => {
        setIsMobileFilterOpen(!isMobileFilterOpen)
    }

    // Calculate pagination data
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <div className="job-listings-container">
                    <div className="header-container">
                        <div className="header-content">
                            <h1 className="main-title">Job Listings</h1>
                            <p className="items-count">
                                Total: <span className="count-value">{filteredItems.length}</span>
                            </p>
                        </div>
                    </div>

                    {/* Mobile filter toggle button */}
                    <button
                        className="md:hidden w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                        onClick={toggleMobileFilter}
                    >
                        {isMobileFilterOpen ? "Close Filters" : "Open Filters"}
                    </button>

                    {/* Desktop filters */}
                    <div className="hidden md:block filters-container">
                        <SearchBar
                            searchTerm={searchTerm}
                            handleSearchChange={handleSearchChange}
                            handleSearchKeyDown={handleSearchKeyDown}
                            suggestions={suggestions}
                        />

                        <Filters
                            filterKeys={filterKeys}
                            filtersData={filtersData}
                            activeFilters={activeFilters}
                            handleFilterChange={handleFilterChange}
                            searchFilters={searchFilters}
                            removeSearchFilter={removeSearchFilter}
                            clearAllFilters={clearAllFilters}
                        />
                    </div>

                    {/* Mobile filter drawer */}
                    <MobileFilterDrawer
                        isOpen={isMobileFilterOpen}
                        onClose={toggleMobileFilter}
                        filterKeys={filterKeys}
                        filtersData={filtersData}
                        activeFilters={activeFilters}
                        handleFilterChange={handleFilterChange}
                        handleSearchChange={handleSearchChange}
                        searchTerm={searchTerm}
                        clearAllFilters={clearAllFilters}
                        handleSearchKeyDown={handleSearchKeyDown}
                        searchFilters={searchFilters}
                        removeSearchFilter={removeSearchFilter}
                    />

                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-3/4 md:pr-4">
                            <h2 className="section-title">Open Positions</h2>
                            <JobList items={paginatedItems} />
                            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                        </div>
                        <div className="w-full md:w-1/4 mt-4 md:mt-0">
                            <div className="sticky top-4">
                                {banners.sidebar.enabled && banners.sidebar.url && (
                                    <Banner position="sidebar" url={banners.sidebar.url} link={banners.sidebar.link} alt={banners.sidebar.alt} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {banners.bottom.enabled && banners.bottom.url && (
                <Banner position="top" url={banners.bottom.url} link={banners.bottom.link} alt={banners.bottom.alt} />
            )}
        </div>
    )
}

export default JobListings
