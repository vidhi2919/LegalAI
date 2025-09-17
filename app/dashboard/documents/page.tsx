"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DocumentLibraryHeader } from "@/components/library/document-library-header"
import { DocumentFilters } from "@/components/library/document-filters"
import { DocumentGrid } from "@/components/library/document-grid"
import { DocumentList } from "@/components/library/document-list"

export default function DocumentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRisk, setSelectedRisk] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />

        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Library Header */}
            <DocumentLibraryHeader
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="flex gap-6">
              {/* Filters Sidebar */}
              <div className="w-64 flex-shrink-0">
                <DocumentFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedRisk={selectedRisk}
                  onRiskChange={setSelectedRisk}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>

              {/* Documents Content */}
              <div className="flex-1">
                {viewMode === "grid" ? (
                  <DocumentGrid
                    searchQuery={searchQuery}
                    category={selectedCategory}
                    riskLevel={selectedRisk}
                    sortBy={sortBy}
                  />
                ) : (
                  <DocumentList
                    searchQuery={searchQuery}
                    category={selectedCategory}
                    riskLevel={selectedRisk}
                    sortBy={sortBy}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
