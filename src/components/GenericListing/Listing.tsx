"use client"

import type React from "react"
import {type KeyboardEvent, useEffect, useState} from "react"
import Pagination from "../JobListing/components/Pagination"
import Banner from "../JobListing/components/Banner"
import ListingGrid from "./ListingGrid"
import LastVisitedJobs from "../JobListing/components/LastVisitedJobs"
import DateFilter, {type DateFilterOption} from "../JobListing/components/DateFilter"
import SidebarFilter, {type JobFilters} from "./SidebarFilter"
import MobileNav from "./MobileNav"
import {BookmarkIcon, GridIcon, ListIcon, SlidersHorizontal, Search, XCircle} from "lucide-react"
import "./styles/itemListing.css"

interface BannerConfig {
    enabled: boolean
    url?: string
    alt?: string
    link: string
}

interface ListingProps {
    apiUrl: string
    itemsPerPage?: number
    filterKeys: string[]
    enableSearch?: boolean
    enablePagination?: boolean
    enableMobileFilter?: boolean
    banner?: {
        sidebar?: {
            enabled: boolean
            url: string
            link: string
            alt: string
        }
    }
    cardType: string // Dynamic Card type (e.g., JobCard, CourseCard, etc.)
    dateField?: string // Field to use for date filtering (defaults to created_at)
    dateFieldLabel?: string // Label to display for the date field
}

const MAX_LAST_VISITED = 6 // Maximum number of last visited jobs to show

const Listing: React.FC<ListingProps> = ({
                                             apiUrl,
                                             itemsPerPage = 12,
                                             filterKeys,
                                             banner,
                                             enableSearch = true,
                                             enableMobileFilter = true,
                                             cardType,
                                             dateField = "created_at",
                                             dateFieldLabel = "Published",
                                         }) => {
    const [allItems, setAllItems] = useState<Job[]>([])
    const [filteredItems, setFilteredItems] = useState<Job[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>({})
    const [searchFilters, setSearchFilters] = useState<string[]>([])
    const [filtersData, setFiltersData] = useState<{ [key: string]: string[] }>({})
    const [searchTerm, setSearchTerm] = useState("")
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(itemsPerPage)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [savedJobs, setSavedJobs] = useState<string[]>([])
    const [showOnlySaved, setShowOnlySaved] = useState(false)
    const [lastVisitedJobs, setLastVisitedJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeDateFilter, setActiveDateFilter] = useState<DateFilterOption>("all")

    // Advanced filters
    const [advancedFilters, setAdvancedFilters] = useState<JobFilters>({
        jobTypes: [],
        experienceLevels: [],
        country: "",
        minSalary: "",
        maxSalary: "",
        city: "",
    })

    // Load saved jobs and last visited jobs from localStorage on component mount
    useEffect(() => {
        try {
            const savedJobsFromStorage = localStorage.getItem("savedJobs")
            if (savedJobsFromStorage) {
                setSavedJobs(JSON.parse(savedJobsFromStorage))
            }

            const lastVisitedFromStorage = localStorage.getItem("lastVisitedJobs")
            if (lastVisitedFromStorage) {
                setLastVisitedJobs(JSON.parse(lastVisitedFromStorage))
            }
        } catch (err) {
            console.error("Error loading data from localStorage:", err)
        }
    }, [])

    useEffect(() => {
        if (!apiUrl) {
            setError("❌ Missing API URL for Listing component!")
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        // For preview/development purposes, use mock data if API call fails
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error(`API responded with status: ${response.status}`)
                }
                const data = await response.json()

                if (!Array.isArray(data)) {
                    throw new Error("Expected an array but received: " + typeof data)
                }

                // Add some sponsored jobs for demonstration
                const dataWithSponsored = data.map((item, index) => ({
                    ...item,
                    sponsored: index % 7 === 0, // Mark every 7th job as sponsored
                }))

                setAllItems(dataWithSponsored)
                setFilteredItems(dataWithSponsored)
                const filtersDataToPopulate = populateFilters(dataWithSponsored)
                setFiltersData(filtersDataToPopulate)
            } catch (err) {
                console.error("Error fetching data:", err)
                setError(`Failed to load data: ${err instanceof Error ? err.message : String(err)}`)

                // Use mock data for preview/development
                const mockData = generateMockData(20)
                setAllItems(mockData)
                setFilteredItems(mockData)
                const filtersMockData = populateFilters(mockData)
                setFiltersData(filtersMockData)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [apiUrl])

    // Generate mock data for preview/development
    const generateMockData = (count: number): Job[] => {
        const companies = ["Acme Inc", "TechCorp", "Global Solutions", "Innovate Labs", "Future Tech"]
        const departments = ["Engineering", "Marketing", "Sales", "Design", "Product", "HR"]
        const locations = ["New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Remote"]
        const cities = ["New York", "San Francisco", "Austin", "Seattle", "Chicago"]
        const countries = ["USA", "Canada", "UK", "Germany", "Australia"]
        const companyTypes = ["Startup", "Enterprise", "Agency", "Nonprofit", "Government"]

        // Generate dates for the past 120 days
        const generateRandomDate = (daysAgo: number) => {
            const date = new Date()
            date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
            return date.toISOString()
        }

        return Array.from({length: count}, (_, i) => {
            const publishedDate = generateRandomDate(120)

            return {
                id: `job-${i}`,
                title: `${departments[i % departments.length]} ${i % 3 === 0 ? "Senior" : i % 3 === 1 ? "Mid-level" : "Junior"} Position`,
                company: companies[i % companies.length],
                department: departments[i % departments.length],
                location: locations[i % locations.length],
                city: cities[i % cities.length],
                country: countries[i % countries.length],
                company_type: companyTypes[i % companyTypes.length],
                link: "#job-link",
                logo: `/placeholder.svg?height=50&width=50&text=${companies[i % companies.length].charAt(0)}`,
                overview:
                    "This is a mock job description for preview purposes. The actual job details would appear here with information about responsibilities, requirements, and company culture.",
                slug: `job-${i}`,
                scraped_at: new Date().toISOString(),
                published_at: publishedDate,
                created_at: publishedDate,
                sponsored: i % 7 === 0,
            }
        })
    }

    // Apply date filter to items
    const applyDateFilter = (items: Job[], dateFilterOption: DateFilterOption): Job[] => {
        if (dateFilterOption === "all") {
            return items
        }

        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        return items.filter((item) => {
            // Use the specified date field, fallback to created_at, then published_at
            const itemDate = item[dateField as keyof typeof item] || item.created_at || item.published_at

            if (!itemDate) return false

            const date = new Date(itemDate)

            switch (dateFilterOption) {
                case "today":
                    return date >= today

                case "this_week": {
                    const weekStart = new Date(now)
                    weekStart.setDate(now.getDate() - now.getDay()) // Start of week (Sunday)
                    weekStart.setHours(0, 0, 0, 0)
                    return date >= weekStart
                }

                case "this_month": {
                    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
                    return date >= monthStart
                }

                case "last_30_days": {
                    const thirtyDaysAgo = new Date(now)
                    thirtyDaysAgo.setDate(now.getDate() - 30)
                    return date >= thirtyDaysAgo
                }

                case "last_90_days": {
                    const ninetyDaysAgo = new Date(now)
                    ninetyDaysAgo.setDate(now.getDate() - 90)
                    return date >= ninetyDaysAgo
                }

                default:
                    return true
            }
        })
    }

    // Apply advanced filters
    const applyAdvancedFilters = (items: Job[], filters: JobFilters): Job[] => {
        return items.filter((item) => {
            // Filter by job type
            if (filters.jobTypes.length > 0) {
                const jobType = item.department?.toLowerCase() || ""
                if (!filters.jobTypes.some((type) => jobType.includes(type))) {
                    return false
                }
            }

            // Filter by experience level
            if (filters.experienceLevels.length > 0) {
                const title = item.title?.toLowerCase() || ""
                if (
                    !filters.experienceLevels.some((level) => {
                        if (level === "senior" && title.includes("senior")) return true
                        if (level === "mid" && (title.includes("mid") || title.includes("mid-level"))) return true
                        if (level === "entry" && (title.includes("junior") || title.includes("entry"))) return true
                        return false
                    })
                ) {
                    return false
                }
            }

            // Filter by location
            if (filters.country) {
                const location = item.location?.toLowerCase() || item.city?.toLowerCase() || ""
                if (!location.includes(filters.country.toLowerCase())) {
                    return false
                }
            }

            // Filter by industry
            if (filters.city) {
                const companyType = item.company_type?.toLowerCase() || ""
                if (!companyType.includes(filters.city.toLowerCase())) {
                    return false
                }
            }

            // For salary, we'd need actual salary data in the job objects
            // This is a placeholder implementation

            return true
        })
    }

    // Update filtered items when showOnlySaved changes
    useEffect(() => {
        if (showOnlySaved) {
            const savedItems = allItems.filter((item) => savedJobs.includes(item.id || item.slug || item.link))
            setFilteredItems(savedItems)
            setCurrentPage(1)
        } else {
            // Apply current filters
            let filtered = allItems

            // Apply traditional filters
            filtered = applyAllFilters(filtered, activeFilters, searchFilters, activeDateFilter)

            // Apply advanced filters
            filtered = applyAdvancedFilters(filtered, advancedFilters)

            setFilteredItems(filtered)
        }
    }, [showOnlySaved, savedJobs, allItems, activeFilters, searchFilters, activeDateFilter, advancedFilters])

    const populateFilters = (items: Job[]) => {
        const filtersDataToPopulate: { [key: string]: Set<string> } = {}

        items.forEach((item: Job) => {
            filterKeys.forEach((key) => {
                if (!filtersDataToPopulate[key]) {
                    filtersDataToPopulate[key] = new Set()
                }
                const value = item[key as keyof typeof item]
                if (typeof value === "string" && value.trim() !== "") {
                    filtersDataToPopulate[key].add(value)
                }
            })
        })

        // Convert Sets to arrays
        const arrayFiltersData: { [key: string]: string[] } = {}
        Object.keys(filtersDataToPopulate).forEach((key) => {
            arrayFiltersData[key] = Array.from(filtersDataToPopulate[key])
        })

        return arrayFiltersData
    }

    const updateFiltersData = (items: Job[]) => {
        const updatedFiltersData = populateFilters(items)
        setFiltersData(updatedFiltersData)
    }

    const handleFilterChange = (filterKey: string, value: string) => {
        setActiveFilters((prevFilters) => {
            const newFilters = {...prevFilters}
            if (value) {
                newFilters[filterKey] = value
            } else {
                delete newFilters[filterKey]
            }

            // Turn off "saved only" filter when changing other filters
            if (showOnlySaved) {
                setShowOnlySaved(false)
            }

            const filtered = applyAllFilters(allItems, newFilters, searchFilters, activeDateFilter)
            setFilteredItems(filtered)
            setCurrentPage(1)
            updateFiltersData(filtered)

            return newFilters
        })
    }

    const handleAdvancedFilterChange = (filters: JobFilters) => {
        setAdvancedFilters(filters)

        // Turn off "saved only" filter when changing filters
        if (showOnlySaved) {
            setShowOnlySaved(false)
        }

        let filtered = allItems

        // Apply traditional filters
        filtered = applyAllFilters(filtered, activeFilters, searchFilters, activeDateFilter)

        // Apply advanced filters
        filtered = applyAdvancedFilters(filtered, filters)

        setFilteredItems(filtered)
        setCurrentPage(1)
        updateFiltersData(filtered)
    }

    const handleDateFilterChange = (filter: DateFilterOption) => {
        setActiveDateFilter(filter)

        // Turn off "saved only" filter when changing date filter
        if (showOnlySaved) {
            setShowOnlySaved(false)
        }

        const filtered = applyAllFilters(allItems, activeFilters, searchFilters, filter)
        setFilteredItems(filtered)
        setCurrentPage(1)
        updateFiltersData(filtered)
    }

    const handleSearchChange = (search: string) => {
        setSearchTerm(search)

        if (search) {
            const newSuggestions = allItems
                .map((item) => item.title)
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

            // Turn off "saved only" filter when searching
            if (showOnlySaved) {
                setShowOnlySaved(false)
            }

            // Apply all filters
            const filtered = applyAllFilters(allItems, activeFilters, newSearchFilters, activeDateFilter)
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
        const filtered = applyAllFilters(allItems, activeFilters, newSearchFilters, activeDateFilter)
        setFilteredItems(filtered)
        setCurrentPage(1)
        updateFiltersData(filtered)
    }

    const applyAllFilters = (
        items: Job[],
        dropdownFilters: { [key: string]: string },
        textFilters: string[],
        dateFilter: DateFilterOption,
    ) => {
        // First apply dropdown filters
        let filtered = items.filter((item) =>
            Object.entries(dropdownFilters).every(([key, filterValue]) => {
                const itemValue = item[key as keyof typeof item]
                return typeof itemValue === "string" && itemValue.toLowerCase() === filterValue.toLowerCase()
            }),
        )

        // Then apply text search filters
        if (textFilters.length > 0) {
            filtered = filtered.filter((item) => {
                return textFilters.every(
                    (filter) =>
                        item.title?.toLowerCase().includes(filter.toLowerCase()) ||
                        item.overview?.toLowerCase().includes(filter.toLowerCase()),
                )
            })
        }

        // Finally apply date filter
        filtered = applyDateFilter(filtered, dateFilter)

        return filtered
    }

    const resetAdvancedFilters = () => {
        setAdvancedFilters({
            jobTypes: [],
            experienceLevels: [],
            country: "",
            minSalary: "",
            maxSalary: "",
            city: "",
        })

        // Apply only traditional filters
        const filtered = applyAllFilters(allItems, activeFilters, searchFilters, activeDateFilter)
        setFilteredItems(filtered)
        setCurrentPage(1)
        updateFiltersData(filtered)
    }

    const clearAllFilters = () => {
        setActiveFilters({})
        setSearchFilters([])
        setShowOnlySaved(false)
        setActiveDateFilter("all")
        resetAdvancedFilters()
        setFilteredItems(allItems)
        setCurrentPage(1)
        updateFiltersData(allItems)
    }

    const toggleMobileFilter = () => {
        setIsMobileFilterOpen(!isMobileFilterOpen)
    }

    const handleItemsPerPageChange = (value: number) => {
        setSelectedItemsPerPage(value)
        setCurrentPage(1) // Reset to first page when changing items per page
    }

    const toggleViewMode = () => {
        setViewMode(viewMode === "grid" ? "list" : "grid")
    }

    const handleSaveJob = (job: Job) => {
        const jobId = job.id | job._id || job.slug || job.link

        console.log(jobId)

        setSavedJobs((prev) => {
            const isCurrentlySaved = prev.includes(jobId)
            let newSavedJobs: string[]

            if (isCurrentlySaved) {
                // Remove job from saved
                newSavedJobs = prev.filter((id) => id !== jobId)
            } else {
                // Add job to saved
                newSavedJobs = [...prev, jobId]
            }

            // Save to localStorage
            try {
                localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs))
            } catch (err) {
                console.error("Error saving to localStorage:", err)
            }

            return newSavedJobs
        })
    }

    const handleViewJob = (job: Job) => {
        const jobId = job.id || job.slug || job.link

        // Add to last visited jobs
        setLastVisitedJobs((prev) => {
            // Remove the job if it's already in the list
            const filteredJobs = prev.filter((j) => (j.id || j.slug || j.link) !== jobId)

            // Add the job to the beginning of the array
            const newLastVisited = [job, ...filteredJobs].slice(0, MAX_LAST_VISITED)

            // Save to localStorage
            try {
                localStorage.setItem("lastVisitedJobs", JSON.stringify(newLastVisited))
            } catch (err) {
                console.error("Error saving to localStorage:", err)
            }

            return newLastVisited
        })
    }

    const toggleSavedJobsFilter = () => {
        setShowOnlySaved(!showOnlySaved)
    }


    const totalPages = Math.ceil(filteredItems.length / selectedItemsPerPage)
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * selectedItemsPerPage,
        currentPage * selectedItemsPerPage,
    )

    // Render loading state
    if (loading) {
        return (
            <div className="flex-grow p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Render error state
    if (error && !allItems.length) {
        return (
            <div className="flex-grow p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-2">Error Loading Jobs</h2>
                        <p className="mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen pb-16 md:pb-0">
            <div className="flex-grow">
                <div className="container mx-auto py-8 pb-20 md:pb-8">
                    {/* Page Header */}
                    <div className="mb-6">
                        <div className="flex flex-row md:items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900 md:mb-0">Job Listings</h1>
                            <div className="flex items-center">
                                <p className="text-gray-600 mr-4">
                                    <span className="font-semibold text-gray-900">{filteredItems.length}</span> jobs
                                    found
                                </p>
                            </div>
                        </div>
                    </div>

                    {
                        <div className="relative">
                            <div className="relative flex items-center gap-2 my-6">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-indigo-500"/>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                                    placeholder="Search for jobs, companies, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                    list="job-suggestions"
                                />
                                <datalist id="job-suggestions">
                                    {suggestions.map((suggestion, index) => (
                                        <option key={index} value={suggestion}/>
                                    ))}
                                </datalist>
                            </div>
                            <button
                                className="md:hidden flex items-center px-3 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                onClick={toggleMobileFilter}
                            >
                                <SlidersHorizontal size={16} className="mr-1.5"/>
                                <span className="text-sm font-medium">Filters</span>
                            </button>
                            </div>
                            {/* Active filters and search terms */}
                            {(searchFilters.length > 0 || Object.keys(activeFilters).length > 0 || activeDateFilter !== "all") && (
                                <div className="m-4 flex flex-wrap gap-2">
                                    {/* Date filter tag */}
                                    {activeDateFilter !== "all" && (
                                        <div className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm">
                                            <span className="font-medium mr-1">{dateFieldLabel}:</span>
                                            <span>{activeDateFilter.replace(/_/g, " ")}</span>
                                            <button
                                                className="ml-2 text-indigo-600 hover:text-indigo-800"
                                                onClick={() => handleDateFilterChange("all")}
                                                aria-label={`Remove ${dateFieldLabel} filter`}
                                            >
                                                <XCircle size={14} />
                                            </button>
                                        </div>
                                    )}

                                    {/* Search filters */}
                                    {searchFilters.map((filter) => (
                                        <div
                                            key={`search-${filter}`}
                                            className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm"
                                        >
                                            <span>{filter}</span>
                                            <button
                                                className="ml-2 text-indigo-600 hover:text-indigo-800"
                                                onClick={() => removeSearchFilter(filter)}
                                                aria-label={`Remove search filter ${filter}`}
                                            >
                                                <XCircle size={14} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Dropdown filters */}
                                    {Object.entries(activeFilters).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm"
                                        >
                                            <span className="font-medium mr-1">{key.replace(/_/g, " ")}:</span>
                                            <span>{value}</span>
                                            <button
                                                className="ml-2 text-indigo-600 hover:text-indigo-800"
                                                onClick={() => handleFilterChange(key, "")}
                                                aria-label={`Remove ${key} filter`}
                                            >
                                                <XCircle size={14} />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        className="inline-flex items-center bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-3 py-1 text-sm"
                                        onClick={clearAllFilters}
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}
                        </div>
                    }

                    {enableMobileFilter && (
                        <button
                            className="md:hidden w-full mb-6 px-4 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center"
                            onClick={toggleMobileFilter}
                            aria-expanded={isMobileFilterOpen}
                        >
                            <SlidersHorizontal className="w-4 h-4 mr-2" />
                            {isMobileFilterOpen ? "Close Filters" : "Filters"}
                        </button>
                    )}


                    {/* Main three-column layout */}
                    <div className="flex flex-col lg:flex-row lg:gap-6">

                        {/* Left Column: Filters */}
                        <div className="hidden lg:block lg:w-1/4 space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">{dateFieldLabel}</h3>
                                    <DateFilter
                                        activeDateFilter={activeDateFilter}
                                        onDateFilterChange={handleDateFilterChange}
                                        dateFieldLabel=""
                                    />
                                </div>
                                {/* Enhanced Search Bar */}
                                {enableSearch && (
                                    <div className="mb-6">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Search className="h-5 w-5 text-indigo-500" />
                                            </div>
                                            <input
                                                type="text"
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                                                placeholder="Search for jobs, companies, or keywords..."
                                                value={searchTerm}
                                                onChange={(e) => handleSearchChange(e.target.value)}
                                                onKeyDown={handleSearchKeyDown}
                                                list="job-suggestions"
                                            />
                                            <datalist id="job-suggestions">
                                                {suggestions.map((suggestion, index) => (
                                                    <option key={index} value={suggestion} />
                                                ))}
                                            </datalist>
                                        </div>

                                        {/* Active filters and search terms */}
                                        {(searchFilters.length > 0 || Object.keys(activeFilters).length > 0 || activeDateFilter !== "all") && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {/* Date filter tag */}
                                                {activeDateFilter !== "all" && (
                                                    <div className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm">
                                                        <span className="font-medium mr-1">{dateFieldLabel}:</span>
                                                        <span>{activeDateFilter.replace(/_/g, " ")}</span>
                                                        <button
                                                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                                                            onClick={() => handleDateFilterChange("all")}
                                                            aria-label={`Remove ${dateFieldLabel} filter`}
                                                        >
                                                            <XCircle size={14} />
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Search filters */}
                                                {searchFilters.map((filter) => (
                                                    <div
                                                        key={`search-${filter}`}
                                                        className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm"
                                                    >
                                                        <span>{filter}</span>
                                                        <button
                                                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                                                            onClick={() => removeSearchFilter(filter)}
                                                            aria-label={`Remove search filter ${filter}`}
                                                        >
                                                            <XCircle size={14} />
                                                        </button>
                                                    </div>
                                                ))}

                                                {/* Dropdown filters */}
                                                {Object.entries(activeFilters).map(([key, value]) => (
                                                    <div
                                                        key={key}
                                                        className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm"
                                                    >
                                                        <span className="font-medium mr-1">{key.replace(/_/g, " ")}:</span>
                                                        <span>{value}</span>
                                                        <button
                                                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                                                            onClick={() => handleFilterChange(key, "")}
                                                            aria-label={`Remove ${key} filter`}
                                                        >
                                                            <XCircle size={14} />
                                                        </button>
                                                    </div>
                                                ))}

                                                <button
                                                    className="inline-flex items-center bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-3 py-1 text-sm"
                                                    onClick={clearAllFilters}
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Advanced filters */}
                                {/*<SidebarFilter*/}
                                {/*    filters={advancedFilters}*/}
                                {/*    onFilterChange={handleAdvancedFilterChange}*/}
                                {/*    onReset={resetAdvancedFilters}*/}
                                {/*/>*/}

                                {/* Dynamic filter dropdowns */}
                                {filterKeys.map((filterKey) => (
                                    <div className="mb-6" key={filterKey}>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">{filterKey.replace(/_/g, " ")}</h3>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                            value={activeFilters[filterKey] || ""}
                                            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
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

                                {/* Saved jobs filter */}
                                <div className="mt-6">
                                    <button
                                        onClick={toggleSavedJobsFilter}
                                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center ${
                                            showOnlySaved ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                        }`}
                                    >
                                        <BookmarkIcon size={16} className="mr-2"/>
                                        <span>Saved Jobs ({savedJobs.length})</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Middle Column: Job Listings */}
                        <div className="lg:w-2/4 space-y-6">
                            {/* View controls */}
                            <div className="lg:block hidden bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                    {/* Top row on mobile: View toggle and Saved Jobs */}
                                    <div className="flex justify-between items-center">
                                        <div className="view-mode-toggle flex bg-gray-100 p-1 rounded-lg">
                                            <button
                                                onClick={toggleViewMode}
                                                className={`px-3 py-1.5 rounded-md flex items-center justify-center transition-colors ${
                                                    viewMode === "grid" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-700 hover:bg-gray-200"
                                                }`}
                                                aria-label="Grid view"
                                                aria-pressed={viewMode === "grid"}
                                            >
                                                <GridIcon size={16} className="mr-1.5"/>
                                                <span className="text-sm font-medium">Grid</span>
                                            </button>
                                            <button
                                                onClick={toggleViewMode}
                                                className={`px-3 py-1.5 rounded-md flex items-center justify-center transition-colors ${
                                                    viewMode === "list" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-700 hover:bg-gray-200"
                                                }`}
                                                aria-label="List view"
                                                aria-pressed={viewMode === "list"}
                                            >
                                                <ListIcon size={16} className="mr-1.5"/>
                                                <span className="text-sm font-medium">List</span>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Bottom row on mobile: Items per page and Filter button */}
                                    <div className="flex justify-between items-center">
                                        <div className="items-per-page flex items-center">
                                            <label htmlFor="items-per-page"
                                                   className="mr-2 text-sm font-medium text-gray-700">
                                                Show:
                                            </label>
                                            <select
                                                id="items-per-page"
                                                value={selectedItemsPerPage}
                                                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                                                className="px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                                            >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={50}>50</option>
                                            </select>
                                        </div>

                                        {/* Mobile filter button - only visible on mobile */}
                                        <button
                                            className="md:hidden flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                            onClick={toggleMobileFilter}
                                        >
                                            <SlidersHorizontal size={16} className="mr-1.5"/>
                                            <span className="text-sm font-medium">Filters</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Job Listings */}
                            <div className="">
                                <h2 className="text-xl font-semibold text-gray-900 m-4">
                                    {showOnlySaved ? "Saved Jobs" : "Open Positions"}
                                    {activeDateFilter !== "all" && !showOnlySaved && (
                                        <span className="text-sm font-normal text-gray-500 ml-2">
                      ({activeDateFilter.replace(/_/g, " ")})
                    </span>
                                    )}
                                </h2>

                                <ListingGrid
                                    items={paginatedItems}
                                    cardType={cardType}
                                    viewMode={viewMode}
                                    savedJobs={savedJobs}
                                    onSaveJob={handleSaveJob}
                                    onViewJob={handleViewJob}
                                />

                                {filteredItems.length > 0 && (
                                    <div className="mt-6">
                                        <Pagination currentPage={currentPage} totalPages={totalPages}
                                                    setCurrentPage={setCurrentPage}/>
                                    </div>
                                )}
                            </div>

                            {/* Last Visited Jobs */}
                            {lastVisitedJobs.length > 0 && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                    <LastVisitedJobs jobs={lastVisitedJobs} onViewJob={handleViewJob}/>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Advertising Banner */}
                        <div className="hidden lg:block lg:w-1/4 space-y-6">
                            {/* Sidebar Banner */}
                            {banner?.sidebar?.enabled && (
                                <div className="sticky top-4">
                                    <Banner
                                        position="sidebar"
                                        url={banner.sidebar.url}
                                        link={banner.sidebar.link}
                                        alt={banner.sidebar.alt}
                                    />

                                    {/* Additional promotional content in sidebar */}
                                    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                        <h3 className="font-semibold text-lg mb-3">Premium Job Alerts</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Get notified about new jobs that match your skills and preferences.
                                        </p>
                                        <form className="flex flex-col">
                                            <input
                                                type="email"
                                                placeholder="Your email address"
                                                className="px-3 py-2 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            <button
                                                type="button"
                                                className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                            >
                                                Subscribe
                                            </button>
                                        </form>
                                    </div>

                                    {/* Featured employers */}
                                    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                        <h3 className="font-semibold text-lg mb-3">Featured Employers</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i}
                                                     className="flex items-center justify-center p-2 bg-gray-50 rounded-md">
                                                    <img
                                                        src={`/placeholder.svg?height=40&width=40&text=${String.fromCharCode(65 + i)}`}
                                                        alt={`Featured employer ${i + 1}`}
                                                        className="w-10 h-10 object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile filter drawer */}
            {(
                <div>
                    <div className={isMobileFilterOpen ? "block" : "hidden"}>
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
                             onClick={toggleMobileFilter}></div>
                        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50 overflow-y-auto">
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                                <button
                                    onClick={toggleMobileFilter}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                    aria-label="Close filters"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="p-4">
                                {/* Date filter */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">{dateFieldLabel}</h3>
                                    <DateFilter
                                        activeDateFilter={activeDateFilter}
                                        onDateFilterChange={handleDateFilterChange}
                                        dateFieldLabel=""
                                    />
                                </div>
                                {filterKeys.map((filterKey) => (
                                    <div className="mb-6" key={filterKey}>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">{filterKey.replace(/_/g, " ")}</h3>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                            value={activeFilters[filterKey] || ""}
                                            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
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

                                {/* Saved jobs filter */}
                                <div className="mt-6">
                                    <button
                                        onClick={toggleSavedJobsFilter}
                                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center ${
                                            showOnlySaved ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                        }`}
                                    >
                                        <BookmarkIcon size={16} className="mr-2"/>
                                        <span>Saved Jobs ({savedJobs.length})</span>
                                    </button>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={toggleMobileFilter}
                                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* Mobile Navigation */}
            <MobileNav savedJobsCount={savedJobs.length}/>
        </div>
    )
}

export default Listing

