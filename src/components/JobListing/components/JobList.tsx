import type React from "react"
import JobCard from "./JobCard"

interface JobListProps {
    jobs: Job[]
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
    if (jobs.length === 0) {
        return (
            <div className="no-results">
                <h3>No jobs found matching your criteria</h3>
                <p>Try adjusting your filters or search term</p>
            </div>
        )
    }

    return (
        <div className="jobs-grid">
            {jobs.map((job) => (
                <JobCard key={job.link} job={job} />
            ))}
        </div>
    )
}

export default JobList

