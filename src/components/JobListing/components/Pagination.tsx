import type React from "react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    setCurrentPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
    if (totalPages <= 1) return null

    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i)
        }
    } else {
        if (currentPage <= 3) {
            for (let i = 1; i <= 5; i++) {
                pageNumbers.push(i)
            }
        } else if (currentPage >= totalPages - 2) {
            for (let i = totalPages - 4; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pageNumbers.push(i)
            }
        }
    }

    return (
        <div className="pagination">
            <button
                className="pagination-button prev-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`pagination-button ${currentPage === number ? "active" : ""}`}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className="pagination-button next-button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination

