"use client"

import type React from "react"

interface FilterOption {
  label: string
  value: string
}

export interface JobFilters {
  jobTypes: string[]
  experienceLevels: string[]
  country: string
  city: string
  [key: string]: string | string[] // Allow for dynamic filter keys
}

interface FilterConfig {
  type: "checkbox" | "dropdown" | "search" | "multiselect"
  options?: FilterOption[]
  label: string
}

interface SidebarFilterProps {
  filters: JobFilters
  onFilterChange: (filters: JobFilters) => void
  onReset: () => void
  filterConfig?: Record<string, FilterConfig>
  isMobile?: boolean
  onClose?: () => void
}

const defaultJobTypes: FilterOption[] = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
]

const defaultExperienceLevels: FilterOption[] = [
  { label: "Entry", value: "entry" },
  { label: "Mid", value: "mid" },
  { label: "Senior", value: "senior" },
]

const defaultIndustries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Marketing",
  "Design",
  "Sales",
  "Customer Service",
]

const SidebarFilter: React.FC<SidebarFilterProps> = ({
                                                       filters,
                                                       onFilterChange,
                                                       onReset,
                                                       filterConfig = {},
                                                       isMobile = false,
                                                       onClose,
                                                     }) => {
  // Default configuration if none provided
  const defaultConfig: Record<string, FilterConfig> = {
    jobTypes: {
      type: "checkbox",
      options: defaultJobTypes,
      label: "Job Type",
    },
    experienceLevels: {
      type: "checkbox",
      options: defaultExperienceLevels,
      label: "Experience Level",
    },
    location: {
      type: "search",
      label: "Location",
    },
    industry: {
      type: "dropdown",
      options: defaultIndustries.map((ind) => ({ label: ind, value: ind })),
      label: "Industry",
    },
  }

  // Merge default config with provided config
  const config = { ...defaultConfig, ...filterConfig }

  const handleArrayFilterChange = (key: string, value: string) => {
    const currentValues = Array.isArray(filters[key]) ? (filters[key] as string[]) : []
    const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]

    onFilterChange({
      ...filters,
      [key]: updatedValues,
    })
  }

  const handleStringFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    })
  }

  return (
      <div>
        {/* Render filters based on config */}
        {Object.entries(config).map(([key, filterDef]) => {
          const filterValue = filters[key]

          switch (filterDef.type) {
            case "checkbox":
              return (
                  <div className="mb-6" key={key}>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">{filterDef.label}</h3>
                    <div className="space-y-2">
                      {filterDef.options?.map((option) => (
                          <label key={option.value} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={Array.isArray(filterValue) && filterValue.includes(option.value)}
                                onChange={() => handleArrayFilterChange(key, option.value)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                          </label>
                      ))}
                    </div>
                  </div>
              )

            case "search":
              return (
                  <div className="mb-6" key={key}>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">{filterDef.label}</h3>
                    <input
                        type="text"
                        value={(filterValue as string) || ""}
                        onChange={(e) => handleStringFilterChange(key, e.target.value)}
                        placeholder={`Enter ${filterDef.label.toLowerCase()}...`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
              )

            case "dropdown":
              return (
                  <div className="mb-6" key={key}>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">{filterDef.label}</h3>
                    <select
                        value={(filterValue as string) || ""}
                        onChange={(e) => handleStringFilterChange(key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    >
                      <option value="">All {filterDef.label}s</option>
                      {filterDef.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                      ))}
                    </select>
                  </div>
              )

            case "multiselect":
              // Implementation for multiselect would go here
              return null

            default:
              return null
          }
        })}

        {/* Reset Button */}
        <button
            onClick={onReset}
            className="w-full py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </button>
      </div>
  )
}

export default SidebarFilter

