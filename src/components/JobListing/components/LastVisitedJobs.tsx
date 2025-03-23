"use client"

import type React from "react"
import {Job} from "@components/JobListing/types/Job";

interface LastVisitedJobsProps {
  jobs: Job[]
  onViewJob: (job: Job) => void
}

const LastVisitedJobs: React.FC<LastVisitedJobsProps> = ({ jobs, onViewJob }) => {
  if (!jobs || jobs.length === 0) return null

  return (
    <div className="last-visited-jobs mt-8 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Recently Viewed Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id || job.slug || job.link}
            className="p-3 border rounded-md hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onViewJob(job)}
          >
            <div className="flex items-center mb-2">
              <img
                src={job.logo || "/placeholder.svg?height=30&width=30"}
                alt={`${job.company} logo`}
                className="w-6 h-6 mr-2"
              />
              <h3 className="font-medium text-sm truncate">{job.title}</h3>
            </div>
            <p className="text-xs text-gray-600 truncate">{job.company}</p>
            <p className="text-xs text-gray-500 truncate">{job.location}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LastVisitedJobs

