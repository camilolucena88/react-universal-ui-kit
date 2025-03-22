"use client"

import type React from "react"

export type DateFilterOption = "all" | "today" | "this_week" | "this_month" | "last_30_days" | "last_90_days"

interface DateFilterProps {
    activeDateFilter: DateFilterOption
    onDateFilterChange: (filter: DateFilterOption) => void
    dateFieldLabel?: string
}

const DateFilter: React.FC<DateFilterProps> = ({
                                                   activeDateFilter,
                                                   onDateFilterChange,
                                                   dateFieldLabel = "Published",
                                               }) => {
    const options: { value: DateFilterOption; label: string }[] = [
        { value: "all", label: "All Time" },
        { value: "today", label: "Today" },
        { value: "this_week", label: "This Week" },
        { value: "this_month", label: "This Month" },
        { value: "last_30_days", label: "Last 30 Days" },
        { value: "last_90_days", label: "Last 90 Days" },
    ]

    return (
        <div className="date-filter">
            {dateFieldLabel && (
                <label htmlFor="date-filter" className="text-sm font-medium text-gray-700 mr-2">
                    {dateFieldLabel}:
                </label>
            )}
            <select
                id="date-filter"
                value={activeDateFilter}
                onChange={(e) => onDateFilterChange(e.target.value as DateFilterOption)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DateFilter

