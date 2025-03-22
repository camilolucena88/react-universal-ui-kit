"use client"

import type React from "react"
import { CheckSquare, Square } from "lucide-react"

export type JobType = "full-time" | "part-time" | "contract"
export type ExperienceLevel = "entry" | "mid" | "senior"

export interface JobFilters {
  jobTypes: JobType[]
  experienceLevels: ExperienceLevel[]
  location: string
  minSalary: string
  maxSalary: string
  industry: string
}

interface SidebarFiltersProps {
  filters: JobFilters
  onFilterChange: (filters: JobFilters) => void
  onReset: () => void
  className?: string
}

const defaultFilters: JobFilters = {
  jobTypes: [],
  experienceLevels: [],
  location: "",
  minSalary: "",
  maxSalary: "",
  industry: "",
}

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Marketing",
  "Design",
  "Media",
  "Hospitality",
]

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filters = defaultFilters,
  onFilterChange,
  onReset,
  className = "",
}) => {
  const handleJobTypeChange = (type: JobType) => {
    const updatedTypes = filters.jobTypes.includes(type)
      ? filters.jobTypes.filter((t) => t !== type)
      : [...filters.jobTypes, type]

    onFilterChange({
      ...filters,
      jobTypes: updatedTypes,
    })
  }

  const handleExperienceLevelChange = (level: ExperienceLevel) => {
    const updatedLevels = filters.experienceLevels.includes(level)
      ? filters.experienceLevels.filter((l) => l !== level)
      : [...filters.experienceLevels, level]

    onFilterChange({
      ...filters,
      experienceLevels: updatedLevels,
    })
  }

  const handleTextChange = (key: keyof JobFilters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      {/* Job Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Job Type</h3>
        <div className="space-y-2">
          {(["full-time", "part-time", "contract"] as JobType[]).map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <div className="mr-2" onClick={() => handleJobTypeChange(type)}>
                {filters.jobTypes.includes(type) ? (
                  <CheckSquare className="h-5 w-5 text-blue-600" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <span className="text-gray-700 select-none capitalize">{type.replace("-", " ")}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Experience Level</h3>
        <div className="space-y-2">
          {(["entry", "mid", "senior"] as ExperienceLevel[]).map((level) => (
            <label key={level} className="flex items-center cursor-pointer">
              <div className="mr-2" onClick={() => handleExperienceLevelChange(level)}>
                {filters.experienceLevels.includes(level) ? (
                  <CheckSquare className="h-5 w-5 text-blue-600" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <span className="text-gray-700 select-none capitalize">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Location</h3>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => handleTextChange("location", e.target.value)}
          placeholder="Enter location..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Salary Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Salary Range</h3>
        <div className="space-y-2">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={filters.minSalary}
            onChange={(e) => handleTextChange("minSalary", e.target.value)}
            placeholder="Min salary"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={filters.maxSalary}
            onChange={(e) => handleTextChange("maxSalary", e.target.value)}
            placeholder="Max salary"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Industry */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Industry</h3>
        <select
          value={filters.industry}
          onChange={(e) => handleTextChange("industry", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="">All Industries</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
      >
        Reset Filters
      </button>
    </div>
  )
}

export default SidebarFilters

