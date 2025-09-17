"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { AdvancedSearch } from "@/components/search/advanced-search"
import { SearchResults } from "@/components/search/search-results"

export default function SearchPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFilters, setSearchFilters] = useState({
    documentTypes: [],
    riskLevels: [],
    dateRange: null,
    categories: [],
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />

        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Search Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Advanced Search</h1>
              <p className="text-muted-foreground">
                Search across all your documents for specific clauses, terms, or content
              </p>
            </div>

            {/* Advanced Search Form */}
            <AdvancedSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={searchFilters}
              onFiltersChange={setSearchFilters}
            />

            {/* Search Results */}
            <SearchResults query={searchQuery} filters={searchFilters} />
          </div>
        </main>
      </div>
    </div>
  )
}
