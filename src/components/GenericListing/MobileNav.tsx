import React from 'react';
import { Home, Briefcase, BookmarkPlus, User, Menu } from 'lucide-react';

interface MobileNavProps {
  savedJobsCount: number;
}

const MobileNav: React.FC<MobileNavProps> = ({ savedJobsCount }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t
                   border-gray-200 dark:border-gray-700 md:hidden">
      <div className="grid grid-cols-5 h-16">
        <a
          href="/Users/calu01/Public"
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400
                   hover:text-primary-500"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </a>
        <a
          href="/jobs"
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400
                   hover:text-primary-500"
        >
          <Briefcase className="w-6 h-6" />
          <span className="text-xs mt-1">Jobs</span>
        </a>
        <a
          href="/saved"
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400
                   hover:text-primary-500 relative"
        >
          <BookmarkPlus className="w-6 h-6" />
          <span className="text-xs mt-1">Saved</span>
          {savedJobsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary-500 text-white rounded-full
                         w-5 h-5 flex items-center justify-center text-xs">
              {savedJobsCount}
            </span>
          )}
        </a>
        <a
          href="/profile"
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400
                   hover:text-primary-500"
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </a>
        <button
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400
                   hover:text-primary-500"
        >
          <Menu className="w-6 h-6" />
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;