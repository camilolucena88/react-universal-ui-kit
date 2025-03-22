import React from 'react';
import { X } from 'lucide-react';
import type { JobFilters, JobType, ExperienceLevel } from '../types/job';

interface SidebarProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  onReset: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const jobTypes: JobType[] = ['full-time', 'part-time', 'contract'];
const experienceLevels: ExperienceLevel[] = ['entry', 'mid', 'senior'];
const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
];

const Sidebar: React.FC<SidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  isMobile,
  onClose,
}) => {
  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const containerClasses = isMobile
    ? 'fixed inset-0 bg-gray-600 bg-opacity-75 z-50'
    : 'hidden md:block w-64 flex-shrink-0';

  const contentClasses = isMobile
    ? 'fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-gray-800 shadow-xl'
    : 'sticky top-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700';

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <div className="p-4">
          {isMobile && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Job Type */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Job Type
            </h3>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.type === type}
                    onChange={() => handleFilterChange('type', type)}
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Experience Level
            </h3>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <label key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.experience === level}
                    onChange={() => handleFilterChange('experience', level)}
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Location
            </h3>
            <input
              type="text"
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              placeholder="Enter location..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500
                       focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Salary Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Salary Range
            </h3>
            <div className="space-y-2">
              <input
                type="number"
                value={filters.minSalary || ''}
                onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                placeholder="Min salary"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500
                         focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="number"
                value={filters.maxSalary || ''}
                onChange={(e) => handleFilterChange('maxSalary', e.target.value)}
                placeholder="Max salary"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500
                         focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Industry */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Industry
            </h3>
            <select
              value={filters.industry || ''}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500
                       focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={onReset}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100
                       rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            >
              Reset Filters
            </button>
            {isMobile && (
              <button
                onClick={onClose}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-500
                         rounded-lg hover:bg-primary-600"
              >
                Apply Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;