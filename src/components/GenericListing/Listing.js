"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Pagination_1 = require("../JobListing/components/Pagination");
var Banner_1 = require("../JobListing/components/Banner");
var ListingGrid_1 = require("./ListingGrid");
var LastVisitedJobs_1 = require("../JobListing/components/LastVisitedJobs");
var DateFilter_1 = require("../JobListing/components/DateFilter");
var MobileNav_1 = require("./MobileNav");
var lucide_react_1 = require("lucide-react");
require("./styles/itemListing.css");
var MAX_LAST_VISITED = 6; // Maximum number of last visited jobs to show
var Listing = function (_a) {
    var _b;
    var apiUrl = _a.apiUrl, _c = _a.itemsPerPage, itemsPerPage = _c === void 0 ? 12 : _c, filterKeys = _a.filterKeys, banner = _a.banner, _d = _a.enableSearch, enableSearch = _d === void 0 ? true : _d, _e = _a.enableMobileFilter, enableMobileFilter = _e === void 0 ? true : _e, cardType = _a.cardType, _f = _a.dateField, dateField = _f === void 0 ? "created_at" : _f, _g = _a.dateFieldLabel, dateFieldLabel = _g === void 0 ? "Published" : _g;
    var _h = (0, react_1.useState)([]), allItems = _h[0], setAllItems = _h[1];
    var _j = (0, react_1.useState)([]), filteredItems = _j[0], setFilteredItems = _j[1];
    var _k = (0, react_1.useState)(1), currentPage = _k[0], setCurrentPage = _k[1];
    var _l = (0, react_1.useState)({}), activeFilters = _l[0], setActiveFilters = _l[1];
    var _m = (0, react_1.useState)([]), searchFilters = _m[0], setSearchFilters = _m[1];
    var _o = (0, react_1.useState)({}), filtersData = _o[0], setFiltersData = _o[1];
    var _p = (0, react_1.useState)(""), searchTerm = _p[0], setSearchTerm = _p[1];
    var _q = (0, react_1.useState)([]), suggestions = _q[0], setSuggestions = _q[1];
    var _r = (0, react_1.useState)(false), isMobileFilterOpen = _r[0], setIsMobileFilterOpen = _r[1];
    var _s = (0, react_1.useState)(itemsPerPage), selectedItemsPerPage = _s[0], setSelectedItemsPerPage = _s[1];
    var _t = (0, react_1.useState)("grid"), viewMode = _t[0], setViewMode = _t[1];
    var _u = (0, react_1.useState)([]), savedJobs = _u[0], setSavedJobs = _u[1];
    var _v = (0, react_1.useState)(false), showOnlySaved = _v[0], setShowOnlySaved = _v[1];
    var _w = (0, react_1.useState)([]), lastVisitedJobs = _w[0], setLastVisitedJobs = _w[1];
    var _x = (0, react_1.useState)(true), loading = _x[0], setLoading = _x[1];
    var _y = (0, react_1.useState)(null), error = _y[0], setError = _y[1];
    var _z = (0, react_1.useState)("all"), activeDateFilter = _z[0], setActiveDateFilter = _z[1];
    // Advanced filters
    var _0 = (0, react_1.useState)({
        jobTypes: [],
        experienceLevels: [],
        country: "",
        minSalary: "",
        maxSalary: "",
        city: "",
    }), advancedFilters = _0[0], setAdvancedFilters = _0[1];
    // Load saved jobs and last visited jobs from localStorage on component mount
    (0, react_1.useEffect)(function () {
        try {
            var savedJobsFromStorage = localStorage.getItem("savedJobs");
            if (savedJobsFromStorage) {
                setSavedJobs(JSON.parse(savedJobsFromStorage));
            }
            var lastVisitedFromStorage = localStorage.getItem("lastVisitedJobs");
            if (lastVisitedFromStorage) {
                setLastVisitedJobs(JSON.parse(lastVisitedFromStorage));
            }
        }
        catch (err) {
            console.error("Error loading data from localStorage:", err);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        if (!apiUrl) {
            setError("❌ Missing API URL for Listing component!");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        // For preview/development purposes, use mock data if API call fails
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, dataWithSponsored, filtersDataToPopulate, err_1, mockData, filtersMockData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch(apiUrl)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("API responded with status: ".concat(response.status));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (!Array.isArray(data)) {
                            throw new Error("Expected an array but received: " + typeof data);
                        }
                        dataWithSponsored = data.map(function (item, index) { return (__assign(__assign({}, item), { sponsored: index % 7 === 0 })); });
                        setAllItems(dataWithSponsored);
                        setFilteredItems(dataWithSponsored);
                        filtersDataToPopulate = populateFilters(dataWithSponsored);
                        setFiltersData(filtersDataToPopulate);
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.error("Error fetching data:", err_1);
                        setError("Failed to load data: ".concat(err_1 instanceof Error ? err_1.message : String(err_1)));
                        mockData = generateMockData(20);
                        setAllItems(mockData);
                        setFilteredItems(mockData);
                        filtersMockData = populateFilters(mockData);
                        setFiltersData(filtersMockData);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [apiUrl]);
    // Generate mock data for preview/development
    var generateMockData = function (count) {
        var companies = ["Acme Inc", "TechCorp", "Global Solutions", "Innovate Labs", "Future Tech"];
        var departments = ["Engineering", "Marketing", "Sales", "Design", "Product", "HR"];
        var locations = ["New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Remote"];
        var cities = ["New York", "San Francisco", "Austin", "Seattle", "Chicago"];
        var countries = ["USA", "Canada", "UK", "Germany", "Australia"];
        var companyTypes = ["Startup", "Enterprise", "Agency", "Nonprofit", "Government"];
        // Generate dates for the past 120 days
        var generateRandomDate = function (daysAgo) {
            var date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
            return date.toISOString();
        };
        return Array.from({ length: count }, function (_, i) {
            var publishedDate = generateRandomDate(120);
            return {
                id: "job-".concat(i),
                title: "".concat(departments[i % departments.length], " ").concat(i % 3 === 0 ? "Senior" : i % 3 === 1 ? "Mid-level" : "Junior", " Position"),
                company: companies[i % companies.length],
                department: departments[i % departments.length],
                location: locations[i % locations.length],
                city: cities[i % cities.length],
                country: countries[i % countries.length],
                company_type: companyTypes[i % companyTypes.length],
                link: "#job-link",
                logo: "/placeholder.svg?height=50&width=50&text=".concat(companies[i % companies.length].charAt(0)),
                overview: "This is a mock job description for preview purposes. The actual job details would appear here with information about responsibilities, requirements, and company culture.",
                slug: "job-".concat(i),
                scraped_at: new Date().toISOString(),
                published_at: publishedDate,
                created_at: publishedDate,
                sponsored: i % 7 === 0,
            };
        });
    };
    // Apply date filter to items
    var applyDateFilter = function (items, dateFilterOption) {
        if (dateFilterOption === "all") {
            return items;
        }
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return items.filter(function (item) {
            // Use the specified date field, fallback to created_at, then published_at
            var itemDate = item[dateField] || item.created_at || item.published_at;
            if (!itemDate)
                return false;
            var date = new Date(itemDate);
            switch (dateFilterOption) {
                case "today":
                    return date >= today;
                case "this_week": {
                    var weekStart = new Date(now);
                    weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
                    weekStart.setHours(0, 0, 0, 0);
                    return date >= weekStart;
                }
                case "this_month": {
                    var monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    return date >= monthStart;
                }
                case "last_30_days": {
                    var thirtyDaysAgo = new Date(now);
                    thirtyDaysAgo.setDate(now.getDate() - 30);
                    return date >= thirtyDaysAgo;
                }
                case "last_90_days": {
                    var ninetyDaysAgo = new Date(now);
                    ninetyDaysAgo.setDate(now.getDate() - 90);
                    return date >= ninetyDaysAgo;
                }
                default:
                    return true;
            }
        });
    };
    // Apply advanced filters
    var applyAdvancedFilters = function (items, filters) {
        return items.filter(function (item) {
            var _a, _b, _c, _d, _e;
            // Filter by job type
            if (filters.jobTypes.length > 0) {
                var jobType_1 = ((_a = item.department) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
                if (!filters.jobTypes.some(function (type) { return jobType_1.includes(type); })) {
                    return false;
                }
            }
            // Filter by experience level
            if (filters.experienceLevels.length > 0) {
                var title_1 = ((_b = item.title) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "";
                if (!filters.experienceLevels.some(function (level) {
                    if (level === "senior" && title_1.includes("senior"))
                        return true;
                    if (level === "mid" && (title_1.includes("mid") || title_1.includes("mid-level")))
                        return true;
                    if (level === "entry" && (title_1.includes("junior") || title_1.includes("entry")))
                        return true;
                    return false;
                })) {
                    return false;
                }
            }
            // Filter by location
            if (filters.country) {
                var location_1 = ((_c = item.location) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || ((_d = item.city) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || "";
                if (!location_1.includes(filters.country.toLowerCase())) {
                    return false;
                }
            }
            // Filter by industry
            if (filters.city) {
                var companyType = ((_e = item.company_type) === null || _e === void 0 ? void 0 : _e.toLowerCase()) || "";
                if (!companyType.includes(filters.city.toLowerCase())) {
                    return false;
                }
            }
            // For salary, we'd need actual salary data in the job objects
            // This is a placeholder implementation
            return true;
        });
    };
    // Update filtered items when showOnlySaved changes
    (0, react_1.useEffect)(function () {
        if (showOnlySaved) {
            var savedItems = allItems.filter(function (item) { return savedJobs.includes(item.id || item.slug || item.link); });
            setFilteredItems(savedItems);
            setCurrentPage(1);
        }
        else {
            // Apply current filters
            var filtered = allItems;
            // Apply traditional filters
            filtered = applyAllFilters(filtered, activeFilters, searchFilters, activeDateFilter);
            // Apply advanced filters
            filtered = applyAdvancedFilters(filtered, advancedFilters);
            setFilteredItems(filtered);
        }
    }, [showOnlySaved, savedJobs, allItems, activeFilters, searchFilters, activeDateFilter, advancedFilters]);
    var populateFilters = function (items) {
        var filtersDataToPopulate = {};
        items.forEach(function (item) {
            filterKeys.forEach(function (key) {
                if (!filtersDataToPopulate[key]) {
                    filtersDataToPopulate[key] = new Set();
                }
                var value = item[key];
                if (typeof value === "string" && value.trim() !== "") {
                    filtersDataToPopulate[key].add(value);
                }
            });
        });
        // Convert Sets to arrays
        var arrayFiltersData = {};
        Object.keys(filtersDataToPopulate).forEach(function (key) {
            arrayFiltersData[key] = Array.from(filtersDataToPopulate[key]);
        });
        return arrayFiltersData;
    };
    var updateFiltersData = function (items) {
        var updatedFiltersData = populateFilters(items);
        setFiltersData(updatedFiltersData);
    };
    var handleFilterChange = function (filterKey, value) {
        setActiveFilters(function (prevFilters) {
            var newFilters = __assign({}, prevFilters);
            if (value) {
                newFilters[filterKey] = value;
            }
            else {
                delete newFilters[filterKey];
            }
            // Turn off "saved only" filter when changing other filters
            if (showOnlySaved) {
                setShowOnlySaved(false);
            }
            var filtered = applyAllFilters(allItems, newFilters, searchFilters, activeDateFilter);
            setFilteredItems(filtered);
            setCurrentPage(1);
            updateFiltersData(filtered);
            return newFilters;
        });
    };
    var handleAdvancedFilterChange = function (filters) {
        setAdvancedFilters(filters);
        // Turn off "saved only" filter when changing filters
        if (showOnlySaved) {
            setShowOnlySaved(false);
        }
        var filtered = allItems;
        // Apply traditional filters
        filtered = applyAllFilters(filtered, activeFilters, searchFilters, activeDateFilter);
        // Apply advanced filters
        filtered = applyAdvancedFilters(filtered, filters);
        setFilteredItems(filtered);
        setCurrentPage(1);
        updateFiltersData(filtered);
    };
    var handleDateFilterChange = function (filter) {
        setActiveDateFilter(filter);
        // Turn off "saved only" filter when changing date filter
        if (showOnlySaved) {
            setShowOnlySaved(false);
        }
        var filtered = applyAllFilters(allItems, activeFilters, searchFilters, filter);
        setFilteredItems(filtered);
        setCurrentPage(1);
        updateFiltersData(filtered);
    };
    var handleSearchChange = function (search) {
        setSearchTerm(search);
        if (search) {
            var newSuggestions = allItems
                .map(function (item) { return item.title; })
                .filter(function (title, index, self) {
                return title && title.toLowerCase().includes(search.toLowerCase()) && self.indexOf(title) === index;
            })
                .slice(0, 5);
            setSuggestions(newSuggestions);
        }
        else {
            setSuggestions([]);
        }
    };
    var handleSearchKeyDown = function (e) {
        if (e.key === "Enter" && searchTerm.trim()) {
            e.preventDefault();
            // Add the search term as a filter
            var newSearchFilters = __spreadArray(__spreadArray([], searchFilters, true), [searchTerm.trim()], false);
            setSearchFilters(newSearchFilters);
            // Turn off "saved only" filter when searching
            if (showOnlySaved) {
                setShowOnlySaved(false);
            }
            // Apply all filters
            var filtered = applyAllFilters(allItems, activeFilters, newSearchFilters, activeDateFilter);
            setFilteredItems(filtered);
            setCurrentPage(1);
            updateFiltersData(filtered);
            // Clear the search input
            setSearchTerm("");
        }
    };
    var removeSearchFilter = function (filter) {
        var newSearchFilters = searchFilters.filter(function (f) { return f !== filter; });
        setSearchFilters(newSearchFilters);
        // Apply remaining filters
        var filtered = applyAllFilters(allItems, activeFilters, newSearchFilters, activeDateFilter);
        setFilteredItems(filtered);
        setCurrentPage(1);
        updateFiltersData(filtered);
    };
    var applyAllFilters = function (items, dropdownFilters, textFilters, dateFilter) {
        // First apply dropdown filters
        var filtered = items.filter(function (item) {
            return Object.entries(dropdownFilters).every(function (_a) {
                var key = _a[0], filterValue = _a[1];
                var itemValue = item[key];
                return typeof itemValue === "string" && itemValue.toLowerCase() === filterValue.toLowerCase();
            });
        });
        // Then apply text search filters
        if (textFilters.length > 0) {
            filtered = filtered.filter(function (item) {
                return textFilters.every(function (filter) {
                    var _a, _b;
                    return ((_a = item.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(filter.toLowerCase())) ||
                        ((_b = item.overview) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(filter.toLowerCase()));
                });
            });
        }
        // Finally apply date filter
        filtered = applyDateFilter(filtered, dateFilter);
        return filtered;
    };
    var resetAdvancedFilters = function () {
        setAdvancedFilters({
            jobTypes: [],
            experienceLevels: [],
            country: "",
            minSalary: "",
            maxSalary: "",
            city: "",
        });
        // Apply only traditional filters
        var filtered = applyAllFilters(allItems, activeFilters, searchFilters, activeDateFilter);
        setFilteredItems(filtered);
        setCurrentPage(1);
        updateFiltersData(filtered);
    };
    var clearAllFilters = function () {
        setActiveFilters({});
        setSearchFilters([]);
        setShowOnlySaved(false);
        setActiveDateFilter("all");
        resetAdvancedFilters();
        setFilteredItems(allItems);
        setCurrentPage(1);
        updateFiltersData(allItems);
    };
    var toggleMobileFilter = function () {
        setIsMobileFilterOpen(!isMobileFilterOpen);
    };
    var handleItemsPerPageChange = function (value) {
        setSelectedItemsPerPage(value);
        setCurrentPage(1); // Reset to first page when changing items per page
    };
    var toggleViewMode = function () {
        setViewMode(viewMode === "grid" ? "list" : "grid");
    };
    var handleSaveJob = function (job) {
        var jobId = job.id | job._id || job.slug || job.link;
        console.log(jobId);
        setSavedJobs(function (prev) {
            var isCurrentlySaved = prev.includes(jobId);
            var newSavedJobs;
            if (isCurrentlySaved) {
                // Remove job from saved
                newSavedJobs = prev.filter(function (id) { return id !== jobId; });
            }
            else {
                // Add job to saved
                newSavedJobs = __spreadArray(__spreadArray([], prev, true), [jobId], false);
            }
            // Save to localStorage
            try {
                localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs));
            }
            catch (err) {
                console.error("Error saving to localStorage:", err);
            }
            return newSavedJobs;
        });
    };
    var handleViewJob = function (job) {
        var jobId = job.id || job.slug || job.link;
        // Add to last visited jobs
        setLastVisitedJobs(function (prev) {
            // Remove the job if it's already in the list
            var filteredJobs = prev.filter(function (j) { return (j.id || j.slug || j.link) !== jobId; });
            // Add the job to the beginning of the array
            var newLastVisited = __spreadArray([job], filteredJobs, true).slice(0, MAX_LAST_VISITED);
            // Save to localStorage
            try {
                localStorage.setItem("lastVisitedJobs", JSON.stringify(newLastVisited));
            }
            catch (err) {
                console.error("Error saving to localStorage:", err);
            }
            return newLastVisited;
        });
    };
    var toggleSavedJobsFilter = function () {
        setShowOnlySaved(!showOnlySaved);
    };
    var totalPages = Math.ceil(filteredItems.length / selectedItemsPerPage);
    var paginatedItems = filteredItems.slice((currentPage - 1) * selectedItemsPerPage, currentPage * selectedItemsPerPage);
    // Render loading state
    if (loading) {
        return (<div className="flex-grow p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {__spreadArray([], Array(6), true).map(function (_, i) { return (<div key={i} className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                                </div>); })}
                        </div>
                    </div>
                </div>
            </div>);
    }
    // Render error state
    if (error && !allItems.length) {
        return (<div className="flex-grow p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-2">Error Loading Jobs</h2>
                        <p className="mb-4">{error}</p>
                        <button onClick={function () { return window.location.reload(); }} className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded">
                            Retry
                        </button>
                    </div>
                </div>
            </div>);
    }
    return (<div className="flex flex-col min-h-screen pb-16 md:pb-0">
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

                    {<div className="relative">
                            <div className="relative flex items-center gap-2 my-6">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <lucide_react_1.Search className="h-5 w-5 text-indigo-500"/>
                                </div>
                                <input type="text" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900" placeholder="Search for jobs, companies, or keywords..." value={searchTerm} onChange={function (e) { return handleSearchChange(e.target.value); }} onKeyDown={handleSearchKeyDown} list="job-suggestions"/>
                                <datalist id="job-suggestions">
                                    {suggestions.map(function (suggestion, index) { return (<option key={index} value={suggestion}/>); })}
                                </datalist>
                            </div>
                            <button className="md:hidden flex items-center px-3 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" onClick={toggleMobileFilter}>
                                <lucide_react_1.SlidersHorizontal size={16} className="mr-1.5"/>
                                <span className="text-sm font-medium">Filters</span>
                            </button>
                            </div>
                            {/* Active filters and search terms */}
                            {(searchFilters.length > 0 || Object.keys(activeFilters).length > 0 || activeDateFilter !== "all") && (<div className="m-4 flex flex-wrap gap-2">
                                    {/* Date filter tag */}
                                    {activeDateFilter !== "all" && (<div className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm">
                                            <span className="font-medium mr-1">{dateFieldLabel}:</span>
                                            <span>{activeDateFilter.replace(/_/g, " ")}</span>
                                            <button className="ml-2 text-indigo-600 hover:text-indigo-800" onClick={function () { return handleDateFilterChange("all"); }} aria-label={"Remove ".concat(dateFieldLabel, " filter")}>
                                                <lucide_react_1.XCircle size={14}/>
                                            </button>
                                        </div>)}

                                    {/* Search filters */}
                                    {searchFilters.map(function (filter) { return (<div key={"search-".concat(filter)} className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm">
                                            <span>{filter}</span>
                                            <button className="ml-2 text-indigo-600 hover:text-indigo-800" onClick={function () { return removeSearchFilter(filter); }} aria-label={"Remove search filter ".concat(filter)}>
                                                <lucide_react_1.XCircle size={14}/>
                                            </button>
                                        </div>); })}

                                    {/* Dropdown filters */}
                                    {Object.entries(activeFilters).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return (<div key={key} className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm">
                                            <span className="font-medium mr-1">{key.replace(/_/g, " ")}:</span>
                                            <span>{value}</span>
                                            <button className="ml-2 text-indigo-600 hover:text-indigo-800" onClick={function () { return handleFilterChange(key, ""); }} aria-label={"Remove ".concat(key, " filter")}>
                                                <lucide_react_1.XCircle size={14}/>
                                            </button>
                                        </div>);
                })}

                                    <button className="inline-flex items-center bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-3 py-1 text-sm" onClick={clearAllFilters}>
                                        Clear All
                                    </button>
                                </div>)}
                        </div>}

                    {enableMobileFilter && (<button className="md:hidden w-full mb-6 px-4 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center" onClick={toggleMobileFilter} aria-expanded={isMobileFilterOpen}>
                            <lucide_react_1.SlidersHorizontal className="w-4 h-4 mr-2"/>
                            {isMobileFilterOpen ? "Close Filters" : "Filters"}
                        </button>)}


                    {/* Main three-column layout */}
                    <div className="flex flex-col lg:flex-row lg:gap-6">

                        {/* Left Column: Filters */}
                        <div className="hidden lg:block lg:w-1/4 space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">{dateFieldLabel}</h3>
                                    <DateFilter_1.default activeDateFilter={activeDateFilter} onDateFilterChange={handleDateFilterChange} dateFieldLabel=""/>
                                </div>
                                {/* Enhanced Search Bar */}
                                {enableSearch && (<div className="mb-6">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <lucide_react_1.Search className="h-5 w-5 text-indigo-500"/>
                                            </div>
                                            <input type="text" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900" placeholder="Search for jobs, companies, or keywords..." value={searchTerm} onChange={function (e) { return handleSearchChange(e.target.value); }} onKeyDown={handleSearchKeyDown} list="job-suggestions"/>
                                            <datalist id="job-suggestions">
                                                {suggestions.map(function (suggestion, index) { return (<option key={index} value={suggestion}/>); })}
                                            </datalist>
                                        </div>

                                        {/* Active filters and search terms */}
                                        {(searchFilters.length > 0 || Object.keys(activeFilters).length > 0 || activeDateFilter !== "all") && (<div className="mt-4 flex flex-wrap gap-2">
                                                {/* Date filter tag */}
                                                {activeDateFilter !== "all" && (<div className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm">
                                                        <span className="font-medium mr-1">{dateFieldLabel}:</span>
                                                        <span>{activeDateFilter.replace(/_/g, " ")}</span>
                                                        <button className="ml-2 text-indigo-600 hover:text-indigo-800" onClick={function () { return handleDateFilterChange("all"); }} aria-label={"Remove ".concat(dateFieldLabel, " filter")}>
                                                            <lucide_react_1.XCircle size={14}/>
                                                        </button>
                                                    </div>)}

                                                {/* Search filters */}
                                                {searchFilters.map(function (filter) { return (<div key={"search-".concat(filter)} className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm">
                                                        <span>{filter}</span>
                                                        <button className="ml-2 text-indigo-600 hover:text-indigo-800" onClick={function () { return removeSearchFilter(filter); }} aria-label={"Remove search filter ".concat(filter)}>
                                                            <lucide_react_1.XCircle size={14}/>
                                                        </button>
                                                    </div>); })}

                                                {/* Dropdown filters */}
                                                {Object.entries(activeFilters).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return (<div key={key} className="inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm">
                                                        <span className="font-medium mr-1">{key.replace(/_/g, " ")}:</span>
                                                        <span>{value}</span>
                                                        <button className="ml-2 text-indigo-600 hover:text-indigo-800" onClick={function () { return handleFilterChange(key, ""); }} aria-label={"Remove ".concat(key, " filter")}>
                                                            <lucide_react_1.XCircle size={14}/>
                                                        </button>
                                                    </div>);
                })}

                                                <button className="inline-flex items-center bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-3 py-1 text-sm" onClick={clearAllFilters}>
                                                    Clear All
                                                </button>
                                            </div>)}
                                    </div>)}

                                {/* Advanced filters */}
                                {/*<SidebarFilter*/}
                                {/*    filters={advancedFilters}*/}
                                {/*    onFilterChange={handleAdvancedFilterChange}*/}
                                {/*    onReset={resetAdvancedFilters}*/}
                                {/*/>*/}

                                {/* Dynamic filter dropdowns */}
                                {filterKeys.map(function (filterKey) {
            var _a;
            return (<div className="mb-6" key={filterKey}>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">{filterKey.replace(/_/g, " ")}</h3>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white" value={activeFilters[filterKey] || ""} onChange={function (e) { return handleFilterChange(filterKey, e.target.value); }}>
                                            <option value="">Select {filterKey.replace(/_/g, " ")}</option>
                                            {(_a = filtersData[filterKey]) === null || _a === void 0 ? void 0 : _a.map(function (value) { return (<option key={value} value={value}>
                                                    {value}
                                                </option>); })}
                                        </select>
                                    </div>);
        })}

                                {/* Saved jobs filter */}
                                <div className="mt-6">
                                    <button onClick={toggleSavedJobsFilter} className={"w-full px-4 py-2 rounded-lg flex items-center justify-center ".concat(showOnlySaved ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200")}>
                                        <lucide_react_1.BookmarkIcon size={16} className="mr-2"/>
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
                                            <button onClick={toggleViewMode} className={"px-3 py-1.5 rounded-md flex items-center justify-center transition-colors ".concat(viewMode === "grid" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-700 hover:bg-gray-200")} aria-label="Grid view" aria-pressed={viewMode === "grid"}>
                                                <lucide_react_1.GridIcon size={16} className="mr-1.5"/>
                                                <span className="text-sm font-medium">Grid</span>
                                            </button>
                                            <button onClick={toggleViewMode} className={"px-3 py-1.5 rounded-md flex items-center justify-center transition-colors ".concat(viewMode === "list" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-700 hover:bg-gray-200")} aria-label="List view" aria-pressed={viewMode === "list"}>
                                                <lucide_react_1.ListIcon size={16} className="mr-1.5"/>
                                                <span className="text-sm font-medium">List</span>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Bottom row on mobile: Items per page and Filter button */}
                                    <div className="flex justify-between items-center">
                                        <div className="items-per-page flex items-center">
                                            <label htmlFor="items-per-page" className="mr-2 text-sm font-medium text-gray-700">
                                                Show:
                                            </label>
                                            <select id="items-per-page" value={selectedItemsPerPage} onChange={function (e) { return handleItemsPerPageChange(Number(e.target.value)); }} className="px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white">
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={50}>50</option>
                                            </select>
                                        </div>

                                        {/* Mobile filter button - only visible on mobile */}
                                        <button className="md:hidden flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" onClick={toggleMobileFilter}>
                                            <lucide_react_1.SlidersHorizontal size={16} className="mr-1.5"/>
                                            <span className="text-sm font-medium">Filters</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Job Listings */}
                            <div className="">
                                <h2 className="text-xl font-semibold text-gray-900 m-4">
                                    {showOnlySaved ? "Saved Jobs" : "Open Positions"}
                                    {activeDateFilter !== "all" && !showOnlySaved && (<span className="text-sm font-normal text-gray-500 ml-2">
                      ({activeDateFilter.replace(/_/g, " ")})
                    </span>)}
                                </h2>

                                <ListingGrid_1.default items={paginatedItems} cardType={cardType} viewMode={viewMode} savedJobs={savedJobs} onSaveJob={handleSaveJob} onViewJob={handleViewJob}/>

                                {filteredItems.length > 0 && (<div className="mt-6">
                                        <Pagination_1.default currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
                                    </div>)}
                            </div>

                            {/* Last Visited Jobs */}
                            {lastVisitedJobs.length > 0 && (<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                    <LastVisitedJobs_1.default jobs={lastVisitedJobs} onViewJob={handleViewJob}/>
                                </div>)}
                        </div>

                        {/* Right Column: Advertising Banner */}
                        <div className="hidden lg:block lg:w-1/4 space-y-6">
                            {/* Sidebar Banner */}
                            {((_b = banner === null || banner === void 0 ? void 0 : banner.sidebar) === null || _b === void 0 ? void 0 : _b.enabled) && (<div className="sticky top-4">
                                    <Banner_1.default position="sidebar" url={banner.sidebar.url} link={banner.sidebar.link} alt={banner.sidebar.alt}/>

                                    {/* Additional promotional content in sidebar */}
                                    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                        <h3 className="font-semibold text-lg mb-3">Premium Job Alerts</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Get notified about new jobs that match your skills and preferences.
                                        </p>
                                        <form className="flex flex-col">
                                            <input type="email" placeholder="Your email address" className="px-3 py-2 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                                            <button type="button" className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                                                Subscribe
                                            </button>
                                        </form>
                                    </div>

                                    {/* Featured employers */}
                                    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                        <h3 className="font-semibold text-lg mb-3">Featured Employers</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {__spreadArray([], Array(6), true).map(function (_, i) { return (<div key={i} className="flex items-center justify-center p-2 bg-gray-50 rounded-md">
                                                    <img src={"/placeholder.svg?height=40&width=40&text=".concat(String.fromCharCode(65 + i))} alt={"Featured employer ".concat(i + 1)} className="w-10 h-10 object-contain"/>
                                                </div>); })}
                                        </div>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile filter drawer */}
            {(<div>
                    <div className={isMobileFilterOpen ? "block" : "hidden"}>
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40" onClick={toggleMobileFilter}></div>
                        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50 overflow-y-auto">
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                                <button onClick={toggleMobileFilter} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close filters">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="p-4">
                                {/* Date filter */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">{dateFieldLabel}</h3>
                                    <DateFilter_1.default activeDateFilter={activeDateFilter} onDateFilterChange={handleDateFilterChange} dateFieldLabel=""/>
                                </div>
                                {filterKeys.map(function (filterKey) {
                var _a;
                return (<div className="mb-6" key={filterKey}>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">{filterKey.replace(/_/g, " ")}</h3>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white" value={activeFilters[filterKey] || ""} onChange={function (e) { return handleFilterChange(filterKey, e.target.value); }}>
                                            <option value="">Select {filterKey.replace(/_/g, " ")}</option>
                                            {(_a = filtersData[filterKey]) === null || _a === void 0 ? void 0 : _a.map(function (value) { return (<option key={value} value={value}>
                                                    {value}
                                                </option>); })}
                                        </select>
                                    </div>);
            })}

                                {/* Saved jobs filter */}
                                <div className="mt-6">
                                    <button onClick={toggleSavedJobsFilter} className={"w-full px-4 py-2 rounded-lg flex items-center justify-center ".concat(showOnlySaved ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200")}>
                                        <lucide_react_1.BookmarkIcon size={16} className="mr-2"/>
                                        <span>Saved Jobs ({savedJobs.length})</span>
                                    </button>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <button onClick={toggleMobileFilter} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>)}

            {/* Mobile Navigation */}
            <MobileNav_1.default savedJobsCount={savedJobs.length}/>
        </div>);
};
exports.default = Listing;
