"use client"

import type React from "react"
import { MapPin, Clock, BriefcaseIcon, Bookmark, BookmarkIcon } from 'lucide-react';
import {Job} from "@components/JobListing/types/Job";

interface JobCardProps {
  job: Job
  onSaveJob: (job: Job) => void
  onViewJob: (job: Job) => void
  isSaved?: boolean;
  layout?: "grid" | "list"
}

const JobCard: React.FC<JobCardProps> = ({ job, onSaveJob = () => {}, onViewJob = () => {}, isSaved = false, layout = "grid" }) => {
  // Ensure job is a valid object
  if (!job || typeof job !== "object") {
    console.error("❌ Invalid job data:", job)
    return (
        <div className="job-card bg-red-50">
          <div className="p-4">
            <p className="text-red-800 font-medium">Invalid Job Data</p>
            <p className="text-red-600 text-sm">The job data is in an unexpected format.</p>
          </div>
        </div>
    )
  }

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track that the job was viewed when user clicks apply
    onViewJob(job)
  }

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onSaveJob(job)
  }

  // Format the posted date (using scraped_at or published_at as a fallback)
  const postedDate = job.published_at || job.created_at || job.scraped_at
  const minSalary = job.min_salary || 0
  const maxSalary = job.max_salary || 0
  const formattedSalary = `$${minSalary.toLocaleString()} - $${maxSalary.toLocaleString()}`

  // Format the date in a more readable way
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Recently posted"

    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return "Today"
      if (diffDays === 1) return "Yesterday"
      if (diffDays < 7) return `${diffDays} days ago`
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
      return `${Math.floor(diffDays / 365)} years ago`
    } catch (e) {
      return "Recently posted"
    }
  }

  const formattedDateString = formatDate(job.published_at || job.created_at || job.scraped_at)

  return (
      <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow 
      ${layout === "grid" ? "flex flex-col h-full" : "flex flex-col md:flex-row md:items-center md:space-x-4"}`}
      >
        {/* Company Logo and Info */}
        <div className="flex items-start space-x-4">
          <img
              src={job.logo || `/placeholder.svg?height=48&width=48&text=${job.company?.charAt(0) || "C"}`}
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-contain bg-gray-50"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{job.title || "No Title Available"}</h3>
            <p className="text-sm text-muted-foreground">{job.company || "Unknown Company"}</p>
          </div>
        </div>

        {/* Job Details */}
        <div
            className={`
        mt-4 ${layout === "list" ? "md:mt-0 md:flex-1" : ""}
      `}
        >
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location || "Remote"}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center">
              <BriefcaseIcon className="w-4 h-4 mr-1" />
              {job.department || "Full-time"}
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>{formattedDateString}</span>
            </div>
          </div>

          <div className="hidden mt-2 text-xs text-gray-500">{formattedSalary}</div>
        </div>

        {/* Actions - always at the bottom */}
        <div className={`mt-auto pt-4 flex items-center space-x-3 ${layout === "list" ? "md:mt-0 md:ml-4" : ""}`}>
          <button
              onClick={handleSaveClick}
              className={`
            p-2 rounded-lg transition-colors
            ${
                  isSaved
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }
          `}
              aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            <BookmarkIcon size={20} className={`transition-colors ${isSaved ? "fill-blue-600 text-blue-600" : ""}`} />
          </button>
          <a
              href={job.link || "#job-details"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   transition-colors text-sm font-medium text-center"
              onClick={handleApplyClick}
          >
            Apply Now
          </a>
        </div>
      </div>
  )
}

export default JobCard

