import type React from "react"
import type { KeyboardEvent } from "react"

interface SearchBarProps {
    searchTerm: string
    handleSearchChange: (search: string) => void
    handleSearchKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    suggestions: string[]
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearchChange, handleSearchKeyDown, suggestions }) => {
    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="search-icon"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search jobs and press Enter to add as filter..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    list="job-suggestions"
                />
                <datalist id="job-suggestions">
                    {suggestions.map((suggestion, index) => (
                        <option key={index} value={suggestion} />
                    ))}
                </datalist>
            </div>
        </div>
    )
}

export default SearchBar

