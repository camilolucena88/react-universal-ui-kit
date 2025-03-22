"use client"

import type React from "react"
import { useState, useEffect } from "react"
import PromoCard from "../JobListing/components/PromoCard";
import JobCard from "../JobListing/components/JobCard";

interface ListingGridProps {
  items: any[]
  cardType: string
  viewMode: "grid" | "list"
  savedJobs: string[]
  onSaveJob: (job: Job) => void
  onViewJob: (job: Job) => void
}

const ListingGrid: React.FC<ListingGridProps> = ({ items, cardType, viewMode, savedJobs, onSaveJob, onViewJob }) => {
  const [displayItems, setDisplayItems] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (!Array.isArray(items)) {
        console.error("❌ Items is not an array:", items)
        setError("Invalid data format received")
        setDisplayItems([])
        return
      }

      // Insert promo card after every 5 items
      const itemsWithPromo = [...items]
      if (items.length > 5) {
        itemsWithPromo.splice(5, 0, {
          id: "promo-1",
          title: "Promo",
          isPromo: true,
        })
      }

      setDisplayItems(itemsWithPromo)
      setError(null)
    } catch (err) {
      console.error("Error processing items:", err)
      setError(`Error processing items: ${err instanceof Error ? err.message : String(err)}`)
      setDisplayItems([])
    }
  }, [items])

  const getCardComponent = (item: any, index: number) => {
    try {
      if (item.isPromo) {
        return (
          <div key={`promo-${index}`} className="col-span-full my-4">
            <PromoCard
              title="Upgrade Your Job Search"
              description="Get personalized job recommendations and stand out to employers."
              ctaText="Learn More"
              ctaLink="#premium-features"
              bgColor="bg-blue-50"
              textColor="text-blue-800"
            />
          </div>
        )
      }

      if (!item || typeof item !== "object") {
        console.error("❌ Invalid item detected:", item)
        return (
          <div className="error-card bg-red-50 p-4 rounded-md border border-red-200">
            <p className="text-red-800 font-medium">Invalid Job Data</p>
            <p className="text-red-600 text-sm">The job data is in an unexpected format.</p>
          </div>
        )
      }

      // Generate a reliable key
      const uniqueKey = item.id ? `${item._id}-${index}` : item.slug ? `${item.slug}-${index}` : `item-${index}`

      switch (cardType) {
        case "job":
          return (
            <JobCard
              key={uniqueKey}
              job={item}
              onSaveJob={onSaveJob}
              onViewJob={onViewJob}
              isSaved={savedJobs.includes(item.id || item.slug || item.link)}
            />
          )
        default:
          console.warn(`⚠️ Unknown cardType: ${cardType}`)
          return (
            <div className="error-card bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <p className="text-yellow-800 font-medium">Unknown Card Type</p>
              <p className="text-yellow-700 text-sm">The specified card type is not supported.</p>
            </div>
          )
      }
    } catch (err) {
      console.error("Error rendering card:", err)
      return (
        <div className="error-card bg-red-50 p-4 rounded-md border border-red-200">
          <p className="text-red-800 font-medium">Error Rendering Card</p>
          <p className="text-red-600 text-sm">{err instanceof Error ? err.message : String(err)}</p>
        </div>
      )
    }
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6">
        <h3 className="font-semibold mb-2">Error Loading Items</h3>
        <p>{error}</p>
      </div>
    )
  }

  if (displayItems.length === 0) {
    return (
      <div className="no-results">
        <h3>No items found matching your criteria</h3>
        <p>Try adjusting your filters or search term</p>
      </div>
    )
  }

  return (
    <div
      className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}
      data-view-mode={viewMode}
    >
      {displayItems.map((item, index) => getCardComponent(item, index))}
    </div>
  )
}

export default ListingGrid

