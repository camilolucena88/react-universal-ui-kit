
import React from 'react';
import JobCard from "@components/JobListing/components/JobCard";

const FEATURED_JOBS = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    type: 'Full-time',
    posted: 'about 1 year ago',
    logo: '/lovable-uploads/cffa2e01-d258-4229-a77b-7d8115201489.png',
    saved: false,
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'DesignStudio',
    location: 'Remote',
    salary: '$90,000 - $140,000',
    type: 'Full-time',
    posted: '2 days ago',
    logo: 'https://via.placeholder.com/100',
    saved: true,
  },
];

const REMOTE_JOBS = [
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'WebTech',
    location: 'Remote',
    salary: '$85,000 - $120,000',
    type: 'Full-time',
    posted: '1 week ago',
    logo: 'https://via.placeholder.com/100',
    saved: false,
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'CreativeAgency',
    location: 'Remote',
    salary: '$75,000 - $110,000',
    type: 'Contract',
    posted: '3 days ago',
    logo: 'https://via.placeholder.com/100',
    saved: false,
  },
];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 subtle-scroll">
        <h1 className="text-2xl font-bold mb-6 animate-slide-down">Browse Jobs</h1>

        {/* Featured Jobs */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 animate-slide-down">Featured Jobs</h2>
          <div className="space-y-4">
            {FEATURED_JOBS.map((job, index) => (
              <JobCard
                key={job.id}
                {...job}
                className={`transition-all duration-300 delay-${index * 100}`}
              />
            ))}
          </div>
        </section>

        {/* Remote Jobs */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 animate-slide-down">Remote Jobs</h2>
          <div className="space-y-4">
            {REMOTE_JOBS.map((job, index) => (
              <JobCard
                key={job.id}
                {...job}
                className={`transition-all duration-300 delay-${(index + 2) * 100}`}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Jobs;